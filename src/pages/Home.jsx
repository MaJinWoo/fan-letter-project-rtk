import { useDispatch, useSelector } from "react-redux";
import AddForm from "../components/AddForm";
import LetterList from "../components/LetterList";
import { useEffect } from "react";
import { __getUser } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Header from "../components/Header";
import styled from "styled-components";
import backgroundImg from "../assets/newjeans.jpeg";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, error } = useSelector((state) => state.user);

  const user = localStorage.getItem("user");

  useEffect(() => {
    dispatch(__getUser());
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    console.log("error", error);
  }
  if (user) {
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
  }
}

const Container = styled.div`
  background-size: cover;
  min-height: 1000px;
  background-image: url(${backgroundImg});
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 20px;
`;
