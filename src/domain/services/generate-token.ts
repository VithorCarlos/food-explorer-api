import { env } from "@/env";
import { sign } from "jsonwebtoken";

interface GenerateTokenProps {
  userId: string;
}

export class GenerateToken {
  static generate({ userId }: GenerateTokenProps) {
    const token = sign({ userId }, env.JWT_SECRET, {
      subject: userId,
      expiresIn: "15m",
    });

    return token;
  }
}
