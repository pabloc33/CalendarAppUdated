import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Pruebas en el uiSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    //expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
    //* Queda a discreción
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("debe de cambiar el onOpenDateModal correctamente", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.onCloseDateModal).toBeFalsy();
  });
});
