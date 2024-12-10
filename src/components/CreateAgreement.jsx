import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEmployee } from "../contexts/Context";

const CreateAgreement = () => {
  const [addedEmployee, setAddedEmployee] = useState({
    name: "",
    department: "",
    position: "",
    agreementDate: "",
    imgURL: "",
  });
  const [validateForm, setValidateForm] = useState("");
  const { employeeData, setEmployeeData } = useEmployee();
  const navigate = useNavigate();

  // Handle form submission
  function handleSubmit() {
    // Validate if all required fields are filled
    if (
      addedEmployee.name &&
      addedEmployee.department &&
      addedEmployee.position &&
      addedEmployee.agreementDate
    ) {
      // Post the data to the server
      fetch("http://localhost:3000/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(addedEmployee),
      })
        .then((res) => res.json())
        .then((data) => {
          setEmployeeData([...employeeData, data]);
          navigate("/"); // Redirect to dashboard
          alert("✔ Successfully Added Employee");
        });
    } else {
      setValidateForm("*All fields instead of image are required");
    }
  }

  // Handle image file change
  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    if (file) {
      setAddedEmployee({ ...addedEmployee, imgURL: file });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add Employee Agreement</h2>
      <span className="text-danger">{validateForm}</span>

      <Form>
        {/* Employee Name */}
        <Form.Group className="mb-3" controlId="employeeName">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee name"
            required
            onChange={(e) =>
              setAddedEmployee({ ...addedEmployee, name: e.target.value })
            }
          />
        </Form.Group>

        {/* Department */}
        <Form.Group className="mb-3" controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            required
            onChange={(e) =>
              setAddedEmployee({ ...addedEmployee, department: e.target.value })
            }
          />
        </Form.Group>

        {/* Position */}
        <Form.Group className="mb-3" controlId="position">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            required
            onChange={(e) =>
              setAddedEmployee({ ...addedEmployee, position: e.target.value })
            }
          />
        </Form.Group>

        {/* Agreement Date */}
        <Form.Group className="mb-3" controlId="agreementDate">
          <Form.Label>Agreement Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) =>
              setAddedEmployee({
                ...addedEmployee,
                agreementDate: e.target.value,
              })
            }
          />
        </Form.Group>

        {/* Image Upload */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an Image File</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e)} />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" onClick={handleSubmit}>
          Add Agreement
        </Button>

        {/* Back Button */}
        <Link to="/">
          <Button variant="secondary" className="ms-4">
            Back
          </Button>
        </Link>
      </Form>
    </Container>
  );
};

export default CreateAgreement;
