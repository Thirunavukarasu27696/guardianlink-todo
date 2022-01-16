import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import Dashboard from './Dashboard';
import CommentContainer from './comment/CommentContainer';
import PostContainer from './post/PostContainer';
import TodoContainer from './todo/TodoContainer';
import PageNotFound from './PageNotFound';
import brand from './../assets/images/guardianlink_logo.svg'
import { cardItems } from '../common/Utils';
function Routing() {

    return (
        <Router>
            <div className="main">
                <TopBar />
                <SidBar />
                <div className='layout-body'>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/post" element={<PostContainer />} />
                        <Route path="/todo" element={<TodoContainer />} />
                        <Route path="/comment" element={<CommentContainer />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default Routing

const SidBar = () => {
    const navigate = useNavigate();
    return (<div className="sidebar">
        <div className="menu">
            <div className="menu-items">
                <ul className="items">
                    {cardItems.map(post => <li key={post.name} onClick={() => navigate(post.path)}>{post.name}</li>)}
                </ul>
            </div>
        </div>
    </div>)
}

const TopBar = () => {
    const navigate = useNavigate();
    return (<nav className="top-nav d-flex align-items-center">
        <div className="container-fluid">
            <div className="brand" onClick={() => navigate('/dashboard')}>
                <img src={brand} alt="brand-name" />
            </div>
        </div>
    </nav>);
}

