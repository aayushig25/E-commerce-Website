import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <Spinner animation="border">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader
