import React from 'react'
import {API} from '../backend'
import Base from './Base'
import Card from './Card'


function Home() {
 
    return (
        <Base title="ECOM STORE" description="Welcome to the store">
        <div className="row">
            <div className="col-4">
                <Card/>
            </div>
            </div>
        </Base>
    )
}

export default Home
