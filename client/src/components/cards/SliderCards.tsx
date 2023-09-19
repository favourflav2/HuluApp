import * as React from "react";
import EastIcon from "@mui/icons-material/East";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import grayLazy from "../../assets/grayLazy.avif";
import { Dispatch } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { openMovieItemDetials, openTvItemDetails } from "../../redux/features/huluSlice";


export interface ISliderCardsProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
  };
}

export default function SliderCards({ item }: ISliderCardsProps) {
  //console.log(item)
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation()


  return (
    <div
      className="flex items-center justify-center py-2 px-[2px]"
      onClick={() => {
        if (item?.type === "Movie") {
          dispatch(openMovieItemDetials(pathname));
          navigate(`/movieDetails/${item?.id}`);
        } else if (item?.type === "Tv") {
          dispatch(openTvItemDetails(pathname))
          navigate(`/tvDetails/${item?.id}`)
        } else {
          alert("This item is not a movie or tv");
        }
      }}
    >
      <div className="group relative  rounded-lg ">
        {/* image */}
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w342/${item?.poster_path}`}
          alt="Tv/Movie Img"
          className=" w-[180px] h-[270px] object-cover  sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg"
          effect="blur"
          placeholderSrc={grayLazy}
        />

        {/* image overlay */}
        <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 sm:group-hover:opacity-100 sm:group-hover:bg-black/30  sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg sm:group-hover:border-4 sm:group-hover:border-gray-300">
          <button
            className="p-3 bg-white rounded-full"
          >
            <EastIcon className=""/>
          </button>
        </div>
      </div>
    </div>
  );
}

// https://image.tmdb.org/t/p/w500/${item?.poster_path}
// https://image.tmdb.org/t/p/original/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
// lg:w-[250px] xl:w-[290px] h-[200px]
