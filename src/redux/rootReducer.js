import { combineReducers } from 'redux';
import postReducer from './post/postReducer';
import todoReducer from './todo/todoReducer';
import commentReducer from './comment/commentReducer';

const rootReducer = combineReducers({
    post: postReducer,
    todo: todoReducer,
    comment: commentReducer
})

export default rootReducer