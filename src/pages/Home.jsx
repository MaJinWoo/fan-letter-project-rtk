import { useDispatch, useSelector } from "react-redux";
import AddForm from "../components/AddForm";
import LetterList from "../components/LetterList";
import { useEffect } from "react";
import { __getUser } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Header from "../components/Header";
import styled from "styled-components";
import backgroundImg from "../assets/background-color2.jpg";
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.user
  );

  const loginStatus = localStorage.getItem("login status");
  useEffect(() => {
    dispatch(__getUser());
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    console.log("error", error);
    localStorage.setItem("login status", "logout");
  }
  if (loginStatus === "login") {
    console.log("로그인 되었습니다.");

    return (
      <>
        <Layout>
          <Container>
            <Header />
            <AddForm />
            <LetterList />
          </Container>
        </Layout>
      </>
    );
  } else {
    console.log("다시 로그인 해주세요");
    alert("로그아웃 되었습니다! 다시 로그인 해주세요.");
    navigate("/");
  }
}

const Container = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 20px;
`;
