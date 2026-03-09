import { prisma } from '../../../../lib/prisma';
import _bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const bcrypt = _bcrypt.default ?? _bcrypt;

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'A senha deve ter no mínimo 6 caracteres' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return Response.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate verification token (valid for 24h)
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Nevada Consulting <noreply@nevadaconsulting.com.br>',
      to: email,
      subject: 'Confirme seu email — Nevada Consulting',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #111; color: #fff; border-radius: 12px;">
          <h2 style="color: #8D519E; margin-bottom: 8px;">Bem-vindo(a), ${name}!</h2>
          <p style="color: #ccc; line-height: 1.6;">
            Obrigado por se cadastrar na <strong>Nevada Consulting</strong>.<br/>
            Clique no botão abaixo para confirmar seu email e ativar sua conta.
          </p>
          <a href="${verificationUrl}"
            style="display: inline-block; margin-top: 24px; padding: 14px 28px; background: #8D519E; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Confirmar email
          </a>
          <p style="margin-top: 24px; color: #666; font-size: 13px;">
            Este link expira em 24 horas. Se você não criou uma conta, ignore este email.
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
    } else {
      console.log('Resend email sent, id:', emailData?.id);
    }

    return Response.json(
      { message: 'Conta criada! Verifique seu email para ativar a conta.' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Register error:', error);
    return Response.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
