import React from 'react'
import {API} from '../backend'
import Base from './Base'


function Home() {
 
    return (
        <Base title="ECOM STORE">
        <div className="row">
            
            <div className="col-4"><button className="btn btn-success">Test</button></div>
            <div className="col-4"><button className="btn btn-success">Test</button></div>
            <div className="col-4"><button className="btn btn-success">Test</button></div>
            </div>
        </Base>
    )
}

export default Home
