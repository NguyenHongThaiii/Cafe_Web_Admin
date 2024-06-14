import { SignIn } from "@/pages/auth";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full">
      <SignIn />
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
