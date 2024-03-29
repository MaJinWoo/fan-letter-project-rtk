import { useDispatch, useSelector } from "react-redux";
import { __getLetters } from "../redux/modules/lettersSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../util/date";
import styled from "styled-components";
import Avatar from "./common/Avatar";
// import letterImg from "../assets/memo.png";

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
  console.log("home letters", letters);
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: center;
  margin-left: 20px;
  margin-top: 40px;
  gap: 20px;
  border-radius: 12px;
  padding: 12px;
`;

const LetterWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: 3px solid black;
  border-radius: 12px;
  background-color: white;
  height: 200px;
  width: 350px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;
const UserInfo = styled.div`
  position: absolute;
  left: 30px;
  top: 20px;
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
  position: absolute;
  top: 100px;
  left: 20px;
  background-color: transparent;
  border-radius: 12px;
  padding: 12px;
  width: 300px;
  border: 1px solid black;

  /* margin-left: 62px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
