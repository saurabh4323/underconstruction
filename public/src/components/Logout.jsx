import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const userId = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )._id;
      const response = await axios.get(`${logoutRoute}/${userId}`);

      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a user-friendly message here
    }
  };

  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-right: -20px;
  border-radius: 0.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #000;
  }
`;
