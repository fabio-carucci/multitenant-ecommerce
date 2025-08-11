import SignUpView from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await caller.auth.session();

  if (session.user) redirect("/");

  return <SignUpView />;
};

export default SignUp;
