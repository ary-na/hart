import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign up",
};

const Signup = () => {
  redirect("/");
};

export default Signup;
