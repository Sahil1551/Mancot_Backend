import React from 'react'
import '../index.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel1 from '/2024.png';
import Carousel2 from '/Carousel2.png';
import Carousel3 from '/Carousel3.png';
const Caro = () => {
  return (
    <div className="Carousel">
        <Carousel showStatus={false} showThumbs={false}>
          <div>
            <img src={Carousel1} alt="slide 1" />
            <button className="carousel-button" onClick={() => window.location.href = '/Product'}>Shop Now</button>
          </div>
          <div>
            <img src={Carousel2} alt="slide 2" />
            <button className="carousel-button2" onClick={() => window.location.href = '/Product'}>Shop Now</button>
          </div>
          <div>
            <img src={Carousel3} alt="slide 3" />
            <button className="carousel-button3" onClick={() => window.location.href = '/Product'}>Shop Now</button>
          </div>
        </Carousel>
      </div>
  )
}

export default Caro
