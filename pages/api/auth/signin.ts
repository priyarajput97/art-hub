import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Checking if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid username or password" });
    }

    // Comparing password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid username or password" });
    }

    // Generating token
    const algorithm = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ username: user.username })
      .setProtectedHeader({ alg: algorithm })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("token", token, { res, req, maxAge: 60 * 6 * 24 });

    // Responding to client
    res.status(200).json({
      name: user.name,
      username: user.username,
      profile_img: user.profile_img,
      bio: user.bio,
    });
  }
  return res.status(404).json("NOT FOUND");
};

export default handler;
