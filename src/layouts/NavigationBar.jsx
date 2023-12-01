import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getUser } from "../redux/modules/userSlice";

export default function NavigationBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <NavigationWrapper>
      <StyledBtn onClick={() => navigate("/home")}>Home</StyledBtn>
      <StyledBtn onClick={() => navigate(`/profile/${user.id}`)}>
        프로필
      </StyledBtn>
      <StyledBtn
        onClick={() => {
          // 로그아웃 로직
          localStorage.clear();
          alert("로그아웃 되었습니다! 다시 로그인 해주세요.");
          navigate("/");
        }}
      >
        로그아웃
      </StyledBtn>
    </NavigationWrapper>
  );
}
const NavigationWrapper = styled.div`
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: flex-end;
  background-color: lightgray;
`;
const StyledBtn = styled.button`
  width: 100px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;
