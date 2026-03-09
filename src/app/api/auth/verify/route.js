import { prisma } from '../../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    return redirect('/?error=link-invalido');
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || verificationToken.identifier !== email) {
    return redirect('/?error=link-invalido');
  }

  if (verificationToken.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } });
    return redirect('/?error=link-expirado');
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return redirect('/?verified=true');
}
