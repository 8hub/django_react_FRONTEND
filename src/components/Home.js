import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import StudentList from "./StudentList";
import NewStudentModal from "./NewStudentModal";

import axios from "axios";

import { API_URL } from "../constants";

function Home({ darkMode, setDarkMode }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    refreshState();
  }, []);

  const getStudents = () => {
    axios.get(API_URL).then(res => setStudents(res.data));
  };

  const refreshState = () => {
    getStudents();
  };

  return (
    <Container style={{ marginTop: "20px" }} className="dark-mode">
      <Row>
        <Col>
          <StudentList students={students} refreshState={refreshState} darkMode={darkMode}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <NewStudentModal create={true} refreshState={refreshState} />
        </Col>
      </Row>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle to {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </Container>
  );
};

export default Home;