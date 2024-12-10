import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Context, useEmployee } from "../../contexts/Context";
import MOCK_DATA from "../mocks/mockEmployeeData.json";

// Mock API call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

const MockComponent = () => {
  const { employeeData, isLoading } = useEmployee();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {employeeData.map((employee) => (
        <p key={employee.id}>{employee.name}</p>
      ))}
    </div>
  );
};

// Test the loading state and data rendering
test("displays loading state and employee data", async () => {
  render(
    <Context>
      <MockComponent />
    </Context>
  );

  // Verify the loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for and verify employee data is rendered
  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  // Ensure the loading state disappears
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
