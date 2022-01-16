import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { fetchTodos, resetTodoObject, deleteTodoItembyId, getTodoItembyId } from '../../redux/todo/todoActions';
import AddEditTodo from './AddEditTodo';
import ErrorBoundary from '../ErrorBoundary';
import { DELETE_SUCCESS_MESSAGE } from '../../common/Utils';
import { HttpService } from '../../common/HttpService';
import { urlConstant } from '../../common/UrlConst';
import Loader from '../../common/Loader';

function TodoContainer(props) {
    const { todoData, fetchData, resetEditTodoObject,
        deleteTotoItem, getTodobyId, } = props;

    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        fetchData();
    }, [fetchData, todoData.itemCount])

    useEffect(() => {
        setList(todoData, setTodoList);
    }, [todoData.posts])

    if (todoData && todoData.loading) { return (<div> <Loader /></div>) }
    if (todoData.error) {
        return (<Alert variant={'danger'}>
            {todoData.error}
        </Alert>)
    }

    const onEditPost = ({ id }) => {
        if (id) getTodobyId(id);
        setModalShow(true);

    }

    const onDeletePost = ({ id }) => {
        if (id) deleteTotoItem(id);
        const _message = DELETE_SUCCESS_MESSAGE;
        showMessage(_message);

    }

    const processTodoList = (msg) => {
        showMessage(msg);
        setModalShow(false);
        resetEditTodoObject();
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
        resetEditTodoObject();
        setModalShow(false);
    }
    const filterItems = (inputValue) => {
        return todoList.filter((i) =>
            i.title.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handleInputChange = (newValue) => {
        return newValue.replace(/\W/g, '');
    };

    const handleSearch = ({ target: { value } }) => {
        if (!value) {
            setList(todoData, setTodoList);
            return null;
        }
        setTodoList(filterItems(handleInputChange(value)))
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
                            {/* <AsyncSelect
                                isClearable
                                noOptionsMessage={() => { return null }}
                                loadOptions={loadOptions}
                                onInputChange={handleInputChange}
                            /> */}
                            <Form.Control placeholder='search by title'
                                onChange={handleSearch}
                            />
                        </div>
                    </Col>
                    <Col xl={2} className='d-flex  justify-content-end'>

                        <Button variant="primary" onClick={handleAddPost}>Add Todo</Button>
                    </Col>
                </Row>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Todo Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoList.length > 0 ? todoList.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <span className="px-3 cursor-pointer" onClick={() => onEditPost(item)}><i className="bi bi-pencil-square"></i></span>
                                    <span className="cursor-pointer" onClick={() => onDeletePost(item)}><i className="bi bi-trash"></i></span>
                                </td>
                            </tr>) : <tr>
                            <td colSpan="3" className='text-center py-5'><div>No Match Found ! </div></td>
                        </tr>}
                    </tbody>
                </Table>
                {modalShow &&
                    <AddEditTodo show={modalShow}
                        onHide={() => onHideModal()}
                        processTodoList={processTodoList} />
                }
            </ErrorBoundary>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        todoData: state.todo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchTodos()),
        getTodobyId: (id) => dispatch(getTodoItembyId(id)),
        deleteTotoItem: (id) => dispatch(deleteTodoItembyId(id)),
        resetEditTodoObject: () => dispatch(resetTodoObject())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (TodoContainer)

function setList(todoData, setTodoList) {

    const options = todoData.posts.map(e => { return { ...e, value: e.title, label: e.title }; });
    setTodoList(options);
}

