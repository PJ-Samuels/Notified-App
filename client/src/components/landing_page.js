import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import photo1 from './images/iphone.png';
import './css/landing_page.css'

export default function LandingPage(){
    return(
        <div>
            <h1>Notified</h1>
            <div className = "slideshow">
                <Carousel className="slideshow">
                    <Carousel.Item>
                        <img width = "1000px" height = "500px" className = "img_test"src = {photo1}/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>    
                </Carousel> 
            </div>
            <div>page bottom</div>
        </div>
    )
}