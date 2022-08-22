export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const events = [
  {
    id: "1",
    start: new Date("2022-10-21 13:00:00"),
    end: new Date("2022-10-21 15:00:00"),
    title: "Cumpleaños de PepeLePu",
    notes: "Alguna nota",
  },
  {
    id: "2",
    start: new Date("2022-11-21 13:00:00"),
    end: new Date("2022-11-21 15:00:00"),
    title: "Cumpleaños de Jennifer",
    notes: "Alguna nota de Jennifer",
  },
];

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
