import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div>
      <div>Home page</div>
      {/* if user not sign in  */}
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      {/* if user sign in  */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default App;
