"use client";

import LayoutWithNav from "@/components/nav/LayoutWithNav";
import AuthGuard from "@/components/auth/AuthGuard";
import { UserControlProvider } from "@/context/UserControlContext";
import ControlUserView from "./components/ControlUserView";

function ControlUser() {
  return (
    <UserControlProvider>
      <AuthGuard allowedRoles={['admin', 'hr']}>
        <LayoutWithNav>
          <ControlUserView />
        </LayoutWithNav>
      </AuthGuard>
    </UserControlProvider>
  );
}

export default ControlUser;
