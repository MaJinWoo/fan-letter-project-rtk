import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __registerUser } from "../redux/modules/userSlice";
import styled from "styled-components";
import letterImg from "../assets/letter.png";

export default function Signup({ setIsMember }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const dispatch = useDispatch();

  const { user, isLogin, error } = useSelector((state) => state.user);

  return (
    <SignupWrapper>
      <Title>New Jeans Fan Letter</Title>

      <SignupForm
        onSubmit={(e) => {
          e.preventDefault();
          if (!userId || !userPassword || !userNickname)
            return alert("기입되지 않은 정보가 있습니다.");

          const newUser = {
            id: userId,
            password: userPassword,
            nickname: userNickname,
          };
          dispatch(__registerUser(newUser));
          setIsMember(true);
        }}
      >
        <StyledInput
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디"
        />
        <StyledInput
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <StyledInput
          value={userNickname}
          onChange={(e) => setUserNickname(e.target.value)}
          placeholder="닉네임"
        />
        <ButtonWrapper>
          <StyledBtn type="submit">회원가입</StyledBtn>
          <StyledBtn type="button" onClick={() => setIsMember(true)}>
            로그인
          </StyledBtn>
        </ButtonWrapper>
      </SignupForm>
    </SignupWrapper>
  );
}
const SignupWrapper = styled.div`
  width: 460px;
  height: 300px;
  margin: 40px auto;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${letterImg});
  background-size: cover;
  background-position: center;
`;
const Title = styled.h1`
  margin-top: 40px;
  font: italic small-caps bold 25px cursive;
`;
const SignupForm = styled.form`
  padding: 60px;
  width: 200px;
  height: 100px;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 10px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 5px;
`;
const StyledInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid black;
  width: 150px;
  background-color: transparent;
  padding: 5px;
`;
const StyledBtn = styled.button`
  width: 70px;
  background-color: white;
  border: none;
  cursor: pointer;
`;
