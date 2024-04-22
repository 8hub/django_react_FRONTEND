import React, {useState, Fragment} from 'react';
import {Modal, ModalHeader, Button, ModalBody} from 'reactstrap';

import axios from 'axios';

import {API_URL} from '../constants';

const ConfirmRemovalModal = ({pk, refreshState}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const deleteStudent = pk => {
    axios.delete(`${API_URL}${pk}/`).then(() => {
      refreshState();
      toggle();
    });
  };

  return(
    <Fragment>
      <Button color="danger" onClick={toggle}>
        Remove
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Do you really wanna delete the student?
        </ModalHeader>

        <ModalBody>
          <Button
            color="danger"
            onClick={() => deleteStudent(pk)}
          >
            Yes
          </Button>
          <Button
            color="secondary"
            onClick={toggle}
          >
            No
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ConfirmRemovalModal;