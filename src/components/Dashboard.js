import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { cardItems } from '../common/Utils';
import ErrorBoundary from './ErrorBoundary';
import { HttpService } from '../common/HttpService';
import { urlConstant } from '../common/UrlConst';

function Dashboard(props) {

    const navigate = useNavigate();
    const [clonedCards, setClonedCards] = useState(cardItems);

    useEffect(() => {
        const promise1 = new Promise((resolve, reject) => {
            HttpService.get(urlConstant.postApiEndPoint).then((res) => {
            resolve(res.meta.pagination.total)
            }).catch(reject)
        });
        const promise2 = new Promise((resolve, reject) => {
            HttpService.get(urlConstant.todoApiEndPoint).then((res) => {
                resolve(res.meta.pagination.total)
                }).catch(reject)
        });
        const promise3 = new Promise((resolve, reject) => {
            HttpService.get(urlConstant.commentApiEndPoint).then((res) => {
                resolve(res.meta.pagination.total)
                }).catch(reject)
        });

        Promise.all([promise1, promise2, promise3]).then((values) => {
            let tempData = [...clonedCards];
            tempData[0].count = values[0];
            tempData[1].count = values[1];
            tempData[2].count = values[2];
            setClonedCards([...tempData])
        });
    }, [])

    return (

        <ErrorBoundary>
            <Row className="mt-4">
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
            </Row>
        </ErrorBoundary>
    )
}

export default Dashboard