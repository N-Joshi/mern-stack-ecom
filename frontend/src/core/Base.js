import React from 'react'
import Menu from './Menu'
import '../styles.css'

const Base = ({
    title="My Title",
    description="My Description",
    className="bg-dark text-white p-4",
    children
}) => (
    <div>
    <Menu/> 
        <div className="container-fluid px-0 mb-0">
            <div className="jumbotron bg-dark text-white text-center ">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
           <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-2  ">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>If you any question, feel free to catch up</h4>
                <button className="btn btn-warning btn-md">Contact Us</button>
            </div>
            <div className="container">
                <span className="text-muted">
                   <span className="text-white">MERN</span> BOOTCAMP
                </span>
            </div>
        </footer>
    </div>
)

export default Base
