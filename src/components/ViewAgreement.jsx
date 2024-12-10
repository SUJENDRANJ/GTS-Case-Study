import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { useEmployee } from "../contexts/Context";

const ViewAgreement = () => {
  const { employeeData, setEmployeeData } = useEmployee(); // Access employee data from context
  const { empId } = useParams(); // Extract employee ID from URL parameters
  const navigate = useNavigate(); // React Router's navigate function for redirection

  const currentEmployee = employeeData.find(({ id }) => id === empId); // Fetch the current employee's details

  // Function to handle deletion of the employee agreement
  function handleDelete() {
    const confirmDel = confirm("⚠ Confirm to Delete Agreement");

    if (confirmDel) {
      const filteredEmp = employeeData.filter((emp) => emp.id !== empId); // Filter out the deleted employee

      // Send DELETE request to remove employee data
      fetch("http://localhost:3000/employee/" + empId, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert("✔ Deleted Employee Successfully");
          navigate("/"); // Redirect to Dashboard after deletion
          setEmployeeData(filteredEmp); // Update the state with remaining employee data
        })
        .catch((err) => {
          console.error(err.message);
          navigate("/"); // Navigate back to Dashboard if error occurs
          alert("❗ Cannot Delete the Agreement - " + err.message); // Show error alert
        });
    }
  }

  return (
    <Container className="mt-5">
      {/* Page Header */}
      <h2 className="text-center mb-4 fs-1">Agreement Details</h2>

      {/* Agreement Card */}
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white text-center fs-3">
          Employee Agreement Overview
        </Card.Header>
        <Card.Body>
          <Row>
            {/* Display employee details */}
            <Col md={6} className="ms-5">
              <h5 className="text-danger mt-2 fs-2 mb-3">
                Agreement for {currentEmployee.name.toUpperCase()}
              </h5>
              <p className="fs-5">
                <strong>Department : </strong> {currentEmployee.department}
              </p>
              <p className="fs-5">
                <strong>Position : </strong> {currentEmployee.position}
              </p>
              <p className="fs-5">
                <strong>Agreement Date : </strong>
                {currentEmployee.agreementDate}
              </p>
            </Col>
            {/* Employee's image */}
            <Col className="ms-5">
              <img
                src={
                  currentEmployee.imgURL
                    ? currentEmployee.imgURL
                    : "https://cdn-icons-png.flaticon.com/512/0/93.png"
                }
                width={"210px"}
                height={"200px"}
                className="rounded-circle object-fit-contain bg-warning"
              />
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="text-center mt-4">
            <Button
              variant="danger"
              type="submit"
              className="me-3 px-4"
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Link to="/">
              <Button variant="secondary">Back</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewAgreement;
