import styled, { css } from "styled-components";
import defaultUser from "../../assets/defaultUser.png";

export default function Avatar({ src, size }) {
  return (
    <AvatarFigure size={size}>
      <img src={src ?? defaultUser} alt="아바타이미지" />
    </AvatarFigure>
  );
}
const AvatarFigure = styled.figure`
  ${(props) => {
    switch (props.size) {
      case "profile":
        return css`
          width: 200px;
          height: 200px;
        `;
      case "large":
        return css`
          width: 100px;
          height: 100px;
        `;
      default:
        return css`
          width: 50px;
          height: 50px;
        `;
    }
  }}
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
