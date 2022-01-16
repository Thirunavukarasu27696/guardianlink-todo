import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddEditComment from './AddEditComment';
import { resetCommentObject } from '../../redux/comment/commentActions';
import { deleteCommentItembyId, fetchComments, getCommentItembyId } from '../../redux';
import { Loader, Notifier, DELETE_SUCCESS_MESSAGE, ErrorBoundary } from '../../common/CommonExports';


function TodoContainer(props) {
    const { commentData, fetchData, resetEditCommentObject,
        deleteCommentItem, getCommentbyId, } = props;

    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const [commentList, setCommentList] = useState(false);

    useEffect(() => {
        fetchData();
    }, [fetchData, commentData.itemCount])


    useEffect(() => {
        setList(commentData, setCommentList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentData.posts]);

    if (commentData && commentData.loading) { return (<div> <Loader /></div>) }
    if (commentData.error) { return (<Notifier error={commentData.error} />) }

    const onEditPost = ({ id }) => {
        if (id) getCommentbyId(id);
        setModalShow(true);

    }

    const onDeletePost = ({ id }) => {
        if (id) deleteCommentItem(id);
        const _message = DELETE_SUCCESS_MESSAGE;
        showMessage(_message);

    }

    const processCommentList = (msg) => {
        showMessage(msg);
        setModalShow(false);
        resetEditCommentObject();
    };
    const handleAddPost = () => setModalShow(true);

    const clearAlert = () => {
        setTimeout(() => {
            setShowAlert(false);
            setMessage('');
        }, 3000);
    }

    const showMessage = (msg) => {
        setShowAlert(true);
        setMessage(msg);
        clearAlert();
    }

    function onHideModal() {
        resetEditCommentObject();
        setModalShow(false);
    }

    const filterItems = (inputValue) => {
        return commentList.filter((i) =>
            i.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handleInputChange = (newValue) => {
        return newValue.replace(/\W/g, '');
    };

    const handleSearch = ({ target: { value } }) => {
        if (!value) {
            setList(commentData, setCommentList);
            return null;
        }
        setCommentList(filterItems(handleInputChange(value)))
    };

    return (
        <>
            <ErrorBoundary>
                {showAlert && <Notifier success={message} />}
                <Row className="justify-content-between my-4">
                    <Col xl={3}>
                        <div className="forms__input d-flex align-items-center">
                            <Form.Control placeholder='Search by Name'
                                onChange={handleSearch}
                            />
                        </div>
                    </Col>
                    <Col xl={2} className='d-flex  justify-content-end'>

                        <Button variant="primary" onClick={handleAddPost}>Add Comment</Button>
                    </Col>
                </Row>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commentList.length > 0 ?
                            commentList.map(item =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.body}</td>
                                    <td>
                                        <span className="px-3 cursor-pointer" onClick={() => onEditPost(item)}><i className="bi bi-pencil-square"></i></span>
                                        <span className="cursor-pointer" onClick={() => onDeletePost(item)}><i className="bi bi-trash"></i></span>
                                    </td>
                                </tr>) : <tr>
                                <td colSpan="5" className='text-center py-5'><div>No Match Found ! </div></td>
                            </tr>}
                    </tbody>
                </Table>
                {modalShow &&
                    <AddEditComment show={modalShow}
                        onHide={() => onHideModal()}
                        processCommentList={processCommentList} />
                }
            </ErrorBoundary>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        commentData: state.comment,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchComments()),
        getCommentbyId: (id) => dispatch(getCommentItembyId(id)),
        deleteCommentItem: (id) => dispatch(deleteCommentItembyId(id)),
        resetEditCommentObject: () => dispatch(resetCommentObject())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (TodoContainer)


function setList(commentData, setCommentList) {
    const options = commentData.posts.map(e => { return { ...e, value: e.name, label: e.name }; });
    setCommentList(options);
}