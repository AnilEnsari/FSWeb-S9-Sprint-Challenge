import React from "react";
import AppFunctional from "./AppFunctional";
import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

test("sanity", async () => {
  render(<AppFunctional />);

  const upButton = screen.getByTestId("yukarı");

  fireEvent.click(upButton);
  fireEvent.click(upButton);

  const errorMessage = screen.getByTestId("message");
  expect(errorMessage.textContent).toBe("Yukarıya gidemezsiniz");
  expect(errorMessage).toBeVisible();
});

test("sanity", async () => {
  render(<AppFunctional />);

  const leftButton = screen.getByTestId("sol");

  fireEvent.click(leftButton);
  fireEvent.click(leftButton);

  const errorMessage = screen.getByTestId("message");

  expect(errorMessage).toBeVisible();
});

test("sanity", async () => {
  render(<AppFunctional />);

  const emailInput = screen.getByTestId("emailInput");

  // fireEvent.type(emailInput, "anilensari@gmail.com");
});
