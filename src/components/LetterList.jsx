import { useDispatch, useSelector } from "react-redux";
import { __getLetters } from "../redux/modules/lettersSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../util/date";
import styled from "styled-components";
import Avatar from "./common/Avatar";
export default function LetterList() {
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { letters } = useSelector((state) => state.letters);

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember.member
  );

  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>
          {activeMember.member}에게 남겨진 펜레터가 없습니다. 첫 번째 펜레터의
          주인공이 되보세요!
        </p>
      ) : (
        filteredLetters.map((letter) => {
          return (
            <LetterWrapper
              key={letter.id}
              onClick={() => {
                navigate(`/detail/${letter.id}`);
                localStorage.setItem(
                  "selected letter",
                  JSON.stringify({
                    id: letter.id,
                    nickname: letter.nickname,
                    content: letter.content,
                  })
                );
              }}
            >
              <UserInfo>
                <Avatar src={letter.avatar} />
                <NicknameAndDate>
                  <p>{letter.nickname}</p>
                  <time>{getFormattedDate(letter.createdAt)}</time>
                </NicknameAndDate>
              </UserInfo>
              <Content>{letter.content}</Content>
            </LetterWrapper>
          );
        })
      )}
    </ListWrapper>
  );
}
const ListWrapper = styled.ul`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  color: black;
`;

const LetterWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: black;
  padding: 12px;
  border: 1px solid black;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;
const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Content = styled.p`
  background-color: transparent;
  border: 1px solid black;
  border-radius: 12px;
  padding: 12px;
  margin-left: 62px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
