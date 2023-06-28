import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

//unit testing

test("on render, disable the pay button", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "4" }} />);
  expect(await screen.findByRole("pay")).toBeDisabled();
});

test("Enable pay button if the inputs are filled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "4" }} />);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", /pay/i)).toBeEnabled();
});

//integrations testing

test("Test pay button behaviour", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "4" }} />);

  expect(await screen.findByRole("pay")).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");

  expect(await screen.findByRole("button", /pay/i)).toBeEnabled();
});
