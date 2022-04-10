import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import EventService from "../services/eventService";
import IEvent from "../types/event";

function EventList(): JSX.Element {
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    EventService.getAll()
      .then((response: any) => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveEvent = (event: IEvent, index: number) => {
    setCurrentEvent(event);
    setCurrentIndex(index);
  };

  return (
    <div className="event">
      <div className="list row">
        <div className="col-md-6">
          <h4>Event List</h4>
          <ul className="list-group">
            {events &&
              events.map((event, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveEvent(event, index)}
                  key={index}
                >
                  {event.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentEvent ? (
            <div>
              <h4>Event</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentEvent.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentEvent.description}
              </div>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentEvent.category}
              </div>
              <Link
                to={"/editEvent/" + currentEvent.name}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Event...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventList;
