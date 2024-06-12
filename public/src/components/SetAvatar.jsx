import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import styled from "styled-components";
import { Buffer } from "buffer";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        const user = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUser(user);
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatarsArray = [];
      for (let i = 0; i < 2; i++) {
        const image = await axios.get(
          `https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        avatarsArray.push(buffer.toString("base64"));
      }
      setAvatars(avatarsArray);
      setIsLoading(false);
    };
    fetchAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      alert("Please select an avatar");
      return;
    }
    const user = currentUser;
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(user)
      );
      navigate("/");
    } else {
      alert("Error setting avatar. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <div className="brand">
            <img src="chatlogo.png" alt="logo" />
            <h1>HIDDCHAT</h1>
          </div>
          <img src="loading.gif" alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="brand">
            <img src="chatlogo.png" alt="logo" />
            <h1>HIDDCHAT</h1>
          </div>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #000;
  height: 100vh;

  .loader {
    max-inline-size: 100%;
  }

  .brand {
    display: flex;
    align-items: center;

    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  .title-container {
    h1 {
      color: #f2e9e4;
      font-size: 50px;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #fff;
    }
  }
  .submit-btn {
    background-color: #fff;
    color: #000;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    border: 1px solid Black;
    text-transform: uppercase;
    &:hover {
      background-color: #000;
      color: #fff;
      border: 1px solid white;
    }
  }
`;
