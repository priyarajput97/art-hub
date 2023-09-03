import { CURRENCY, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken?.split(" ")[1];
    const payload = jwt.decode(token) as { username: string };
    const username = payload.username;
    const { description, price, quantity, shop, images } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      const post = await prisma.post.create({
        data: {
          user_id: user.id,
          description,
          price,
          currency: CURRENCY.INR,
          quantity,
          shop,
          images,
        },
      });
      return res.status(200).json({ data: post });
    } else {
      return res.status(401).json({ errorMessage: "User not Authorized" });
    }
  } else {
    return res.status(404).json({ errorMessage: "Not Found" });
  }
}
