import { sideImageData, items } from "./carouselData";
import CarouselComp from "../assetComp/carousel";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import "./style.css";

const Testimonial = function () {
  //check if device has width >650px
  const isSmallTablet = useMediaQuery({
    query: "(min-width: 650px)",
  });
  return (
    <motion.div
      className="testimonial-section"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: "0vw" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h1> Testimonials </h1>
      <div className="testimonal-data">
      {/* if device is tablet  */}
        {isSmallTablet && (
          <div className="photos-section photos-section-div-1">
            {sideImageData.map((item) => {
              return (
                <img
                  src={item.image}
                  alt="Clients"
                  className={`testi-img-${item.id}-div-1`}
                />
              );
            })}
          </div>
        )}
        <div className="testimonal-carousel">
          <CarouselComp
            items={items}
            pause="hover"
            ride="carousel"
            enableTouch="true"
          />
        </div>
        {/* if tabket is device  */}
        {isSmallTablet && (
          <div className="photos-section photos-section-div-2">
            {sideImageData.map((item) => {
              return (
                <img
                  src={item.image}
                  alt="Clients"
                  className={`testi-img-${item.id}-div-2`}
                />
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Testimonial;
