import { RootActionType } from '../rootTypes'
import { PostActionsType } from './postTypes'

const initialState = {
    loading: true,
    posts: [],
    error: '',
    postObject: {},
    itemCount: 0,
    total: 0
}

const postReducer = (state = initialState, action) => {

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
        case PostActionsType.ADD_POST: return {
            ...state,
            loading: false,
            error: '',
            itemCount: state.itemCount + 1
        }
        case PostActionsType.GET_POST_BY_ID: return {
            ...state,
            loading: false,
            postObject: action.payload,
            error: ''
        }
        case PostActionsType.REST_POST_OBJECT: return {
            ...state,
            loading: false,
            postObject: {},
            error: ''
        }
        case PostActionsType.EDIT_POST: return {
            ...state,
            loading: false,
            post: action.payload,
            error: '',
            itemCount: state.itemCount + 1

        }
        case PostActionsType.DELETE_POST: return {
            ...state,
            loading: false,
            error: '',
            itemCount: state.itemCount - 1,
        }

        default: return state
    }
}

export default postReducer