import { useDispatch } from "react-redux";
import { setMember } from "../redux/modules/memberSlice";
import styled from "styled-components";
export default function Tabs() {
  const dispatch = useDispatch();
  const onActiveMember = (event) => {
    if (event.target === event.currentTarget) return;
    dispatch(setMember(event.target.textContent));
  };
  return (
    <ul onClick={onActiveMember}>
      <StButton>MINJI</StButton>
      <StButton>HANI</StButton>
      <StButton>DANIEL</StButton>
      <StButton>HERIN</StButton>
      <StButton>HYEIN</StButton>
    </ul>
  );
}
const StButton = styled.button`
  &:hover {
    background-color: #807b7b;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
  border: none;
  width: 200px;
  margin: 10px 10px 10px 10px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  float: left;
  position: relative;
  font: italic small-caps bold 30px cursive;

  background-color: transparent;
  color: white;
  transition: all 0.2s;
  border-radius: 5px;
`;
