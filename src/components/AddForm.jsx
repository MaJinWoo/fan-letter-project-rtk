import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addLetters, __getLetters } from "../redux/modules/lettersSlice";

export default function AddForm() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [body, setBody] = useState("");
  const [member, setMember] = useState("민지");
  const dispatch = useDispatch();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newLetter = {
            nickname: user.nickname,
            content: body,
            avatar: "",
            writedTo: member,
            createdAt: "",
            userId: user.userId,
          };
          dispatch(__addLetters(newLetter));
          dispatch(__getLetters());
          setBody("");
        }}
      >
        <p>닉네임 : {user.nickname}</p>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">등록하기</button>
        <select onChange={(e) => setMember(e.target.value)}>
          <option>민지</option>
          <option>하니</option>
          <option>다니엘</option>
          <option>해린</option>
          <option>혜인</option>
        </select>
      </form>
    </>
  );
}
