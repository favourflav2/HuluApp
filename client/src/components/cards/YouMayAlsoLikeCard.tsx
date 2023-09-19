import * as React from "react";
import EastIcon from "@mui/icons-material/East";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/noImage.png";
import { CircularProgress, Menu, MenuItem, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Save } from "../../redux/api/authApi";
import { Dispatch, UseSelector } from "../../redux/store";
import RemoveIcon from "@mui/icons-material/Remove";
import { saveTvOrMovie } from "../../redux/features/huluSlice";

export interface IYouMayAlsoLikeCardProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
    title: string;
    overview: string;
  };
  loading: boolean;
}

export default function YouMayAlsoLikeCard({ item, loading }: IYouMayAlsoLikeCardProps) {
  const navigate = useNavigate();

  // Redux State
  const { user } = UseSelector((state) => state.auth);
  const { savedData, saveLoading } = UseSelector((state) => state.hulu);
  const dispatch = Dispatch();

  // Menu State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //! VERY IMPORTANT
  const movieFind = savedData?.find((val) => val.name === item?.title);

  // Save Movie  Object
  const itemData: Save = {
    item_id: item?.id,
    name: item?.title,
    img: item?.poster_path,
    type: item?.name ? "Tv" : "Movie",
  };

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" className="h-[300px]" />
      ) : (
        <div className="flex flex-col w-auto h-auto  rounded-lg items-center mb-10 ">
          <div
            className="group relative rounded-lg"
            onClick={() => {
              //dispatch(openMovieItemDetials(pathname));
              navigate(`/movieDetails/${item?.id}`);
            }}
          >
            {/* image */}
            <img
              src={`${item?.poster_path ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}` : `${noImage}`}`}
              alt=""
              className=" sm:w-[220px] w-[170px] h-[255px] sm:h-[330px] object-cover sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg"
            />

            {/* Image OverLay */}
            <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 sm:group-hover:opacity-100 sm:group-hover:bg-black/30 sm:group-hover:scale-105 transition ease-in-out delay-150 duration-300 rounded-lg sm:group-hover:border-4 sm:group-hover:border-gray-300">
              <button className="p-3 bg-white rounded-full">
                <EastIcon />
              </button>
            </div>
          </div>

          {/* Title And Description */}
          <div className="sm:w-[220px] w-[170px] h-auto mt-5 flex flex-col">
            <div className="w-full flex items-center  justify-between mb-3">
              <h1 className="text-white font-semibold md:text-base text-[12px]">{item?.title?.length > 21 ? item?.title?.slice(0, 18) + "..." : item?.title}</h1>
              {movieFind?.name === item?.title && Number(movieFind?.item_id) === item.id ? (
                saveLoading ? (
                  <CircularProgress color="success" />
                ) : (
                  <button
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    <MoreVertIcon className="text-gray-400" />
                  </button>
                )
              ) : (
                <button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  <MoreVertIcon className="text-gray-400" />
                </button>
              )}
            </div>

            {item?.overview === null || item?.overview.length <= 0 ? (
              <h1 className="text-gray-400 text-[13px] h-[78.5px]">N/A</h1>
            ) : (
              <h1 className="text-gray-400 text-[13px] h-[78.5px]">{item?.overview?.length >= 90 ? item?.overview.slice(0, 90) + "..." : item?.overview}</h1>
            )}
          </div>

          {/* Menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiMenu-paper": { backgroundColor: "#252528" },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                //dispatch(openMovieItemDetials(pathname));
                navigate(`/movieDetails/${item?.id}`);
              }}
              className="text-gray-300"
            >
              <EastIcon className="mr-2 text-[16px]" />
              Details
            </MenuItem>
            {user?.user &&
              (movieFind?.name === item?.title && Number(movieFind?.item_id) === item.id ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(saveTvOrMovie(itemData));
                  }}
                  className="text-gray-300"
                >
                  <RemoveIcon className="mr-2 text-[16px]" />
                  Remove From My Stuff
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(saveTvOrMovie(itemData));
                  }}
                  className="text-gray-300"
                >
                  <AddIcon className="mr-2 text-[16px]" />
                  Add To My Stuff
                </MenuItem>
              ))}
          </Menu>
        </div>
      )}
    </>
  );
}
