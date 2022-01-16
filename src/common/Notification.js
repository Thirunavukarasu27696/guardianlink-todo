
import Alert from 'react-bootstrap/Alert'

const Notifier = ({ error = '', success = '' }) => {
    if (error) return (<Alert variant={'danger'}>{error}</Alert>)
    if (success) return (<Alert variant={'success'}>{success}</Alert>)

    return null;
}

export default Notifier;