import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addLetters, __getLetters } from "../redux/modules/lettersSlice";
import styled from "styled-components";
import { __getUser } from "../redux/modules/userSlice";
export default function AddForm() {
  // const user = JSON.parse(localStorage.getItem("user"));

  const [body, setBody] = useState("");
  const [member, setMember] = useState("민지");
  const [nickname, setNickname] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  console.log("addform", nickname);
  return (
    <FormWrapper>
      <h1>편지를 등록하세요!</h1>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          const newLetter = {
            nickname: user.nickname,
            content: body,
            avatar: user.avatar,
            writedTo: member,
            createdAt: new Date(),
            userId: user.userId,
          };
          dispatch(__addLetters(newLetter));
          dispatch(__getLetters());
          setBody("");
        }}
      >
        <p>닉네임 : {user.nickname}</p>
        <StyledTextarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <BtnSection>
          <StyledBtn type="submit">등록하기</StyledBtn>
          <select onChange={(e) => setMember(e.target.value)}>
            <option>민지</option>
            <option>하니</option>
            <option>다니엘</option>
            <option>해린</option>
            <option>혜인</option>
          </select>
        </BtnSection>
      </StyledForm>
    </FormWrapper>
  );
}
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 300px;
  width: 600px;
  border: 1px solid black;
  gap: 10px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StyledTextarea = styled.textarea`
  resize: none;
  outline: none;
  height: 150px;
  width: 200px;
  background-color: transparent;
`;
const BtnSection = styled.div`
  display: flex;
  gap: 10px;
`;
const StyledBtn = styled.button`
  width: 70px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
