import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function LoginSignup() {
  const [isMember, setIsMember] = useState(true);

  return (
    <>
      {isMember ? (
        <Login setIsMember={setIsMember} />
      ) : (
        <Signup setIsMember={setIsMember} />
      )}
    </>
  );
}
