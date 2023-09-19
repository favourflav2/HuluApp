import * as React from "react";
import EastIcon from "@mui/icons-material/East";
import RemoveIcon from "@mui/icons-material/Remove";
import { Skeleton, Tooltip } from "@mui/material";
import { Dispatch } from "../../redux/store";
import { openMovieItemDetials, openTvItemDetails, saveTvOrMovie } from "../../redux/features/huluSlice";
import { Save } from "../../redux/api/authApi";
import { useLocation, useNavigate } from "react-router-dom";

export interface ISavedCardProps {
  item: {
    img: string;
    type: string;
    item_id: number;
    name: string;
    who_liked: string;
  };
  loading: boolean;
}

export default function SavedCard({ item, loading }: ISavedCardProps) {
  const dispatch = Dispatch();
  const navigate = useNavigate()
  const {pathname} = useLocation()

  // Save Movie  Object
  const itemData: Save = {
    item_id: item?.item_id,
    name: item?.name,
    img: item?.img,
    type: item?.type,
  };

  //console.log(item?.type);

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" className="sm:w-auto   h-[300px]" />
      ) : (
        <div className="flex items-center justify-center  flex-col w-full h-auto pb-8"
        onClick={()=>{
          if (item?.type === "Movie") {
            dispatch(openMovieItemDetials(pathname));
            navigate(`/movieDetails/${item?.item_id}`);
          } else if (item?.type === "Tv") {
            dispatch(openTvItemDetails(pathname))
            navigate(`/tvDetails/${item?.item_id}`)
          } else {
            alert("This item is not a movie or tv");
          }
        }}
        >
          <div className=" group relative rounded-lg w-full">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
              alt=""
              className="w-full lg:h-[370px] md:h-[390px] sm:h-[506px] min-[600px]:h-[410px] min-[550px]:h-[380px]  min-[500px]:h-[350px]   min-[471px]:h-[320px] min-[420px]:h-[285px] min-[380px]:h-[253px]  object-cover group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg"
            />

            {/* Image OverLay */}
            <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/30 group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg group-hover:border-4 group-hover:border-gray-300">
              <button className="p-3 bg-white rounded-full">
                <EastIcon />
              </button>
            </div>
          </div>

          {/* Title & Desc */}
          <div className="w-full h-auto flex flex-col mt-3">
            <h1 className="text-gray-400 text-[12px]">Start Watching</h1>
            <h1 className="text-white text-[14px] font-medium py-1">{item?.name.length >= 22 ? item.name.slice(0, 20) + "..." : item?.name}</h1>
          </div>

          <div className="w-full flex items-start pb-5 mt-2">
            <Tooltip title="Remove From Your Stuff">
              <button className=" rounded-full p-[2px] border border-gray-200 transition ease-in-out delay-150 duration-200 hover:scale-105" onClick={() => dispatch(saveTvOrMovie(itemData))}>
                <RemoveIcon className="text-gray-200" />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
}
