import bcrypt from "bcryptjs";
import cors from "../../lib/cors";
import { users } from "./users"; // 사용자 배열을 임포트

export default async (req, res) => {
  await cors(req, res);

  if (req.method === "POST") {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Registering user:", username); // 디버깅 용도
    console.log("Hashed password:", hashedPassword); // 디버깅 용도
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
