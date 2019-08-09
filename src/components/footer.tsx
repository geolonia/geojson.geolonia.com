import React from "react";
import styled from "styled-components";

const FooterWrap = styled.footer`
  margin: 0;
  padding: 0;
  text-align: right;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Link = styled.a`
  margin: 0;
  padding: 0;
  font-size: 10px;
  color: #999;
  text-decoration: none;
`;

const Image = styled.img`
  max-height: 16px;
  vertical-align: middle;
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrap>
      <Link href="https://geolonia.com">
        <Image src="./logo.png"></Image>
      </Link>
    </FooterWrap>
  );
};

export default Footer;
