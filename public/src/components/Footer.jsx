import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <a
          href={`${process.env.PUBLIC_URL}/privacy.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a href="https://www.termsandconditionsgenerator.com/live.php?token=IS3RowfoqqpIaDYfbSWuxqa2joOIfg3V">
          Terms and Conditions
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Hiddchat.in. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  padding: 1rem;
  background-color: #000;
  color: white;
  text-align: center;
  a {
    color: #61dafb;
    margin: 0 0.5rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #ccc;
  }
`;
