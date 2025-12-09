import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function signJWT(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

export async function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; role: string };
    return decoded;
  } catch {
    throw new Error("Invalid token");
  }
}