import * as React from "react";
import styled, { css, keyframes } from "styled-components";

const load = keyframes`
  from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
`;
const animationEffect = css`
  ${load} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;
const SkeletonListStyled = styled.div`
  box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
  border-radius: 4px;
  height: 80px;
  position: relative;
  overflow: hidden;
  margin: 20px 0;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #e8e8e8 50%,
      transparent 100%
    );
    animation: ${animationEffect};
  }
`;

const SkeletonList: React.FC = () => {
  return <SkeletonListStyled />;
};

export default SkeletonList;
