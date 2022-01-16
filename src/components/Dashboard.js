import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { urlConstant, HttpService, ErrorBoundary, cardItems } from '../common/CommonExports';

function Dashboard() {
    const navigate = useNavigate();
    const [clonedCards, setClonedCards] = useState(cardItems);
    useEffect(() => {
        fetchCounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ErrorBoundary>
            {renderCards(clonedCards, navigate)}
        </ErrorBoundary>
    )

    function fetchCounts() {
        const promise1 = new Promise((resolve, reject) => {
            const apiEndPoint = urlConstant.postApiEndPoint;
            getCount(apiEndPoint, resolve, reject);
        });
        const promise2 = new Promise((resolve, reject) => {
            const apiEndPoint = urlConstant.todoApiEndPoint;
            getCount(apiEndPoint, resolve, reject);
        });
        const promise3 = new Promise((resolve, reject) => {
            const apiEndPoint = urlConstant.commentApiEndPoint;
            getCount(apiEndPoint, resolve, reject);
        });

        Promise.all([promise1, promise2, promise3]).then((values) => {
            let tempData = [...clonedCards];
            tempData[0].count = values[0];
            tempData[1].count = values[1];
            tempData[2].count = values[2];
            setClonedCards([...tempData]);
        });
    }
}

export default Dashboard

function renderCards(clonedCards, navigate) {
    return <Row className="mt-4">
        {clonedCards.map((item) => (
            <Col xl={4} key={item.name}>
                <div className='tile' onClick={() => navigate(item.path)}>
                    <div className='tile-items'>
                        <h6>{item.name}</h6>
                        <h1>{item.count}</h1>
                    </div>
                </div>
            </Col>
        ))}
    </Row>;
}

function getCount(apiEndPoint, resolve, reject) {
    HttpService.get(apiEndPoint).then((res, err) => {
        resolve(res.meta.pagination.total);
        reject(err);
    });
}
