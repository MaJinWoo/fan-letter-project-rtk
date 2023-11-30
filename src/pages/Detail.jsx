import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getLetters } from "../redux/modules/lettersSlice";
import { __getUser } from "../redux/modules/userSlice";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState("");
  const { letters } = useSelector((state) => state.letters);
  const selectedLetter = JSON.parse(localStorage.getItem("selected letter"));

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedContent = letters.find((letter) => letter.id === id);
  const onUpdateBtnHandler = async () => {
    await axios.patch(
      `${process.env.REACT_APP_FAN_LETTER_SERVER_URL}/letters/${id}`,
      {
        content: newContent,
      }
    );
    localStorage.setItem(
      "selected letter",
      JSON.stringify({ ...selectedLetter, content: newContent })
    );
    dispatch(__getLetters());
  };

  return (
    <div>
      <Layout>
        {user.nickname === selectedLetter.nickname ? (
          <div>
            <p>{selectedLetter.nickname}</p>
            <p>{selectedContent.content}</p>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            ></textarea>
            <button onClick={onUpdateBtnHandler}>수정</button>
          </div>
        ) : (
          <div>
            <p>{selectedLetter.nickname}</p>
            <p>{selectedContent.content}</p>
          </div>
        )}
      </Layout>
    </div>
  );
}
