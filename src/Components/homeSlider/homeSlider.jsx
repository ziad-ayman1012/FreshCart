
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../../assets/finalProject assets/finalProject assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/finalProject assets/finalProject assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/finalProject assets/finalProject assets/images/slider-image-3.jpeg'
import slide4 from '../../assets/finalProject assets/finalProject assets/images/grocery-banner.png'
import slide5 from '../../assets/finalProject assets/finalProject assets/images/grocery-banner-2.jpeg'

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
      slidesToScroll: 1,
    
  };
  return (
    <Slider {...settings} arrows={false}>
      <div>
        <img className="w-full h-96" src={slide1} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={slide2} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={slide3} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={slide4} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={slide5} alt="" />
      </div>
    </Slider>
  );
}
