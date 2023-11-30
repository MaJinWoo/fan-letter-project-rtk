import { useDispatch } from "react-redux";
import { setMember } from "../redux/modules/memberSlice";

export default function Tabs() {
  const dispatch = useDispatch();
  const onActiveMember = (event) => {
    if (event.target === event.currentTarget) return;
    dispatch(setMember(event.target.textContent));
  };
  return (
    <ul onClick={onActiveMember}>
      <li>민지</li>
      <li>하니</li>
      <li>다니엘</li>
      <li>해린</li>
      <li>혜인</li>
    </ul>
  );
}
