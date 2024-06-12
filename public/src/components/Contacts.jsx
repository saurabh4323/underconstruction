import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes"; // Ensure correct path
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [data, setData] = useState([]);
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const data = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    const userId = "actualUserId"; // Replace with actual userId
    axios
      .get(`${allUsersRoute}/${userId}`)
      .then((res) => {
        setData(res.data);
        setRecord(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const Filter = (event) => {
    setRecord(
      data.filter((f) =>
        f.username.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {currentUserImage && currentUserName && (
        <>
          <div className="contacts">
            <input
              className="form-control"
              onChange={Filter}
              type="text"
              placeholder="Search by username"
            />
            {record.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #28282b;

  .contacts {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    height: 78vh;

    input {
      border: 1px solid #fff;
      background-color: #000;
      color: #000;
      padding: 8px;
      margin-bottom: 10px;
      width: 90%;
    }

    .contact {
      background-color: #000;
      border: 1px solid white;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;

      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: pink;
    }
  }

  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #000;
    boder: 1px solid white;
    width: 90%;
    height: 60px;
    margin-top: 420px;
    .avatar {
      img {
        margin-top: 25px;
        margin-left: -20px;

        height: 3.3rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        margin-top: 25px;
        margin-left: -20px;
        font-size: 20px;
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
