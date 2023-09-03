import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken?.split(" ")[1];
    const payload = jwt.decode(token) as { username: string };
    const username = payload.username;

    const { name, bio } = req.body;

    const user = await prisma.user.update({
      where: { username },
      data: { name, bio },
      select: {
        id: true,
        name: true,
        username: true,
        profile_img: true,
        bio: true,
      },
    });

    return res.status(200).json({ data: user });
  }
  return res.status(404).json({ errorMessage: "Not Found" });
};

export default handler;
