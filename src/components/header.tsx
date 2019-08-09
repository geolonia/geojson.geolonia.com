import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.header`
  position: relative;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  font-weight: 400;
  color: #999;
`;

const ClearButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
`;

export const Header: React.FC = () => {
  return (
    <HeaderWrap>
      <H1>{"GeoJSON Editor"}</H1>
      <ClearButton>{"Clear"}</ClearButton>
    </HeaderWrap>
  );
};

export default Header;
