import { useDispatch, useSelector } from "react-redux";
import { __getLetters } from "../redux/modules/lettersSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LetterList() {
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { letters, error } = useSelector((state) => state.letters);
  const [letterState, setLetterState] = useState(letters);
  useEffect(() => {
    dispatch(__getLetters());
  }, []);
  const filteredLetters = letterState.filter(
    (letter) => letter.writedTo === activeMember.member
  );
  return (
    <div>
      {" "}
      {filteredLetters.map((letter) => {
        return (
          <div
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
            <p>{letter.nickname}</p>
            <p>{letter.content}</p>
          </div>
        );
      })}
    </div>
  );
}
