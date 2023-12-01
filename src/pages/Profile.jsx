import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __changeProfile, __getUser } from "../redux/modules/userSlice";
import Layout from "../layouts/Layout";
import { __getLetters } from "../redux/modules/lettersSlice";
import Avatar from "../components/common/Avatar";
import styled from "styled-components";
export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  const { user, isLoading } = useSelector((state) => state.user);
  const [newNickname, setNewNickname] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  console.log("profile user", user);
  const editModeHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const onUploadHandler = (e) => {
    const file = e.target.files[0];
    setImageSrc(file);
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // setImageSrc(reader.result);
    // return new Promise((resolve) => {
    //   reader.onload = () => {
    //     setImageSrc(reader.result || null);
    //     resolve();
    //   };
    // });
  };
  console.log(imageSrc);
  useEffect(() => {
    dispatch(__getUser());
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <Layout>
      <ProfileWrapper>
        <p>{!isEditMode ? "프로필 관리" : "프로필 수정"}</p>
        {!isEditMode ? (
          <ProfileSection>
            <Avatar src={user.avatar} size="profile" />
            <p>{user.nickname}</p>
            <button onClick={editModeHandler}>수정하기</button>
          </ProfileSection>
        ) : (
          <ProfileForm
            onSubmit={(e) => {
              e.preventDefault();
              const newProfile = {
                avatar: imageSrc,
                nickname: newNickname,
              };
              dispatch(__changeProfile(newProfile));
              dispatch(__getUser());
              setIsEditMode(!isEditMode);
            }}
          >
            <input type="file" onChange={(e) => onUploadHandler(e)} />
            <img src={imageSrc} />
            <label>새로운 닉네임</label>
            <input
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <ButtonSection>
              <button type="button" onClick={() => setIsEditMode(!isEditMode)}>
                취소
              </button>
              <button type="submit">완료</button>
            </ButtonSection>
          </ProfileForm>
        )}
      </ProfileWrapper>
    </Layout>
  );
}

const ProfileWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileSection = styled.section`
  background-color: gray;
  color: white;
  padding: 30px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  width: 700px;
  min-height: 400px;
`;
const ProfileForm = styled.form`
  background-color: gray;
  color: white;
  padding: 30px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  width: 700px;
  min-height: 400px;
`;
const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
`;
