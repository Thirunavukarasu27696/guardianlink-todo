import React, { Component } from 'react';
import Notifier from '../common/Notification';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service

    }

    render() {
        if (this.state.hasError) {
            return <Notifier error={'Something went wrong.'} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;