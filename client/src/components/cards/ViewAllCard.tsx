import * as React from "react";
import EastIcon from "@mui/icons-material/East";
import noImage from "../../assets/noImage.png";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import grayLazy from "../../assets/grayLazy.avif";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "../../redux/store";
import { openMovieItemDetials, openTvItemDetails } from "../../redux/features/huluSlice";

export interface IViewAllCardProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
  };
  loading: boolean;
}

export default function ViewAllCard({ item, loading }: IViewAllCardProps) {
  const navigate = useNavigate();
  const dispatch = Dispatch();
  const { pathname } = useLocation();
  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" className="2xl:w-[260px] 2xl:h-[390px]  xl:w-[230px] xl:h-[345px] sm:w-[220px] sm:h-[330px] h-[513px]  " />
      ) : (
        <div
          className="flex flex-col items-center justify-center py-2 px-[2px] group"
          onClick={() => {
            if (item?.type === "Movie") {
              dispatch(openMovieItemDetials(pathname));
              navigate(`/movieDetails/${item?.id}`);
            } else if (item?.type === "Tv") {
              dispatch(openTvItemDetails(pathname));
              navigate(`/tvDetails/${item?.id}`);
            } else {
              alert("This item is not a movie or tv mbile buttoin");
            }
          }}
        >
          <div className="group relative  rounded-lg ">
            {/* image */}
            {item?.poster_path ? (
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w780/${item?.poster_path}`}
                alt="Tv/Movie Img"
                className=" 2xl:w-[260px] 2xl:h-[390px]  xl:w-[230px] xl:h-[345px] sm:w-[220px] sm:h-[330px] h-[513px]   object-cover  sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg"
                effect="blur"
                placeholderSrc={grayLazy}
              />
            ) : (
              <LazyLoadImage
                src={noImage}
                alt="Tv/Movie Img"
                className=" 2xl:w-[260px] 2xl:h-[390px]  xl:w-[230px] xl:h-[345px] sm:w-[220px] sm:h-[330px] h-[513px]  object-cover  sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg"
                effect="blur"
                placeholderSrc={grayLazy}
              />
            )}

            {/* image overlay */}
            <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 sm:group-hover:opacity-100 sm:group-hover:bg-black/30  sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg sm:group-hover:border-4 sm:group-hover:border-gray-300">
              <button className="p-3 bg-white rounded-full">
                <EastIcon />
              </button>
            </div>
          </div>

          <h1 className=" md:text-[14px] text-[12px]  mb-2 mt-2 font-medium transition ease-in-out delay-150 duration-300 cursor-pointer text-gray-200 sm:group-hover:scale-105 sm:group-hover:underline sm:group-hover:translate-y-1">
            {item?.title ? (item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title) : item?.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name}
          </h1>
        </div>
      )}
    </>
  );
}

// hover:mb-[2px] transition ease-in-out delay-150 duration-300

// 2xl:w-[260px] 2xl:h-[390px] xl:w-[230px] xl:h-[345px] min-[1200px]:w-[200px] min-[1100px]:w-[190px]  min-[900px]:w-[180px] min-[700px]:w-[130px] min-[700px]:h-[195px]
