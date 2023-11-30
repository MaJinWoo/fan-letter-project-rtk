import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __loginUser } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsMember }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const { user, accessToken, isLogin, isLoading, isError, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newUser = {
            id: userId,
            password: userPassword,
          };
          dispatch(__loginUser(newUser));
          navigate("/home");
        }}
      >
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
        <br />
        <input
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
