import React from 'react'
import pageNotFound from '../assets/images/page-not-found.png'
function PageNotFound() {
    return (
        <div id="wrapper" className="text-center">
            <img src={pageNotFound} alt="Page not found" />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div>
    )
}

export default PageNotFound
