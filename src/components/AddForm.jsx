import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addLetters, __getLetters } from "../redux/modules/lettersSlice";
import styled from "styled-components";
import { __getUser } from "../redux/modules/userSlice";
import letterImg from "../assets/memo.png";
export default function AddForm() {
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
          <StyledSelect onChange={(e) => setMember(e.target.value)}>
            <option>민지</option>
            <option>하니</option>
            <option>다니엘</option>
            <option>해린</option>
            <option>혜인</option>
          </StyledSelect>
        </BtnSection>
      </StyledForm>
    </FormWrapper>
  );
}
const FormWrapper = styled.div`
  display: flex;
  background-image: url(${letterImg});
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  height: 310px;
  width: 350px;
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
  background-color: yellow;
  border: none;
  font-size: 20px;
`;
const BtnSection = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledBtn = styled.button`
  width: 100px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const StyledSelect = styled.select`
  font-size: 20px;
`;
