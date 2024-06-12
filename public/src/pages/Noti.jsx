import React from "react";
import styled from "styled-components";

const Noti = () => {
  return (
    <NotificationMenu>
      <h2>Notifications</h2>
      <p>
        Yes, the code you provided for the NotificationMenu component already
        includes a scroll bar functionality. This will activate when the content
        inside the NotificationMenu exceeds the set height (50vh in this case),
        allowing the user to scroll through the notifications. Here's how it
        works: Overflow Property: You've set the overflow-y property to auto on
        the NotificationMenu styled component. This means that a vertical scroll
        bar will only appear if the content inside the NotificationMenu exceeds
        the height of the element. Height of Container: You've defined the
        height of the NotificationMenu as 50vh, which is 50% of the viewport
        height. If the content inside this component grows beyond 50% of the
        viewport, the scroll bar will appear, enabling users to scroll through
        the notifications. Styled Components: Using styled-components for
        styling makes it easy to encapsulate and manage your styles within the
        component, making the component more reusable and maintainable.
      </p>
      {/* Add notification items here */}
    </NotificationMenu>
  );
};

export default Noti;

const NotificationMenu = styled.div`
  position: absolute;
  top: 50px; // Adjust based on your header height
  right: 280px; // Adjust based on your layout
  width: 240px;
  height: 50vh;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-y: auto;
  z-index: 1000; // Ensure it appears above other elements

  h2 {
    margin: 0;
    padding: 1rem;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ccc;
  }

  p {
    padding: 1rem;
  }
`;
