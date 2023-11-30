import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __changeProfile, __getUser } from "../redux/modules/userSlice";
import Layout from "../layouts/Layout";

export default function Profile() {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isError, error } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const [newNickname, setNewNickname] = useState(user.nickname);

  console.log("profile page", user);
  const editModeHandler = () => {
    setIsEditMode(!isEditMode);
  };
  return (
    <Layout>
      <div>
        <p>{!isEditMode ? "프로필 관리" : "프로필 수정"}</p>
        {!isEditMode ? (
          <div>
            <p>{newNickname}</p>
            <button onClick={editModeHandler}>수정하기</button>
          </div>
        ) : (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newProfile = {
                  avatar: "",
                  nickname: newNickname,
                };
                dispatch(__changeProfile(newProfile));
                setIsEditMode(!isEditMode);
              }}
            >
              <p>새로운 닉네임</p>
              <input
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
              <button type="submit">완료</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
