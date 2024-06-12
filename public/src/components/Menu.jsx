import React, { forwardRef } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
const Menu = forwardRef((props, ref) => {
  return (
    <MenuContainer ref={ref}>
      <ul>
        <li>
          <Link className="test" to="/premium">
            Add friend
          </Link>
        </li>
        <li>
          <Link className="test" to="/premium">
            Ask for date
          </Link>
        </li>
      </ul>
    </MenuContainer>
  );
});

export default Menu;

const MenuContainer = styled.div`
  position: absolute;
  border-radius: 10px;
  width: 140px;
  top: 50px;
  left: 10px;
  background: #000;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 100;
  .test {
    color: white;
    text-decoration: none;

    &:hover {
      background-color: pink;
      color: black;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      color: #fff;
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: pink;
        color: black;
      }
    }
  }
`;
