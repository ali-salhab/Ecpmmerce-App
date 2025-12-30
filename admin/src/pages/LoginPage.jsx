import React from "react";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/clerk-react";
function LoginPage() {
  return (
    <div className="flex flex-col gap-4 bg-base-300 items-center justify-center h-screen">
      <SignOutButton></SignOutButton>
      <SignInButton />
      Login Page
    </div>
  );
}

export default LoginPage;
