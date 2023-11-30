import { useDispatch, useSelector } from "react-redux";
import AddForm from "../components/AddForm";
import LetterList from "../components/LetterList";
import LoginSignup from "./LoginSignup";
import { useEffect } from "react";
import { __getUser } from "../redux/modules/userSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Header from "../components/Header";

export default function Home() {
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(__getUser());
  }, []);
  console.log("userSlice 정보", user);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    console.log("error", error);
    navigate("/");
  }

  return (
    <>
      <Layout>
        <Header />
        <AddForm />
        <LetterList />
      </Layout>
    </>
  );
}
