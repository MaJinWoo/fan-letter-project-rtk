import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/home")}>Home</button>
      {user?.nickname}님 안녕하세요!
      <button onClick={() => navigate(`/profile/${user.id}`)}>프로필</button>
      <button
        onClick={() => {
          // 로그아웃 로직
          localStorage.setItem("login status", "logout");
          alert("로그아웃 되었습니다! 다시 로그인 해주세요.");
          navigate("/");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
