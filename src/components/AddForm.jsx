import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addLetters, __getLetters } from "../redux/modules/lettersSlice";
import styled from "styled-components";
import { __getUser } from "../redux/modules/userSlice";
import letterImg from "../assets/memo.png";
import phoneImg from "../assets/iphone.png";
import sendImg from "../assets/send2.png";
import Avatar from "./common/Avatar";
export default function AddForm() {
  const [body, setBody] = useState("");
  const [member, setMember] = useState("MINJI");
  const [nickname, setNickname] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  console.log("addform", nickname);
  return (
    <FormWrapper>
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
        <NicknameAndAvatar>
          <Avatar src={user.avatar} />
          <p>{user.nickname}</p>
        </NicknameAndAvatar>
        <StyledTextarea
          value={body}
          placeholder="멤버를 선택한 후, 메세지를 입력하세요."
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <BtnSection>
          <StyledBtn type="submit">
            <img src={sendImg} />
          </StyledBtn>
          <StyledSelect onChange={(e) => setMember(e.target.value)}>
            <option>MINJI</option>
            <option>HANI</option>
            <option>DANIEL</option>
            <option>HERIN</option>
            <option>HYEIN</option>
          </StyledSelect>
        </BtnSection>
      </StyledForm>
    </FormWrapper>
  );
}
const FormWrapper = styled.div`
  display: flex;
  background-image: url(${phoneImg});
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 700px;
  width: 350px;
  gap: 10px;
`;
const StyledForm = styled.form`
  background-color: white;
  width: 300px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const NicknameAndAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 300px;
  position: absolute;
  top: 15px;
  left: 15px;
`;
const StyledTextarea = styled.textarea`
  resize: none;
  outline: none;
  height: 430px;
  width: 270px;
  background-color: white;
  border: 1px solid black;
  border-bottom: 1px solid black;
  padding: 10px;
  font-size: 20px;
  position: absolute;
  top: 100px;
  z-index: 1;
`;
const BtnSection = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledBtn = styled.button`
  width: 60px;
  height: 50px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  right: 15px;
  z-index: 10;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledSelect = styled.select`
  font-size: 20px;
  position: absolute;
  top: 30px;
  right: 15px;
  cursor: pointer;
  outline: none;
  border: none;
`;
