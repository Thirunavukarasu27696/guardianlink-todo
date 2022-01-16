import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { fetchPosts, deletePostbyId, getPostbyId, resetPostEditObject } from '../../redux/post/postActions';
import AddEditPost from './AddEditPost';
import ErrorBoundary from '../ErrorBoundary';
import { DELETE_SUCCESS_MESSAGE } from '../../common/Utils';
import Loader from '../../common/Loader';

function PostContainer(props) {
    const { postData, fetchData, resetPostObject,
        deletePost, getPostItembyId, ...rest } = props;

    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        fetchData();
        setList(postData, setPostList)
    }, [fetchData, postData.itemCount])


    useEffect(() => {
        setList(postData, setPostList);
    }, [postData.posts]);

    if (postData && postData.loading) { return (<div> <Loader /></div>) }
    if (postData.error) {
        return (<Alert className={""} variant={'danger'}>
            {postData.error}
        </Alert>)
    }

    const onEditPost = ({ id }) => {
        if (id) getPostItembyId(id);
        setModalShow(true);
    }

    const onDeletePost = ({ id }) => {
        if (id) deletePost(id);
        const _message = DELETE_SUCCESS_MESSAGE;
        showMessage(_message);
    }

    const processPostList = (msg) => {
        showMessage(msg);
        setModalShow(false);
        resetPostObject();
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

    const filterItems = (inputValue) => {
        return postList.filter((i) =>
            i.title.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handleInputChange = (newValue) => {
        return newValue.replace(/\W/g, '');
    };

    const handleSearch = ({ target: { value } }) => {
        if (!value) {
            setList(postData, setPostList);
            return null;
        }
        setPostList(filterItems(handleInputChange(value)))
    };

    return (
        <>
            <ErrorBoundary>
                {showAlert && <Alert variant={'success'}>
                    {message}
                </Alert>}
                <Row className="justify-content-between my-4">
                <Col xl={3}>
                        <div className="forms__input d-flex align-items-center">
                            <Form.Control placeholder='search by title'
                                onChange={handleSearch}
                            />
                        </div>
                    </Col>
                    <Col xl={2} className='d-flex  justify-content-end'>
                        <Button variant="primary" onClick={handleAddPost}>Add Post</Button>
                    </Col>
                </Row>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Post Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList.length > 0 ? postList.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <span className="px-3 cursor-pointer" onClick={() => onEditPost(item)}><i className="bi bi-pencil-square"></i></span>
                                    <span className={'cursor-pointer'} onClick={() => onDeletePost(item)}><i className="bi bi-trash"></i></span>
                                </td>
                            </tr>) : <tr>
                                <td colSpan="3" className='text-center py-5'><div>No Match Found ! </div></td>
                        </tr>}
                    </tbody>
                </Table>
                {modalShow &&
                    <AddEditPost show={modalShow}
                        onHide={() => setModalShow(false)}
                        processPostList={(res) => processPostList(res)} />
                }
            </ErrorBoundary>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        postData: state.post,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchPosts()),
        getPostItembyId: (id) => dispatch(getPostbyId(id)),
        deletePost: (id) => dispatch(deletePostbyId(id)),
        resetPostObject: () => dispatch(resetPostEditObject())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (PostContainer)

function setList(postData, setPostList) {
    const options = postData.posts.map(e => { return { ...e, value: e.title, label: e.title }; });
    setPostList(options);
}