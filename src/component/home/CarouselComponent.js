import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComponent = ({ handleSelect, defActive, onSlideFunction, carouselItems }) => {
    return (
      <Carousel
        indicators={false}
        onSelect={handleSelect}
        activeIndex={defActive}
        pause={false}
        interval={5000}
        prevIcon={""}
        prevLabel={"left"}
        nextIcon={""}
        nextLabel={"right"}
        onSlide={(e) => onSlideFunction(e)}
      >
        {carouselItems.map(item => (
          <Carousel.Item key={item.id}>
            <div className="container ">
              <div className="row">
                <div className="detail-box">
                  <div className="col-lg-2"></div>
                  <div className="col-lg-8 col-md-12 m-auto">
                    <div className="detail-box text-center">
                      {item.content}
                    </div>
                  </div>
                  <div className="col-lg-2"></div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
  
  export default CarouselComponent;