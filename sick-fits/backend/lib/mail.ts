import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
      <div className="email" style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
      ">
            <h2>Hello There!</h2>
            <p>${text}</p>

            <p>Love, Hosam. <3 </p>
      </div>
      `;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // send email
  const info = (await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Password Reset Request',
    html: makeANiceEmail(
      `Please follow <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">this link</a> to reset your password.`
    ),
  })) as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email'))
    console.log(`
      Posted reset message to ethreal, Check it out at ${getTestMessageUrl(
        info
      )}`);
}
