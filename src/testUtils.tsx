import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore, RootState } from "redux/store";

export * from '@testing-library/react';

export const renderWithRedux = (ui: ReactElement, options?: { initialState?: RootState }) =>
  render(<Provider store={configureStore(options?.initialState)}>{ui}</Provider>);
