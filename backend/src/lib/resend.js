import { Resend } from 'resend';

import { ENV } from "./env.js";
// import dotenv from 'dotenv';
// dotenv.config();

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME,
};