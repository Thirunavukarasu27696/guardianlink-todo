import { RootActionType } from '../rootTypes'
import { commentActionsType } from './commentTypes'

const initialState = {
    loading: true,
    posts: [],
    error: '',
    postObject: {},
    itemCount: 0,
    total: 0
}

const commentReducer = (state = initialState, action) => {

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
        case commentActionsType.ADD_COMMENT: return {
            ...state,
            loading: false,
            error: '',
            itemCount: state.itemCount + 1
        }
        case commentActionsType.GET_COMMENT_BY_ID: return {
            ...state,
            loading: false,
            postObject: action.payload,
            error: ''
        }
        case commentActionsType.REST_COMMENT_OBJECT: return {
            ...state,
            loading: false,
            postObject: {},
            error: ''
        }
        case commentActionsType.EDIT_COMMENT: return {
            ...state,
            loading: false,
            post: action.payload,
            error: '',
            itemCount: state.itemCount + 1

        }
        case commentActionsType.DELETE_COMMENT: return {
            ...state,
            loading: false,
            error: '',
            itemCount: state.itemCount - 1,
        }

        default: return state
    }
}

export default commentReducer