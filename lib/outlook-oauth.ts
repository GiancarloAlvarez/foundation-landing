import { prisma } from '@/lib/db';

const TOKEN_ID = 'main';
// Refresh a little early so a token that's valid-but-about-to-expire is
// never handed to nodemailer mid-send.
const EXPIRY_SAFETY_MARGIN_MS = 60_000;

interface MicrosoftTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

async function requestNewAccessToken(refreshToken: string): Promise<MicrosoftTokenResponse> {
  const tenantId = process.env.OUTLOOK_TENANT_ID;
  const clientId = process.env.OUTLOOK_CLIENT_ID;
  const clientSecret = process.env.OUTLOOK_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Faltan OUTLOOK_TENANT_ID, OUTLOOK_CLIENT_ID u OUTLOOK_CLIENT_SECRET en el entorno.');
  }

  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: 'https://outlook.office.com/SMTP.Send offline_access',
    }),
  });

  if (!response.ok) {
    throw new Error(`No se pudo renovar el token de Outlook (${response.status}): ${await response.text()}`);
  }

  return response.json();
}

// Microsoft rotates the refresh token on every use for confidential clients,
// so the new one always gets persisted — otherwise the very next refresh
// would be attempted with an already-invalidated token.
export async function getOutlookAccessToken(): Promise<string> {
  const record = await prisma.outlookMailToken.findUnique({ where: { id: TOKEN_ID } });
  if (!record) {
    throw new Error('El correo de Outlook no está configurado todavía (falta el token inicial).');
  }

  const isStillValid = record.accessToken && record.expiresAt && record.expiresAt.getTime() - Date.now() > EXPIRY_SAFETY_MARGIN_MS;
  if (isStillValid) return record.accessToken!;

  const tokens = await requestNewAccessToken(record.refreshToken);
  await prisma.outlookMailToken.update({
    where: { id: TOKEN_ID },
    data: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? record.refreshToken,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    },
  });
  return tokens.access_token;
}
