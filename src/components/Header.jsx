import Tabs from "./Tabs";
import styled from "styled-components";
export default function Header() {
  return (
    <div>
      <Title>New Jeans Fan Letter</Title>
      <Tabs />
    </div>
  );
}
const Title = styled.h1`
  font: italic small-caps bold 100px cursive;
  color: white;
  margin-top: 40px;
  text-align: center;
`;
