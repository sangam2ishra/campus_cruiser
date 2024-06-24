import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully");
  } catch (error) {
    console.error("Error sending email:", error); // Include a colon after "Error sending email"
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const sendNotification = async ({ userIds, message }) => {
  try {
    // Fetch users from the database using userIds
    const users = await User.find({ _id: { $in: userIds } });
    const recipients = users.map(user => user.email).join(', ');

    // Construct email options
    const emailOptions = {
      from: {
        name: "Travel Cruisers",
        address: process.env.USER,
      },
      to: recipients, // Array of email addresses
      // to: "22cs01071@iitbbs.ac.in", // Array of email addresses
      subject: "IIT BBS Transportation",
      text: message,
      cc: "sangamkr.mishra@gmail.com",
    };

    // Send email notification
    await sendMail(emailOptions);

    console.log("Notifications sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error); // Include a colon after "Error sending notification"
    throw error; // Re-throw the error to be caught by the caller
  }
};