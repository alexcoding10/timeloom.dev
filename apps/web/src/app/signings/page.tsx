import AuthGuard from "@/components/auth/AuthGuard";
import LayoutWithNav from "@/components/LayoutWithNav";
import React from "react";

function Signings() {
  return (
    <AuthGuard allowedRoles={["supervisor", "employee", "hr"]}>
      <LayoutWithNav>
        <div>Signings</div>
      </LayoutWithNav>
    </AuthGuard>
  );
}

export default Signings;
