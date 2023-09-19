import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import SliderCards from "../cards/SliderCards";
import { Modal, Pagination, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ViewAllCard from "../cards/ViewAllCard";

interface PaginationData {
  page: number;
  results: Array<any>;
  total_pages: number;
  total_reuslts: number;
}

export interface IHomeSliderProps {
  title: string;
  moreTitle: string;
  data: PaginationData;
  loading: boolean;
  pageState: number;
  setPageState: React.Dispatch<React.SetStateAction<number>>;
}

export default function HomeSlider({ title, moreTitle, data, loading, pageState, setPageState }: IHomeSliderProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageState(value);
  };

  // SLider Stuff
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1555,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1382,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1016,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 888,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = React.useState<any>(null);

  //! This newData is going to be the same array of objects ... However im going to add new a property to it
  //* So i know if the data is a movie or tv
  let newData = data?.results?.slice().map((item) => {
    return {
      ...item,
      type: item.name ? "Tv" : "Movie",
    };
  });



  // Reft to get current height
  const ref = React.useRef<any>(null);
  const executeScroll = () => ref?.current?.scrollTo(0, 0);

  

  return (
    <div className="w-full h-auto flex flex-col md:px-10 px-5 py-3 mb-5">
      {/* TItle */}
      <div className="w-full flex items-center justify-between">
        {/* Right Side */}
        <div className="w-auto h-auto flex items-baseline">
          <h1 className="text-white font-medium text-[18px] cursor-pointer">{title}</h1>

          <h1
            className="text-gray-400 ml-3 mr-2 cursor-pointer text-[14px]"
            onClick={() => {
              handleOpen()
            }}
          >
            {moreTitle}
          </h1>

          <button>
            <ArrowForwardIosIcon className=" cursor-pointer text-white text-[20px]" />
          </button>
        </div>
        {/* Arrows */}
        {!loading && (
          <div className="md:flex hidden w-auto items-center">
            <ArrowBackIosIcon className="text-white mr-2" onClick={sliderRef?.slickNext} />
            <ArrowForwardIosIcon className="text-white" onClick={sliderRef?.slickNext} />
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="w-full h-auto relative mt-5">
        {loading ? (
          <div className="w-full h-full">
            <div className="md:grid hidden grid-cols-5 gap-2">
              {Array.from(Array(5).keys()).map((item: any, index: any) => (
                <Skeleton variant="rectangular" className="h-[250px]" key={index} />
              ))}
            </div>

            <div className="grid md:hidden grid-cols-2 gap-2">
              {Array.from(Array(2).keys()).map((item: any, index: any) => (
                <Skeleton variant="rectangular" className="h-[250px]" key={index} />
              ))}
            </div>
          </div>
        ) : (
          <Slider {...settings} ref={setSliderRef} className="">
            {newData?.map((item: any, index: any) => (
              <SliderCards item={item} key={index} />
            ))}
          </Slider>
        )}
      </div>

      {/* Modal View All */}
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setPageState(1);
        }}
      >
        <div className="w-full h-full bodyBg">
          {/* Content */}
          <div className="w-full h-full flex flex-col">
            {/* Navbar */}
            <nav className="w-full h-[70px] fixed top-0 left-0 right-0 z-10 bg-gray-200/30 backdrop-blur-md flex items-center justify-between px-2">
              <span></span>

              <h1 className="text-gray-200 font-medium">All {title}</h1>

              <button
                className="text-gray-200"
                onClick={() => {
                  handleClose();
                  setPageState(1);
                }}
              >
                <CloseIcon className="text-[30px]" />
              </button>
            </nav>

            <div className="w-full h-full flex-col flex overflow-y-auto no-scrollbar md:p-10 p-5 mt-[70px]" ref={ref}>
              {/* Mapped Data */}
              <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                {newData?.map((item: any, index: any) => (
                  <ViewAllCard item={item} key={index} loading={loading}/>
                ))}
              </div>
              {/* Pagination */}
              <div className="w-full h-auto flex flex-col justify-center items-center mt-5 pb-5">
                <h1 className="mb-2 text-gray-200">Page: <span className="font-semibold">{pageState}</span></h1>

                <Pagination
                  count={data?.total_pages}
                  page={pageState}
                  onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                    executeScroll();
                    handleChange(e, value);
                  }}
                  className="text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

//A-Z
//open={open} handleClose={handleClose} handleOpen={handleOpen} setOpen={setOpen}
