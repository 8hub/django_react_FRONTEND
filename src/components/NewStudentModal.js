import React, {useState, Fragment} from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import NewStudentForm from './NewStudentForm';

const NewStudentModal = ({create, student, refreshState}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
      setModal(!modal);
  };

  const title = create ? "Adding New Student" : "Editing Student";
  const button = create ? (
    <Button
      color="primary"
      className='float-right'
      onClick={() => setModal(true)}
      style={{ minWidth: "200px" }}
    >
      Create New
    </Button>
    ) : (
      <Button onClick={toggle}>Edit</Button>
  );
  
  return (
    <Fragment>
      {button}
      <Modal isOpen={modal} toggle={toggle} className='dark-modal'>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>

        <ModalBody>
          <NewStudentForm
            refreshState={refreshState}
            toggle={toggle}
            student={student}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default NewStudentModal;