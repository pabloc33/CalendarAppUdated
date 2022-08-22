import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { covertEventsToDateEvents } from "../helpers/covertEventsToDateEvents";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/canlendarSlice";

const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend
    // Todo bien

    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      // Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(
        onAddNewEvent({ ...calendarEvent, _id: data.eventoGuardado.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      const { data } = await calendarApi.delete(`/events/${activeEvent.id}`);
      // TODO: llegar al backend
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = covertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    //* properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* metodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};

export default useCalendarStore;
