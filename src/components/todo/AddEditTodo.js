import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { Schema } from './validationSchema';
import { addTodo, editTodo } from '../../redux';
import ErrorBoundary from '../ErrorBoundary';
import { ADD_SUCCESS_MESSAGE, EDIT_SUCCESS_MESSAGE } from '../../common/Utils';
import Loader from '../../common/Loader';

function AddEditTodo(props) {
    const { onHide, processTodoList } = props;
    const { postObject = null, loading } = useSelector(state => state.todo);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState(Schema.initialValues)
    useEffect(() => {
        const tempInitialValues = postObject ? {
            title: postObject.title,
            status: postObject.status,
            user_id: postObject.user_id ? postObject.user_id : 1,
            id: postObject.id,
            due_on: dateConverter(postObject.due_on)
        } : null;
        if (Object.keys(postObject).length > 0) setInitialValues(tempInitialValues);

    }, [postObject]);


    const dateConverter = (date) => {
        return date ? date.split('T')[0] : '';
    }

    const onSubmit = (values) => {
        console.log(values)
        let message = '';
        if (values.id) {
            dispatch(editTodo(values));
            message = EDIT_SUCCESS_MESSAGE;
        }
        else {
            dispatch(addTodo(values));
            message = ADD_SUCCESS_MESSAGE;
        }
        processTodoList(message);
    }

    return (
        <ErrorBoundary>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton backdrop="static" keyboard={'false'}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {"Add"} Todo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <Loader /> : 
                    <Formik onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={Schema.validationSchema}
                        enableReinitialize={true}>
                        {({ values, errors, getFieldProps, handleSubmit }) => {
                            return <Form onSubmit={handleSubmit} noValidate>
                                <Row className="g-4 p-4">
                                    <Col md={6}>
                                        <div className="forms">
                                            <Form.Label>Todo Title</Form.Label>
                                            <Form.Control
                                                placeholder="Enter a title"
                                                value={values.title}
                                                name="title"
                                                {...getFieldProps("title")}
                                            />
                                        </div>
                                        <div className="error--message">
                                            <ErrorMessage component="div" name="title" />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="forms">
                                            <Form.Label>Todo Due Date</Form.Label>
                                            <Form.Control
                                                placeholder="Select a date"
                                                value={values.due_on}
                                                name="due_on"
                                                type="date"
                                                {...getFieldProps("due_on")}
                                            />
                                        </div>
                                        <div className="error--message">
                                            <ErrorMessage component="div" name="due_on" />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="forms">
                                            <Form.Label>Todo Status</Form.Label>
                                            <Form.Select aria-label="Default select example"
                                                value={values.status}
                                                name="status"
                                                {...getFieldProps("status")}
                                            >
                                                <option>Select Todo status</option>
                                                <option value="pending">pending</option>
                                                <option value="completed">completed</option>
                                            </Form.Select>
                                        </div>
                                        <div className="error--message">
                                            <ErrorMessage component="div" name="status" />
                                        </div>
                                    </Col>
                                    <Col md={12} className='d-flex justify-content-end'>
                                        <Button className="me-3" variant="secondary" onClick={onHide}>Cancel</Button>
                                        <Button variant="primary" type="submit">Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        }}

                    </Formik>
                    }
                </Modal.Body>
            </Modal>
        </ErrorBoundary>
    );
}

export default AddEditTodo;