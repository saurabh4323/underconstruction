import React from "react";
import styled from "styled-components";
import Notification from "../components/Notification";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; /* Space between logo & plans */
  padding: 40px;
  background-color: #000;
  min-height: 80vh;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* Space between logo and heading */
`;

const Logo = styled.img`
  width: 4rem; /* Adjust size of the logo */
  height: auto;
`;

const Title = styled.h1`
  margin: 0;
`;

const PlansRow = styled.div`
  display: flex;
  gap: 20px; /* Space between the two plan sections */
  width: 80%;
  justify-content: center; /* Center plans horizontally */
`;

const PlanSection = styled.div`
  background-color: ${(props) =>
    props.type === "premium" ? "#007bff" : "#7bf1a8"};
  border-radius: 8px;
  border: 2px solid black;
  padding: 20px;
  width: 45%; /* Adjust width to allow for spacing */
  max-width: 600px;

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PlanTitle = styled.h2`
  margin-top: 0;
`;

const PlanList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${(props) => (props.primary ? "#ffc107" : "#ffc107")};
  color: ${(props) => (props.primary ? "black" : "black")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#e0a800" : "#5a6268")};
  }
`;

const PromotionPlans = () => {
  return (
    <Container>
      <Header>
        <Logo src="chatlogo.png" alt="Chat Application Logo" />
        <Title>Hiddchat</Title>
      </Header>

      <PlansRow>
        <PlanSection type="premium">
          <PlanTitle>Premium Plan - ₹69</PlanTitle>
          <PlanList>
            <ListItem>Unlimited chat capacity</ListItem>
            <ListItem>Add friends</ListItem>
            <ListItem>Voice calls</ListItem>
            <ListItem>Request dates</ListItem>
          </PlanList>
          <Button>Subscribe Now</Button>
        </PlanSection>

        <PlanSection type="free">
          <PlanTitle>Free Plan</PlanTitle>
          <PlanList>
            <ListItem>Chat up to 50 words</ListItem>
            <ListItem>Not able to add friends</ListItem>
            <ListItem>No voice calls</ListItem>
            <ListItem>No date requests</ListItem>
          </PlanList>
          <Button>Learn More</Button>
        </PlanSection>
      </PlansRow>
      <Notification></Notification>
    </Container>
  );
};

export default PromotionPlans;
