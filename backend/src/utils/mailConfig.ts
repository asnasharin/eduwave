import nodemailer from "nodemailer";

// creating a nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "xachagaming@gmail.com",
    pass: "uzzb jtme yyoh eqkl", 
  },
});
