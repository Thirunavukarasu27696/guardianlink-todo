import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { Schema } from './validationSchema';
import { addPost, editPost } from '../../redux';
import { ADD_SUCCESS_MESSAGE, EDIT_SUCCESS_MESSAGE } from '../../common/Utils';
import Loader from '../../common/Loader';

function AddEditPost(props) {
    const { onHide, processPostList, ...rest } = props;
    const { postObject = null, loading, } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState(Schema.initialValues)
    useEffect(() => {
        const tempInitialValues = postObject ? {
            title: postObject.title,
            body: postObject.body,
            user_id: postObject.user_id,
            id: postObject.id
        } : null;
        setInitialValues(tempInitialValues);

    }, [postObject]);



    const onSubmit = (values) => {
        let message = '';
        if (values.id) {
            dispatch(editPost(values));
            message = EDIT_SUCCESS_MESSAGE;
        }
        else {
            dispatch(addPost(values));
            message = ADD_SUCCESS_MESSAGE;
        }
        processPostList(message);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton backdrop="static" keyboard={'false'}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {"Add"} Post
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
                                        <Form.Label>Post Title</Form.Label>
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
                                        <Form.Label>Post Content</Form.Label>
                                        <Form.Control
                                            placeholder="Enter a content"
                                            value={values.body}
                                            name="body"
                                            {...getFieldProps("body")}
                                        />
                                    </div>
                                    <div className="error--message">
                                        <ErrorMessage component="div" name="body" />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="forms">
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control
                                            placeholder="Enter user Id"
                                            value={values.user_id}
                                            name="user_id"
                                            {...getFieldProps("user_id")}
                                        />
                                    </div>
                                    <div className="error--message">
                                        <ErrorMessage component="div" name="user_id" />
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
    );
}

export default AddEditPost;