import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { CalendarDays, Clock3, MapPin, AlertCircle } from "lucide-react";
import { Card, PageHead } from "../../../components/common/PagePrimitives";
import MediaPlaceholder from "../../../components/ui/MediaPlaceholder";
import { eventsService } from "../../../services/api/eventsService";

export default function EventsPage() {
  const { notify } = useOutletContext();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventsService.getEvents();
      if (response.ok) {
        setEvents(response.data);
      } else {
        setError("Failed to load events");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    try {
      const response = await eventsService.registerForEvent(event.id);
      if (response.ok) {
        notify(`Registered for: ${event.title}`);
        setEvents(
          events.map((e) =>
            e.id === event.id ? { ...e, registered: true } : e
          )
        );
      } else {
        notify("Registration failed");
      }
    } catch (err) {
      notify("Error registering for event");
    }
  };

  return (
    <>
      <PageHead
        eyebrow="CAMPUS CALENDAR"
        title="Events"
        desc="Discover union, academic, cultural and sports events."
        action={
          <button className="primary" onClick={() => notify("Demo: event creation opened")}>
            + Create event
          </button>
        }
      />

      {loading && <div className="loading-state">Loading events...</div>}

      {error && (
        <div className="error-state">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="empty-state">
          <CalendarDays size={40} />
          <p>No events available</p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="event-cards">
          {events.map((e) => (
            <Card key={e.id}>
              <div className="poster">
                <MediaPlaceholder label={e.title} />
                <span>{e.category}</span>
                <div>
                  <small>{e.date}</small>
                  <b>{e.title.split(" ").slice(0, 2).join(" ")}</b>
                </div>
              </div>
              <div className="event-detail">
                <span className="pill">{e.category}</span>
                <h3>{e.title}</h3>
                <p>
                  <Clock3 size={15} /> {e.time} · <MapPin size={15} /> {e.venue}
                </p>
                <small>{e.attendees} registered</small>
                <div>
                  <button
                    className="primary small"
                    onClick={() => handleRegister(e)}
                    disabled={e.registered}
                  >
                    {e.registered ? "Registered" : "Register"}
                  </button>
                  <button
                    className="ghost small"
                    onClick={() => notify(`${e.title} details`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}