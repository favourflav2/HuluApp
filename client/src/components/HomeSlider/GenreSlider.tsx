import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GenreCard from "../cards/GenreCard";
import { genreArray } from "../../Project_Ideas/manageData";

export interface IGenreSliderProps {
  genre: string;
  tvName: string;
  movieName: string;
  tvId: number;
  movieId: number;
}

 function GenreSlider() {
  // SLider Stuff
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
        {
            breakpoint: 1550,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1250,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
        
      
    ],
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);

  return (
    <div className="w-full h-auto flex flex-col md:px-10 px-5 py-3 ">
      {/* TItle */}
      <div className="w-full flex items-center justify-between">
        {/* Right Side */}
        <div className="w-auto h-auto flex items-baseline">
          <h1 className="text-white font-medium text-[18px] cursor-pointer">Genres</h1>

          
        </div>
        {/* Arrows */}
        <div className="md:flex hidden w-auto items-center">
          <ArrowBackIosIcon className="text-white mr-2" onClick={sliderRef?.slickNext} />
          <ArrowForwardIosIcon className="text-white" onClick={sliderRef?.slickNext} />
        </div>
      </div>

      {/* Slider */}
      <div className="w-full h-auto relative mt-5">
        {
          <Slider {...settings} ref={setSliderRef} className="">
            {genreArray?.map((item: any, index: any) => (
              <GenreCard item={item} key={index} />
            ))}
          </Slider>
        }
      </div>
    </div>
  );
}

export default React.memo(GenreSlider)
