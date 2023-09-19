import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


import { Skeleton } from "@mui/material";
import LargeGenreCard from "../cards/LargeGenreCard";

export interface ILargeGenreSliderProps {
  data: Array<any>;
  loading: boolean;
  title: string;
}

export default function LargeGenreSlider({ data, loading, title }: ILargeGenreSliderProps) {
  // SLider Stuff
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1580,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1349,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1107,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 881,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);

  //! This newData is going to be the same array of objects ... However im going to add new a property to it
  //* So i know if the data is a movie or tv
  let newData = data?.slice().map((item) => {
    return {
      ...item,
      type: item.name ? "Tv" : "Movie",
    };
  });
  

  return (
    <div className="w-full h-auto flex flex-col md:px-10 px-5 py-3 mb-5">
      {/* TItle */}
      <div className="w-full flex items-center justify-between">
        {/* Right Side */}
        <div className="w-auto h-auto flex items-baseline">
          <h1 className="text-white font-medium text-[18px] cursor-pointer">{title}</h1>
        </div>
        {/* Arrows */}
        {!loading && (
          <div className="sm:flex hidden w-auto items-center">
            <ArrowBackIosIcon className="text-white mr-2" onClick={sliderRef?.slickNext} />
            <ArrowForwardIosIcon className="text-white" onClick={sliderRef?.slickNext} />
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="w-full h-auto relative mt-1">
        {loading ? (
          <div className="w-full h-full">
            <div className="md:grid hidden grid-cols-5 gap-2">
              {Array.from(Array(5).keys()).map((item: any, index: any) => (
                <Skeleton variant="rectangular" className="h-[450px]" key={index} />
              ))}
            </div>

            <div className="grid md:hidden grid-cols-2 gap-2">
              {Array.from(Array(2).keys()).map((item: any, index: any) => (
                <Skeleton variant="rectangular" className="h-[450px]" key={index} />
              ))}
            </div>
          </div>
        ) : (
          <Slider {...settings} ref={setSliderRef} className="w-full flex justify-center">
            {newData?.map((item: any, index: any) => (
              <LargeGenreCard item={item} key={index} loading={loading}/>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
