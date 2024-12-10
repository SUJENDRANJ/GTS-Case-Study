import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Provides routing context for the component
import CreateAgreement from "../CreateAgreement"; // Component under test
import "@testing-library/jest-dom";

// Mock useEmployee hook and setEmployeeData function
jest.mock("../../contexts/Context", () => ({
  useEmployee: () => ({
    employeeData: [],
    setEmployeeData: jest.fn(),
  }),
}));

test("validate required fields in CreateAgreement form", () => {
  render(
    <BrowserRouter>
      <CreateAgreement />
    </BrowserRouter>
  );

  // Simulate user input and form submission with missing required fields
  fireEvent.change(screen.getByLabelText(/Employee Name/i), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByLabelText(/Department/i), {
    target: { value: "Engineering" },
  });
  fireEvent.change(screen.getByLabelText(/Position/i), {
    target: { value: "Developer" },
  });
  fireEvent.change(screen.getByLabelText(/Agreement Date/i), {
    target: { value: "2024-12-25" },
  });
  fireEvent.click(screen.getByText(/Add Agreement/i));

  // Validate that the error message is displayed for missing fields
  expect(
    screen.getByText("*All fields instead of image are required")
  ).toBeInTheDocument();
});
