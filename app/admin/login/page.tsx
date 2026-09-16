import { LoginForm } from './login-form';
import { AuthLayout } from '@/components/layouts/auth-layout';

export default function AdminLoginPage() {
  return (
    <AuthLayout title="Panel administrativo" description="Fundación Mamá Blanca — Inicia sesión para continuar">
      <LoginForm />
    </AuthLayout>
  );
}
