import { createContext, useState } from "react";

// Create the EmployeeDataContext for managing employee data globally
export const EmployeeDataContext = createContext();

const Context = ({ children }) => {
  // State which contain employee data
  const [employeeData, setEmployeeData] = useState([]);

  return (
    // Providing the state and its set function to all child components
    <EmployeeDataContext.Provider value={{ employeeData, setEmployeeData }}>
      {children} {/* Render child components inside the provider */}
    </EmployeeDataContext.Provider>
  );
};

export default Context;
