import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IOtp {
  email: string;
  otp: string;
  createdAt: Date;
  matchOTP(OTP: number): Promise<boolean>;
}

const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
});

otpSchema.methods.matchOTP = async function (OTP: string) {
  return await bcrypt.compare(OTP, this.otp);
};

const Otp = model<IOtp>("Otp", otpSchema);
export default Otp;
