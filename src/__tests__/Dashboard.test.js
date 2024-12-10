import { render, screen, waitFor } from "@testing-library/react";
import { Context } from "../contexts/Context";
import Dashboard from "../components/Dashboard";
import "@testing-library/jest-dom";
import MOCK_DATA from "../components/mocks/mockEmployeeData.json";
import { BrowserRouter } from "react-router-dom";

// Mock fetch to simulate API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

// Mock alert and confirm dialogs
jest.spyOn(window, "alert").mockImplementation(() => {});
jest.spyOn(window, "confirm").mockImplementation(() => true);

// Test dashboard rendering with employee data
test("renders the dashboard with employee data", async () => {
  render(
    <BrowserRouter>
      <Context>
        <Dashboard />
      </Context>
    </BrowserRouter>
  );

  // Verify loading state disappears
  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  );

  // Verify dashboard header is displayed
  await waitFor(() => {
    expect(
      screen.getByText(/Employee Agreements Dashboard/i)
    ).toBeInTheDocument();
  });

  // Verify employee names are displayed in the input fields
  expect(screen.getByDisplayValue(MOCK_DATA[0].name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(MOCK_DATA[1].name)).toBeInTheDocument();
});
