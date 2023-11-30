import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  return (
    <div>
      <button>Home</button>
      {user?.nickname}님 안녕하세요!
      <button onClick={() => navigate("/profile/:id")}>프로필</button>
      <button
        onClick={() => {
          // 로그아웃 로직
          localStorage.removeItem("user");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
