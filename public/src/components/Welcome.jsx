import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if (user && user.username) {
          setUserName(user.username);
        }
      } catch (error) {
        console.error("Failed to retrieve user data:", error);
        // Optionally handle error (e.g., set userName to an error state)
      }
    };

    fetchUserName();
  }, []);

  return (
    <Container>
      {/* <img src={Robot} alt="Robot" /> */}
      <h1>
        Welcome, <span>{userName}</span>!
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: red;
  }
`;
