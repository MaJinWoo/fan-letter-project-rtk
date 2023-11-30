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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(__getUser());
  }, []);

  const loginStatus = localStorage.getItem("login status");
  console.log("user", user);
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    console.log("error", error);
    localStorage.setItem("login status", "logout");
    // navigate("/");
  }
  if (loginStatus === "login") {
    console.log("로그인 되었습니다.");

    return (
      <>
        <Layout>
          <Header />
          <AddForm />
          <LetterList />
        </Layout>
      </>
    );
  } else {
    console.log("다시 로그인 해주세요");
    alert("로그아웃 되었습니다! 다시 로그인 해주세요.");
    navigate("/");
  }

  // useEffect(() => {
  //   console.log("user3", user);
  //   console.log("isLogin3", isLogin);
  //   if (isLogin === true) {
  //     console.log("loginstatus", isLogin);
  //   } else if (isLogin === false) {
  //     alert("로그아웃 되었습니다. 다시 로그인 해주세요.");
  //     console.log("loginstatus", isLogin);
  //     // navigate("/");
  //   }
  // }, [isLogin]);
}
