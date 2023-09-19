import * as React from "react";
import noImage from "../../assets/noImage.png";
import EastIcon from "@mui/icons-material/East";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Skeleton } from "@mui/material";


export interface IEpisodeCardProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
  };
  loading: boolean;
}

export default function EpisodeCard({ item, loading }: IEpisodeCardProps) {
 
  return (
    <>
      { (
        loading ? 
        (
            <Skeleton variant="rectangular" className="h-[200px]"/>
        ) 
        : 
        (
            <div className="flex flex-col w-full h-auto  rounded-lg items-center mb-10 ">
          <div className="w-full group relative rounded-lg">
            {/* image */}
            <img
              src={`${item?.still_path ? `https://image.tmdb.org/t/p/w500/${item?.still_path}` : `${noImage}`}`}
              alt=""
              className="  object-cover sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg w-full h-[187.5px]"
            />

            {/* Image OverLay */}
            <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 sm:group-hover:opacity-100 sm:group-hover:bg-black/30 sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg sm:group-hover:border-4 sm:group-hover:border-gray-300">
              <button
                className="p-3 sm:group-hover:bg-white sm:group-hover:text-black rounded-full"
                onClick={() => {
                  // dispatch(openMovieItemDetials());
                  // navigate(`/movieDetails/${item?.id}`);
                }}
              >
                <EastIcon className=" " />
              </button>
            </div>
          </div>

          {/* Title And Description */}
          <div className="w-full h-auto mt-5 flex flex-col">
            <div className="w-full flex items-center  justify-between mb-3">
              <div className="w-full flex-col">
                {/* Episode Number */}
                <h1 className="text-gray-400 text-[14px] mb-1">Episode {item?.episode_number}</h1>
                {/* Episode name */}
                <h1 className="text-white font-semibold md:text-base text-[12px]">{item?.name?.length > 50 ? item?.name?.slice(0, 50) + "..." : item?.name}</h1>
              </div>
              <button
                onClick={(e) => {
                  //handleClick(e);
                }}
              >
                <MoreVertIcon className="text-gray-400" />
              </button>
            </div>

            <h1 className="text-gray-400 text-[13px] h-[78.5px]">{item?.overview?.length >= 90 ? item?.overview.slice(0, 90) + "..." : item?.overview}</h1>
          </div>

          
        </div>
        )
      )}
    </>
  );
}
