import { Link } from "react-router-dom";
import { Table, Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useEmployee } from "../contexts/Context";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const { employeeData, setEmployeeData, isLoading } = useEmployee();
  const [editable, setEditable] = useState(false); // Tracks if editing is allowed
  const [toggleEdit, setToggleEdit] = useState(true); // Toggle between edit and delete modes

  // Handle input change for editing employee details
  function onchangeHandler(id, value, key) {
    const findEmp = employeeData.find((emp) => emp.id === id);
    setEmployeeData(
      employeeData.map((emp) =>
        emp.id === id ? { ...emp, [key]: value } : emp
      )
    );
    setEditable(true);
  }

  // Handle employee edit
  function handleEdit(id) {
    if (!editable) {
      alert("⚠ Edit Agreements by directly selecting the text field");
      return;
    }
    const findEmp = employeeData.find((emp) => emp.id === id);

    // Validate if all fields are filled
    if (
      !findEmp.name.trim() ||
      !findEmp.department.trim() ||
      !findEmp.position.trim() ||
      !findEmp.agreementDate
    ) {
      alert("❗ All fields must be filled out correctly!");
      return;
    }

    // Send PUT request to update employee data
    fetch("http://localhost:3000/employee/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(findEmp),
    })
      .then((res) => res.json())
      .then(() => {
        alert("✔ Edited the Agreement");
        setEditable(false); // Reset editable state
      })
      .catch((err) => alert("❗ Cannot Edit the Agreement - " + err.message));
  }

  // Handle employee deletion
  function handleDelete(id) {
    const confirmDel = confirm("⚠ Confirm to Delete Agreement");

    if (confirmDel) {
      const filteredEmp = employeeData.filter((emp) => emp.id !== id);

      // Send DELETE request to remove employee data
      fetch("http://localhost:3000/employee/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("✔ Deleted Employee Successfully");
          setEmployeeData(filteredEmp); // Update employee data
        })
        .catch((err) =>
          alert("❗ Cannot Delete the Agreement - " + err.message)
        );
    }
  }

  // Loading state display
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "80vh",
        }}
      >
        <HashLoader size={60} color="#7FCDCD" />
      </div>
    );
  }

  // Render employee data dashboard
  return (
    <div className="mt-5">
      <Container>
        <h2 className="mb-4">Employee Agreements Dashboard</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Agreement Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {toggleEdit
              ? employeeData.map((employee) => (
                  <tr key={employee.id}>
                    {/* Editable employee details */}
                    <td>
                      <Form.Control
                        value={employee.name}
                        onChange={(e) =>
                          onchangeHandler(employee.id, e.target.value, "name")
                        }
                        className={"alertBorder"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={employee.department}
                        onChange={(e) =>
                          onchangeHandler(
                            employee.id,
                            e.target.value,
                            "department"
                          )
                        }
                        className={"alertBorder"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={employee.position}
                        onChange={(e) =>
                          onchangeHandler(
                            employee.id,
                            e.target.value,
                            "position"
                          )
                        }
                        className={"alertBorder"}
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={employee.agreementDate}
                        type="date"
                        onChange={(e) =>
                          onchangeHandler(
                            employee.id,
                            e.target.value,
                            "agreementDate"
                          )
                        }
                        className={"alertBorder"}
                      />
                    </td>

                    {/* Action Buttons */}
                    <td>
                      <Link to={"/view-agreement/" + employee.id}>
                        <Button variant="info" size="sm" className="mr-2">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant={"secondary"}
                        size="sm"
                        onClick={() => handleEdit(employee.id)}
                      >
                        Edit Details
                      </Button>
                    </td>
                  </tr>
                ))
              : employeeData.map((employee) => (
                  <tr key={employee.id}>
                    {/* Non-editable employee details */}
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>{employee.agreementDate}</td>

                    {/* Action Buttons */}
                    <td>
                      <Link to={"/view-agreement/" + employee.id}>
                        <Button variant="info" size="sm" className="mr-2">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant={"danger"}
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete Details
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>

        {/* Instructions and controls */}
        <h5 className="text-secondary">
          {toggleEdit ? "*Click on text to edit Employee Details" : ""}
        </h5>

        {/* Add/Edit/Delete buttons */}
        <div style={{ marginTop: "40px" }}>
          <Link to="/create-agreement">
            <Button>Add Agreement</Button>
          </Link>
          <Button
            variant={toggleEdit ? "danger" : "warning"}
            className="ms-3"
            onClick={() => setToggleEdit(!toggleEdit)}
          >
            {toggleEdit ? "Delete" : "Edit"} Agreement
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
