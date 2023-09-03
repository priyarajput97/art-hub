import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken?.split(" ")[1];
    const payload = jwt.decode(token) as { username: string };
    const username = payload.username;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        profile_img: true,
        bio: true,
      },
    });

    if (!user) {
      return res.status(401).json({ errorMessage: "User not found" });
    }

    return res.status(200).json({ data: user });
  }
  return res.status(404).json({ errorMessage: "Not Found" });
};

export default handler;
