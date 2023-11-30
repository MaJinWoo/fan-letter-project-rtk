import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __registerUser } from "../redux/modules/userSlice";
export default function Signup({ setIsMember }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const dispatch = useDispatch();

  const { user, isLogin, error } = useSelector((state) => state.user);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newUser = {
            id: userId,
            password: userPassword,
            nickname: userNickname,
          };
          dispatch(__registerUser(newUser));
        }}
      >
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
        <br />
        <input
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <input
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
        />

        <button type="submit">회원가입</button>
      </form>
      <button type="button" onClick={() => setIsMember(true)}>
        로그인
      </button>
    </>
  );
}
