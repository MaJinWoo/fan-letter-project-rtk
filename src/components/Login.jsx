import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getUser, __loginUser } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsMember }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const { user, isLogin, isLoading, isError, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newUser = {
            id: userId,
            password: userPassword,
          };
          await dispatch(__loginUser(newUser));
          console.log("islogin", isLogin);
          navigate("/home");
        }}
      >
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
        <br />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />

        <button type="submit">로그인</button>
      </form>
      <button type="button" onClick={() => setIsMember(false)}>
        회원가입
      </button>
    </>
  );
}
