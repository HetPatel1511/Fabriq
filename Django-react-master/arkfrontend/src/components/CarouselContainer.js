// import Carousel from 'react-bootstrap/Carousel';
// import Carouselhome1 from './carouselhome1.webp';
// import Carouselhome2 from './carouselhome2.webp';
// import Carouselhome3 from './carouselhome3.webp';

// function CarouselContainer() {
//   return (
//     <Carousel>
//       <Carousel.Item>
//         <img src={Carouselhome1} alt=""/>
//       </Carousel.Item>
//       <Carousel.Item>
        
//       <img src={Carouselhome2} alt=""/>
//       </Carousel.Item>
//       <Carousel.Item>
        
//       <img src={Carouselhome3} alt=""/>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default CarouselContainer;
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./carousel.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 200 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const sliderImageUrl = [
  //First image url
  {
    url:"https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-29092023-MainBannerDailyChanging-Z1-P2-Nikeadidas-upto45.jpg"
  },
  {
    url:"https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-29092023-MainBannerDailyChanging-Z1-P3-MnsStevemadden-upto60.jpg"
          
  },
  //Second image url
  {
    url:
      "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-28092023-MainBannerDailyChanging-Z1-P4-AvaasaDNMX-flat60.jpg"
  },
  //Third image url


];
const Carosuelf = () => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <img src={imageUrl.url} alt="movie" className="mx-auto d-block"/>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Carosuelf;
