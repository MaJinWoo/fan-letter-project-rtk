import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __getUser, __loginUser } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import letterImg from "../assets/letter.png";

export default function Login({ setIsMember }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <LoginWrapper>
      <Title>New Jeans Fan Letter</Title>
      <LoginForm
        onSubmit={(e) => {
          e.preventDefault();
          if (!userId || !userPassword)
            return alert("닉네임과 비밀번호를 모두 입력해주세요");
          const newUser = {
            id: userId,
            password: userPassword,
          };
          dispatch(__loginUser(newUser));

          navigate("/home");
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
        <ButtonWrapper>
          <StyledBtn type="submit">로그인</StyledBtn>
          {/* <StyledBtn type="button" onClick={() => setIsMember(false)}>
            회원가입
          </StyledBtn> */}
        </ButtonWrapper>
        <StyledBtn type="button" onClick={() => setIsMember(false)}>
          회원가입
        </StyledBtn>
      </LoginForm>
    </LoginWrapper>
  );
}
const LoginWrapper = styled.div`
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
const LoginForm = styled.form`
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
