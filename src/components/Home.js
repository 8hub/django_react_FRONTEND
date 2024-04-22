import React, { Component, useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import StudentList from "./StudentList";
import NewStudentModal from "./NewStudentModal";

import axios from "axios";

import { API_URL } from "../constants";

const Home = () => {
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
          <StudentList students={students} refreshState={refreshState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewStudentModal create={true} refreshState={refreshState} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;