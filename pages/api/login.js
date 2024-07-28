import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "../../lib/cors";
import { users } from "./users"; // 사용자 배열을 임포트

export default async (req, res) => {
  await cors(req, res);

  if (req.method === "POST") {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    console.log("Received username:", username);
    console.log("Received password:", password);
    console.log("Found user:", user);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials: User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("isPasswordValid:", isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials: Password incorrect" });
    }

    const token = jwt.sign({ username: user.username }, "secret-key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};