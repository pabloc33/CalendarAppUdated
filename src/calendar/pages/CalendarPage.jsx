import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "../components/Navbar";
import { localizer } from "../../helpers/CalendarLocalaizer";
import { getMessagesES } from "../../helpers/getMessages";
import CalendarEvent from "../components/CalendarEvent";
import CalendarModal from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import useCalendarStore from "../../hooks/useCalendarStore";
import FabAddNew from "../components/FabAddNew";
import FabDelete from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

const CalendarPage = () => {
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log({ event, start, end, isSelected });
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    //console.log({ doubleClick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

export default CalendarPage;
