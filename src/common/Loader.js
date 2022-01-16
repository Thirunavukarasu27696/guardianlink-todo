import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader() {
    return (
        <div className='w-100 d-flex justify-content-center my-5 py-5'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> 
    )
}
