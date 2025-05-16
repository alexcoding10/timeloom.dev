import AuthGuard from "@/components/auth/AuthGuard";
import LayoutWithNav from "@/components/nav/LayoutWithNav";
import React from "react";
import { SigningsProvider } from "@/context/SigningsContext";
import SigningsView from "./SigningsView";

function Signings() {
  return (
    <AuthGuard allowedRoles={["supervisor", "employee", "hr"]}>
      <LayoutWithNav>
        <SigningsProvider>
          <SigningsView/>
        </SigningsProvider>
      </LayoutWithNav>
    </AuthGuard>
  );
}

export default Signings;
