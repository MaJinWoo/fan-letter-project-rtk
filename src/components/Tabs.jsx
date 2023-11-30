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
      <StBtnMinji>민지</StBtnMinji>
      <StBtnHani>하니</StBtnHani>
      <StBtnDaniel>다니엘</StBtnDaniel>
      <StBtnHerin>해린</StBtnHerin>
      <StBtnHyein>혜인</StBtnHyein>
    </ul>
  );
}
const StBtnMinji = styled.button`
  &:hover {
    background-color: #ff0000;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
  border: none;
  font-size: 25px;
  width: 200px;
  margin: 10px 10px 10px 10px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  float: left;
  position: relative;

  background-color: #fa5a5a;
  color: white;
  transition: all 0.2s;
  border-radius: 5px;
`;
const StBtnHani = styled.button`
  &:hover {
    background-color: #ff8e00;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
  border: none;
  font-size: 25px;
  position: relative;
  float: left;
  width: 200px;
  margin: 10px 10px 10px 10px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 5px;
  background-color: #ffaa40;
`;
const StBtnDaniel = styled.button`
  &:hover {
    background-color: #21825b;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
  border: none;
  font-size: 25px;

  position: relative;
  float: left;
  width: 200px;
  margin: 10px 10px 10px 10px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 5px;
  transition: all 0.2s;
  background-color: #00ae68;
`;
const StBtnHerin = styled.button`
  &:hover {
    background-color: #01939a;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
  border: none;
  font-size: 25px;

  position: relative;
  float: left;
  width: 200px;
  margin: 10px 10px 10px 10px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 5px;
  transition: all 0.2s;
  background-color: #5dc8cd;
`;
const StBtnHyein = styled.button`
  &:hover {
    background-color: #6d184b;
    color: white;
    transition: 0.5s;
  }
  cursor: pointer;
  border: none;
  font-size: 25px;

  position: relative;
  float: left;
  width: 200px;
  margin: 10px 10px 10px 10px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 5px;
  transition: all 0.2s;
  background-color: #a74982;
`;
