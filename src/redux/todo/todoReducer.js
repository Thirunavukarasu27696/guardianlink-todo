import { RootActionType } from '../rootTypes'
import { todoActionsType } from './todoTypes'

const initialState = {
    loading: true,
    posts: [],
    error: '',
    postObject: {},
    itemCount: 0,
    total: 0
}

const todoReducer = (state = initialState, action) => {

    switch (action.type) {
        case RootActionType.FETCH_POST_REQUEST: return {
            ...state,
            loading: true,
        }
        case RootActionType.FETCH_POST_SUCCESS: return {
            ...state,
            loading: false,
            posts: action.payload.data,
            error: '',
            total: action.payload.meta.pagination.total
        }
        case RootActionType.FETCH_POST_FAILURE: return {
            ...state,
            loading: false,
            posts: [],
            error: action.error
        }
        case todoActionsType.ADD_TODO: return {
            ...state,
            loading: false,
            error: '',
            itemCount: state.itemCount + 1
        }
        case todoActionsType.GET_TODO_BY_ID: return {
            ...state,
            loading: false,
            postObject: action.payload,
            error: ''
        }
        case todoActionsType.REST_TODO_OBJECT: return {
            ...state,
            loading: false,
            postObject: {},
            error: ''
        }
        case todoActionsType.EDIT_TODO: return {
            ...state,
            loading: false,
            post: action.payload,
            error: '',
            itemCount: state.itemCount + 1

        }
        case todoActionsType.DELETE_TODO: return {
            ...state,
            loading: false,
            error: '',
            itemCount: state.itemCount - 1,
        }

        default: return state
    }
}

export default todoReducer