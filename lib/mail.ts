import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

//2FA email ma token aauxa
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "dipeshgyawali365@gmail.com",
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

//this is to reset the password if forgotten
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "dipeshgyawali365@gmail.com",
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

//this is to verify the email while register
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "dipeshgyawali365@gmail.com",
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
