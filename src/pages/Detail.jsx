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
  const { letters, isLetterLoading } = useSelector((state) => state.letters);
  const [selectedLetter, setSelectedLetter] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(__getLetters());
  }, []);
  useEffect(() => {
    setSelectedLetter(letters.find((letter) => letter.id === id));
    console.log(letters.find((letter) => letter.id === id));
  }, [isLetterLoading]);
  console.log("isloading", isLetterLoading);
  if (isLetterLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <div>
      <Layout>
        {selectedLetter &&
          (user.nickname === selectedLetter.nickname ? (
            <div>
              <p>{selectedLetter.nickname}</p>
              <p>{selectedLetter.content}</p>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
              <button>수정</button>
            </div>
          ) : (
            <div>
              <p>{selectedLetter.nickname}</p>
              <p>{selectedLetter.content}</p>
            </div>
          ))}
      </Layout>
    </div>
  );
}
