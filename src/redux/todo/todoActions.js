import { todoActionsType } from './todoTypes'
import { HttpService, urlConstant } from '../../common/CommonExports';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../rootTypes';


export const resetTodoObject = () => {
    return {
        type: todoActionsType.REST_TODO_OBJECT,
    }
}

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.get(urlConstant.todoApiEndPoint)
            .then(res => {
                dispatch(fetchPostsSuccess(res))
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const addTodo = (payload) => {
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.post(urlConstant.todoApiEndPoint, payload)
            .then(res => {
                const data = res.data;
                dispatch({
                    type: todoActionsType.ADD_TODO,
                    payload: data
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const getTodoItembyId = (id) => {
    const apiEndPoint = `${urlConstant.todoApiEndPoint}/${id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.get(apiEndPoint)
            .then(res => {
                const data = res.data;
                dispatch({
                    type: todoActionsType.GET_TODO_BY_ID,
                    payload: data
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const editTodo = (payload) => {
    const { id } = payload
    const apiEndPoint = `${urlConstant.todoApiEndPoint}/${id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.put(apiEndPoint, payload)
            .then(res => {
                dispatch({
                    type: todoActionsType.EDIT_TODO,
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}


export const deleteTodoItembyId = (Id = 0) => {
    const apiEndPoint = `${urlConstant.todoApiEndPoint}/${Id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.deleteItem(apiEndPoint)
            .then(res => {
                dispatch({
                    type: todoActionsType.DELETE_TODO,
                });
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}
