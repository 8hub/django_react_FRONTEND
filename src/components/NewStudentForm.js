import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

import axios from 'axios';

import {API_URL} from '../constants';

const NewStudentForm = ({refreshState, toggle, student }) => {
    const [formData, setFormData] = useState({
        pk: 0,
        name: '',
        email: '',
        document: '',
        phone: ''
    });

    useEffect(() => {
        if (student) {
          setFormData({
            pk:       student.pk,
            name:     student.name, 
            email:    student.email, 
            document: student.document, 
            phone:    student.phone
          });
        };
    }, [student]);
    
    const onChange = e => {
        setFormData(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
    };

    const createStudent = async e => {
        e.preventDefault();
        try{
            await axios.post(API_URL, formData)
            .then(() => {
                refreshState();
                toggle();
            });
          } catch (error) {
            console.log('Error creating student: ', error);
          }
    };

    const editStudent =  e => {
      e.preventDefault();
        axios.put(`${API_URL}${formData.pk}/`, formData)
        .then(() => {
          refreshState();
          toggle();
        })
        .catch (error => {
          console.log('Error editing student: ', error);
        });
    };

    const defaultIfEmpty = (value) => (value === "" ? "" : value);
    
    return (
      <Form onSubmit={student ? editStudent : createStudent}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={onChange}
            value={defaultIfEmpty(formData.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={onChange}
            value={defaultIfEmpty(formData.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="document">Document:</Label>
          <Input
            type="text"
            name="document"
            onChange={onChange}
            value={defaultIfEmpty(formData.document)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            onChange={onChange}
            value={defaultIfEmpty(formData.phone)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  };


export default NewStudentForm;