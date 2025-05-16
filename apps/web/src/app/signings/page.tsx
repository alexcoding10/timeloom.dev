import AuthGuard from "@/components/auth/AuthGuard";
import LayoutWithNav from "@/components/nav/LayoutWithNav";
import React from "react";
import ClockView from "../../components/signings/ClockView";
import Container from "@/components/Container";
import ControlSignings from "@/components/signings/ControlSignings";

function Signings() {
  return (
    <AuthGuard allowedRoles={["supervisor", "employee", "hr"]}>
      <LayoutWithNav>
        <div className="flex flex-col gap-5">
          <ClockView />
          <div>
            <ControlSignings />
          </div>
        </div>
      </LayoutWithNav>
    </AuthGuard>
  );
}

export default Signings;
