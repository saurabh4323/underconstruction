import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "../Firebase";
import { useState } from "react";
import { useEffect } from "react";

const Notification = () => {
  const [notification, setnotification] = useState({ title: "", body: "" });

  const notify = () => toast(<ToastDisplay></ToastDisplay>);

  const ToastDisplay = () => {
    return (
      <div>
        <p>
          <b>{notification.title}</b>
        </p>
        <p>{notification.body}</p>
      </div>
    );
  };
  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken();
  onMessageListener()
    .then((payload) => {
      setnotification({
        title: payload?.Notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => {
      console.log("error sending payload", err);
    });

  return <Toaster></Toaster>;
};

export default Notification;
