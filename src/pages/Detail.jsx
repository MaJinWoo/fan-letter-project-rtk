import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Detail() {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedLetter = JSON.parse(localStorage.getItem("selected letter"));
  const { id } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const [newContent, setNewContent] = useState("");

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_FAN_LETTER_AUTH_URL}/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //*****add 하고 getletters 다시 해보기 /
  const onUpdateBtnHandler = async () => {
    axios.patch(
      `${process.env.REACT_APP_FAN_LETTER_SERVER_URL}/letters/${id}`,
      {
        content: newContent,
      }
    );
  };

  // if (user.nickname !== filteredLetter.nickname) {
  //   console.log("cannot edit");
  // } else console.log("can edit");
  return (
    <div>
      <Layout>
        <p>{selectedLetter.nickname}</p>
        <p>{selectedLetter.content}</p>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <button onClick={onUpdateBtnHandler}>수정</button>
      </Layout>
    </div>
  );
}
