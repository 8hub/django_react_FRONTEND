import React from 'react';
import { Table } from 'reactstrap';
import NewStudentModal from './NewStudentModal';

import ConfirmRemovalModal from './ConfirmRemovalModal';

const StudentList = ({students, refreshState}) => {
    return (
        <Table dark>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Document</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {!students || students.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>No Students yet</b>
                        </td>
                    </tr>
                ) : (
                    students.map(student => (
                        <tr key={student.pk}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.document}</td>
                            <td>{student.phone}</td>
                            <td align="center">
                                <NewStudentModal
                                    create={false}
                                    student={student}
                                    refreshState={refreshState}
                                />
                                &nbsp;&nbsp;
                                <ConfirmRemovalModal
                                    pk={student.pk}
                                    refreshState={refreshState}
                                />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
}

export default StudentList;