import { render, screen } from "@testing-library/react";
import Header from "../components/Header"; // Component under test
import "@testing-library/jest-dom";

test("renders Header with correct title", () => {
  render(<Header />);
  const header = screen.getByText("Employee Agreement Management");
  expect(header).toBeInTheDocument(); // Validates header text is displayed
});
