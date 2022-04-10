import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EventService from "../services/eventService";
import IEvent from "../types/event";

function Event(): JSX.Element {
  const { name } = useParams();
  let navigate = useNavigate();

  const initialEventState = {
    name: "",
    description: "",
    idAdmin: "",
    category: [""],
  };

  const [currentEvent, setCurrentEvent] = useState<IEvent>(initialEventState);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<String>("");

  const getEvent = (userName: string) => {
    EventService.get(userName)
      .then((response: any) => {
        setCurrentEvent(response.data);
        console.log(response.data);
        setUser(userName);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (name) getEvent(name);
  }, [name]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };

  const updateUser = () => {
    EventService.update(user, currentEvent)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
        setUser(currentEvent.name);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    EventService.remove(user)
      .then((response: any) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="user">
      {currentEvent ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="mane">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentEvent.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Description</label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                value={currentEvent.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={currentEvent.category}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Event...</p>
        </div>
      )}
    </div>
  );
}

export default Event;
