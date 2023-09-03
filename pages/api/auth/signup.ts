import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password, name } = req.body;

    // Validating request
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(password, { min: 5 }),
        errorMessage: "Password must contain at least 5 characters",
      },
      {
        valid: validator.isAlphanumeric(password),
        errorMessage: "Password must be Alphanumeric",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    // Validating unique username
    const isUsernameTaken = await prisma.user.findUnique({
      where: { username },
    });
    if (isUsernameTaken) {
      return res
        .status(400)
        .json({ errorMessage: "Username you entered is already taken." });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Storing to DB
    const user = await prisma.user.create({
      data: {
        username,
        name,
        bio: "",
        profile_img: "",
        password: hashedPassword,
      },
    });

    // Generating token
    const algorithm = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ username: user.username })
      .setProtectedHeader({ alg: algorithm })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("token", token, { res, req, maxAge: 60 * 6 * 24 });

    // Responding to client
    return res
      .status(200)
      .json({
        name: user.name,
        username: user.username,
        profile_img: user.profile_img,
        bio: user.bio,
      });
  }
  return res.status(404).json({ errorMessage: "Not Found" });
};

export default handler;
