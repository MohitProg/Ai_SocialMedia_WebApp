import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const SendOTPMail = async (name: string, email: string,otp:number) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Welcome 🎉",
    html: `
          <h1>Hello ${name}</h1>
          <p>Welcome to our platform.</p>
           <p>Your Verification Otp is ${otp}.</p>

        `,
  });

  if (error) {
    return console.log(error);
  }

  console.log(data);
};
