import React, { useState, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import eventService from "../services/eventService";
import IEvent from "../types/event";

function CreateUser(): JSX.Element {
  const initialEventState = {
    name: "",
    description: "",
    idAdmin: "",
    category: [""],
  };
  const [eventObject, setEvent] = useState<IEvent>(initialEventState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEvent({ ...eventObject, [name]: value });
  };

  const saveEvent = () => {
    var data = {
      name: eventObject.name,
      description: eventObject.description,
      idAdmin: eventObject.idAdmin,
      category: eventObject.category,
    };
    console.log(data);
    eventService
      .create(data)
      .then((response: any) => {
        setEvent({
          name: response.data.name,
          description: response.data.description,
          category: response.data.category,
          idAdmin: response.data.idAdmin,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };

  return (
    <div className="user">
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newUser}>
              Add
            </button>
          </div>
        ) : (
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={eventObject.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={eventObject.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={eventObject.category}
                onChange={handleInputChange}
                name="category"
              />
            </div>
            <div className="form-group">
              <label htmlFor="idAdmin">Admin name</label>
              <input
                type="text"
                className="form-control"
                id="idAdmin"
                required
                value={eventObject.idAdmin}
                onChange={handleInputChange}
                name="idAdmin"
              />
            </div>
            <button onClick={saveEvent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUser;
