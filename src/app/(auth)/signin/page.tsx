import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in",
};

const Signin = () => {
  redirect("/?auth=signin");
};

export default Signin;
