import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteLetters,
  __editLetters,
  __getLetters,
} from "../redux/modules/lettersSlice";
import { __getUser } from "../redux/modules/userSlice";
import styled from "styled-components";
import Avatar from "../components/common/Avatar";
import { getFormattedDate } from "../util/date";
import letterImg from "../assets/memo.png";
import backgroundImg from "../assets/newjeans.jpeg";
export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newContent, setNewContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { letters, isLetterLoading } = useSelector((state) => state.letters);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedLetter = letters.find((letter) => letter.id === id);
  const onEditModeHandler = () => {
    setEditMode(!editMode);
    setNewContent("");
  };
  const onDeleteHandler = () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (!answer) return;
    navigate("/home");
    dispatch(__deleteLetters(id));
  };
  const onEditDone = () => {
    if (!newContent) return alert("수정사항이 없습니다!");
    else alert("수정되었습니다!");
    const newLetter = {
      id,
      content: newContent,
    };
    dispatch(__editLetters(newLetter));
    dispatch(__getLetters());
    setNewContent("");
    setEditMode(false);
  };
  useEffect(() => {
    dispatch(__getUser());
    dispatch(__getLetters());
  }, []);
  if (isLetterLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <Layout>
      {user.userId === selectedLetter.userId ? (
        <DetailWrapper>
          <SelectedLetterSection>
            <AvatarAndNickname>
              <Avatar src={selectedLetter.avatar} size="large" />
              <p>{selectedLetter.nickname}</p>
            </AvatarAndNickname>
            <StyledTime>
              {getFormattedDate(selectedLetter.createdAt)}
            </StyledTime>
            {editMode ? (
              <>
                <StyledTextarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                ></StyledTextarea>
                <ButtonSection>
                  <StyledButton type="button" onClick={onEditDone}>
                    수정
                  </StyledButton>
                  <StyledButton onClick={onEditModeHandler}>취소</StyledButton>
                </ButtonSection>
              </>
            ) : (
              <>
                <Content>{selectedLetter.content}</Content>
                <ButtonSection>
                  <StyledButton onClick={onDeleteHandler}>삭제</StyledButton>
                  <StyledButton onClick={onEditModeHandler}>수정</StyledButton>
                </ButtonSection>
              </>
            )}
          </SelectedLetterSection>
        </DetailWrapper>
      ) : (
        <DetailWrapper>
          <SelectedLetterSection>
            <AvatarAndNickname>
              <Avatar src={selectedLetter.avatar} size="large" />
              <p>{selectedLetter.nickname}</p>
            </AvatarAndNickname>
            <StyledTime>
              {getFormattedDate(selectedLetter.createdAt)}
            </StyledTime>
            <Content>{selectedLetter.content}</Content>
          </SelectedLetterSection>
        </DetailWrapper>
      )}
    </Layout>
  );
}
const DetailWrapper = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  min-height: 1000px;

  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedLetterSection = styled.section`
  background-color: white;
  border: 3px solid lightgray;
  border-radius: 12px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 600px;
  min-height: 550px;
  position: relative;
`;
const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  left: 60px;
  top: 40px;
`;
const StyledTime = styled.time`
  position: absolute;

  top: 80px;
  right: 60px;
`;
const Content = styled.p`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  width: 490px;
  border: 1px solid black;
  border-radius: 12px;
  height: 200px;
  position: absolute;

  left: 50px;
  bottom: 150px;
`;
const EditSection = styled.div`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background: white;
  border-radius: 12px;
  height: 200px;
`;
const StyledTextarea = styled.textarea`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  border-radius: 12px;
  height: 200px;
  resize: none;
  outline: none;
  position: absolute;
  width: 490px;

  left: 50px;
  bottom: 150px;
`;
const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  position: absolute;

  bottom: 80px;
  right: 60px;
`;

const StyledButton = styled.button`
  width: 100px;
  font-size: 20px;
  background-color: lightgray;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
