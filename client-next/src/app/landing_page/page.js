'use client';
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import photo1 from './iphone.png';
// import './css/landing_page.css'
import HomeNav from '../home_nav';

export default function LandingPage(){
    return(
        <div>
            <HomeNav />
            {/* <h1>Notified</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className = "slideshow">
                    <Carousel>
                        <Carousel.Item>
                            <img width = "1200px" height = "700px" className = "img_test"src = {photo1}/>
                            <Carousel.Caption> 
                                <h3>Get Notified anytime</h3>
                                <p>stay up to date with all new artist releases</p>
                            </Carousel.Caption>
                        </Carousel.Item>  
                        <Carousel.Item>
                            <img width = "1200px" height = "700px" className = "img_test"src = {photo1}/>
                            <Carousel.Caption> 
                                <h3>Slide 2</h3>
                                <p>slide 2 descritption</p>
                            </Carousel.Caption>
                        </Carousel.Item>   
                        <Carousel.Item>
                            <img width = "1200px" height = "700px" className = "img_test"src = {photo1}/>
                            <Carousel.Caption> 
                                <h3>Slide 2</h3>
                                <p>slide 2 descritption</p>
                            </Carousel.Caption>
                        </Carousel.Item>    
                    </Carousel> 
                </div>
            </div> */}
            <div>page bottom</div>
        </div>
    )
}