import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { Schema } from './validationSchema';
import { addComment, editComment } from '../../redux';
import { Loader, EDIT_SUCCESS_MESSAGE, ADD_SUCCESS_MESSAGE,ErrorBoundary } from '../../common/CommonExports';


function AddEditTodo(props) {
    const { onHide, processCommentList } = props;
    const { postObject = null, loading, posts = [] } = useSelector(state => state.comment);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState(Schema.initialValues);

    useEffect(() => {
        const tempInitialValues = postObject ? {
            name: postObject.name,
            email: postObject.email,
            post_id: postObject.post_id ? postObject.post_id : 1,
            id: postObject.id,
            body: postObject.body
        } : null;

        if (Object.keys(postObject).length > 0) setInitialValues(tempInitialValues);

    }, [postObject]);


    const onSubmit = (values) => {
        let message = '';
        if (values.id) {
            dispatch(editComment(values));
            message = EDIT_SUCCESS_MESSAGE;
        }
        else {
            if (posts[0].post_id) values.post_id = posts[0].post_id
            dispatch(addComment(values));
            message = ADD_SUCCESS_MESSAGE;
        }
        processCommentList(message);
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
                        {Object.keys(postObject).length > 0 ? "Edit " : "Add "} Comment
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
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    placeholder="Enter a name"
                                                    value={values.name}
                                                    name="name"
                                                    {...getFieldProps("name")}
                                                />
                                            </div>
                                            <div className="error--message">
                                                <ErrorMessage component="div" name="name" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="forms">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    placeholder="Enter a email"
                                                    value={values.email}
                                                    name="email"
                                                    type="email"
                                                    {...getFieldProps("email")}
                                                />
                                            </div>
                                            <div className="error--message">
                                                <ErrorMessage component="div" name="email" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="forms">
                                                <Form.Label>Comments</Form.Label>
                                                <Form.Control aria-label="Default select example"
                                                    placeholder="Enter a comment"
                                                    value={values.body}
                                                    name="body"
                                                    {...getFieldProps("body")}
                                                />
                                            </div>
                                            <div className="error--message">
                                                <ErrorMessage component="div" name="body" />
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