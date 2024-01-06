import React from 'react'

function Success({message}) {
    return (
        <div>
            <div class="alert alert-success" role="alert">
               <p> {message}</p>
            </div>
        </div>
    )
}

export default Success