export interface JwtPayload {
  username: string;
  email: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}