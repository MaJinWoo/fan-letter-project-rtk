import { useDispatch, useSelector } from "react-redux";
import { __getLetters } from "../redux/modules/lettersSlice";
import { useEffect } from "react";

export default function LetterList() {
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const { letters, error } = useSelector((state) => state.letters);
  useEffect(() => {
    dispatch(__getLetters());
  }, []);
  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember.member
  );
  return (
    <div>
      {" "}
      {filteredLetters.map((letter) => {
        return (
          <div key={letter.id}>
            <p>{letter.nickname}</p>
            <p>{letter.content}</p>
          </div>
        );
      })}
    </div>
  );
}
