import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { store } from "../../src/store/store";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store/ui/uiSlice";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("Pruebas en useUiStore", () => {
  test("debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const wrapper = ({ children }) => (
      <ReduxProvider reduxStore={mockStore}>{children}</ReduxProvider>
    );
    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  test("openDateModal debe de colocar true en el isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const wrapper = ({ children }) => (
      <ReduxProvider reduxStore={mockStore}>{children}</ReduxProvider>
    );

    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });
    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });
    //console.log({ result: result.current });
    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("closeDateModal debe colocar false en el isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const wrapper = ({ children }) => (
      <ReduxProvider reduxStore={mockStore}>{children}</ReduxProvider>
    );

    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });
    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();

      //* En caso de no desestructurar
      // result.current.closeDateModal()
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
