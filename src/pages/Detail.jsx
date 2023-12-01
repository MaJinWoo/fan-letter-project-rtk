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
  };
  const onDeleteHandler = () => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (!answer) return;
    navigate("/home");
    dispatch(__deleteLetters(id));
  };
  const onEditDone = () => {
    if (!newContent) return alert("수정사항이 없습니다!");
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
            {editMode ? (
              <>
                <StyledTextarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                ></StyledTextarea>
                <ButtonSection>
                  <button type="button" onClick={onEditDone}>
                    수정
                  </button>
                  <button onClick={onEditModeHandler}>취소</button>
                </ButtonSection>
              </>
            ) : (
              <div>
                <Content>{selectedLetter.content}</Content>
                <ButtonSection>
                  <button onClick={onDeleteHandler}>삭제</button>
                  <button onClick={onEditModeHandler}>수정</button>
                </ButtonSection>
              </div>
            )}
          </SelectedLetterSection>
        </DetailWrapper>
      ) : (
        <DetailWrapper>
          <SelectedLetterSection>
            <AvatarAndNickname>
              <Avatar src={selectedLetter.avatar} />
              <p>{selectedLetter.nickname}</p>
            </AvatarAndNickname>
            <time>{getFormattedDate(selectedLetter.createdAt)}</time>
            <Content>{selectedLetter.content}</Content>
          </SelectedLetterSection>
        </DetailWrapper>
      )}
    </Layout>
  );
}
const DetailWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedLetterSection = styled.section`
  background-color: gray;
  color: white;
  padding: 12px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 700px;
  min-height: 400px;
`;
const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Content = styled.p`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background: black;
  border-radius: 12px;
  height: 200px;
`;
const EditSection = styled.div`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background: black;
  border-radius: 12px;
  height: 200px;
`;
const StyledTextarea = styled.textarea`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background: black;
  border-radius: 12px;
  height: 200px;
  resize: none;
  color: white;
`;
const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
