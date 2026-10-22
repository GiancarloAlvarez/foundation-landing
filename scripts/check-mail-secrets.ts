/**
 * Leak guard for the SMTP credentials.
 *
 * Scans the build output, the public folder and every source file looking
 * for the provider credential, and verifies that the `.env` file is ignored
 * by git and not tracked. Exits with code 1 if anything leaks.
 *
 * Usage: npx tsx scripts/check-mail-secrets.ts
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'dist', 'coverage', '.turbo']);
const TEXT_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html', '.json', '.map',
  '.txt', '.md', '.yml', '.yaml', '.svg', '.xml', '.env', '.example', '.gitignore',
]);

dotenv.config({ path: path.join(ROOT, '.env') });

const secrets = [
  { name: 'SMTP_PASS', value: process.env.SMTP_PASS },
  { name: 'SMTP_USER', value: process.env.SMTP_USER },
].filter((s) => Boolean(s.value && s.value.trim().length >= 4));

// Brevo SMTP keys always start with this prefix, so the scan also works
// before the .env has been filled in.
const PATTERNS = [
  { name: 'clave SMTP de Brevo (xsmtpsib-…)', regex: /xsmtpsib-[A-Za-z0-9_-]{6,}/g },
  ...secrets.map((s) => ({ name: s.name, regex: new RegExp(escapeRegExp(s.value!), 'g') })),
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function* walk(dir: string): Generator<string> {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TEXT_EXTENSIONS.has(ext) || entry.name.startsWith('.env')) yield full;
    }
  }
}

function isEnvFile(file: string): boolean {
  const name = path.basename(file);
  return name === '.env' || name.startsWith('.env.local') || name === '.env.production';
}

const findings = new Set<string>();

// 1) The build output and the public folder must never carry the credential.
const scanTargets = [path.join(ROOT, '.next', 'static'), path.join(ROOT, 'public')].filter((p) => fs.existsSync(p));
for (const target of scanTargets) {
  for (const file of walk(target)) {
    const content = fs.readFileSync(file, 'utf8');
    for (const { name, regex } of PATTERNS) {
      regex.lastIndex = 0;
      if (regex.test(content)) {
        findings.add(`${path.relative(ROOT, file)} contiene ${name}`);
      }
    }
  }
}

// 2) No source file (other than the .env itself) may hardcode the credential.
for (const file of walk(ROOT)) {
  if (isEnvFile(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const { name, regex } of PATTERNS) {
    regex.lastIndex = 0;
    if (regex.test(content)) {
      findings.add(`${path.relative(ROOT, file)} contiene ${name}`);
    }
  }
}

// 3) The .env must be ignored by git and must not be tracked.
let envIgnored = false;
let envTracked = false;
try {
  const ignored = execSync('git check-ignore .env', { cwd: ROOT, encoding: 'utf8' });
  envIgnored = ignored.trim().length > 0;
} catch {
  envIgnored = false;
}
try {
  execSync('git ls-files --error-unmatch .env', { cwd: ROOT, encoding: 'utf8', stdio: 'ignore' });
  envTracked = true;
} catch {
  envTracked = false;
}

if (!envIgnored) findings.add('.env NO está en .gitignore');
if (envTracked) findings.add('.env está trackeado por git (debe salir del índice)');

console.log('=== Auditoría de secretos SMTP ===\n');
console.log(`Credenciales cargadas desde .env: ${secrets.length ? secrets.map((s) => s.name).join(', ') : 'ninguna (el .env está vacío)'}`);
console.log(`.env ignorado por git: ${envIgnored ? 'sí' : 'NO'}`);
console.log(`.env trackeado por git: ${envTracked ? 'SÍ — corregir' : 'no'}`);
console.log(`Carpetas analizadas: ${scanTargets.map((t) => path.relative(ROOT, t)).join(', ') || 'ninguna (aún no hay build)'}\n`);

if (findings.size > 0) {
  console.error('❌ FUGA DETECTADA:\n');
  for (const finding of findings) console.error(`  - ${finding}`);
  process.exit(1);
}

console.log('✅ Sin fugas: la credencial no aparece en el bundle del cliente, en public/ ni en el código.');
process.exit(0);
