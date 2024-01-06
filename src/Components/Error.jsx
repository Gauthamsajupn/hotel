import React from 'react'

function Error({message}) {
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                <p><center>{message}</center></p>
            </div>
        </div>
    )
}

export default Error