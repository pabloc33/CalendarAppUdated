import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/canlendarSlice";
import {
  calendarWithActiveEventsState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  test("debe de regresar el estado inicial", () => {
    expect(calendarSlice.getInitialState()).toEqual(initialState);
  });

  test("onSetActiveEvent debe de activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe agregar el evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2020-10-21 13:00:00"),
      end: new Date("2020-10-21 15:00:00"),
      title: "Cumpleaños de PepeLePu!!!",
      notes: "Alguna nota!!",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debe de actualizar un evento", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2020-10-21 13:00:00"),
      end: new Date("2020-10-21 15:00:00"),
      title: "Cumpleaños de Pepe Argento!!!",
      notes: "Alguna nota!!",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    //expect(state.events[0]).toEqual(newEvent);
    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent de eliminar un evento", () => {
    // const deleteEvent = {
    //   id: "1",
    //   start: new Date("2022-10-21 13:00:00"),
    //   end: new Date("2022-10-21 15:00:00"),
    //   title: "Cumpleaños de PepeLePu",
    //   notes: "Alguna nota",
    // };

    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onDeleteEvent()
    );
    // expect(state.events).not.toContain(deleteEvent);
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents debe de establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();

    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(state.events.length).toEqual(events.length);
  });

  test("onLogoutCalendar debe de limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventsState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
