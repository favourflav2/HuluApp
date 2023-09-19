import * as React from "react";
import noImage from "../../assets/noImage.png";
import { Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "../../redux/store";
import { openMovieItemDetials, openTvItemDetails } from "../../redux/features/huluSlice";

export interface ISearchCardProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
  };
  loading: boolean;
}

export default function SearchCard({ item, loading }: ISearchCardProps) {
  const navigate = useNavigate();
  const dispatch = Dispatch();
  const { pathname } = useLocation();
  return (
    <div
      className="w-full h-auto flex flex-col text-gray-200 transition ease-in-out delay-150 duration-300 sm:hover:bg-gray-700/20 cursor-pointer"
      onClick={() => {
        if(item?.poster_path){
            if (item?.media_type === "movie") {
                dispatch(openMovieItemDetials(pathname));
                navigate(`/movieDetails/${item?.id}`);
              } else if (item?.media_type === "tv") {
                dispatch(openTvItemDetails(pathname));
                navigate(`/tvDetails/${item?.id}`);
              } else {
                alert("This item is not a movie or tv");
              }
        }else{
            alert(`${item?.media_type === "movie" ? "This movie does not have the required information" : "This tv show does not have the required information"}`)
        }
      }}
    >
      <div className="w-full flex justify-between items-center p-5">
        {/* Left Side */}
        {loading ? (
          <Skeleton variant="rectangular" className="h-[160px] w-[140px] bg-gray-700/20" />
        ) : (
          <div className="w-auto h-auto flex items-center ">
            {/* Image */}
            <img src={`${item?.poster_path ? `https://image.tmdb.org/t/p/w342/${item?.poster_path}` : `${noImage}`}`} alt="img" className=" object-cover h-[120px] w-[80px]" loading="lazy" />

            <div className="w-auto h-auto flex flex-col ml-2">
              <h1>{item?.media_type === "movie" ? item?.title : item.name}</h1>
              <h1 className="sm:hidden block text-[12px] mt-1">{item?.media_type === "movie" ? "Movie" : "Series"}</h1>
            </div>
          </div>
        )}

        {/* Right Side */}
        {loading ? <Skeleton variant="rectangular" className="h-[40px] w-[80px] bg-gray-700/20" /> : <h1 className="sm:block hidden">{item?.media_type === "movie" ? "Movie" : "Series"}</h1>}
      </div>

      <hr className="border-gray-200" />
    </div>
  );
}
