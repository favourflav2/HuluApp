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

export interface IYouMayAlsoLikeTvCardProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
    title: string;
    overview: string;
  };
  loading: boolean;
}

export default function YouMayAlsoLikeTvCard({ item, loading }: IYouMayAlsoLikeTvCardProps) {
  const navigate = useNavigate();

  // Redux state
  const { savedData, saveLoading } = UseSelector((state) => state.hulu);
  const { user } = UseSelector((state) => state.auth);
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
  const tvFind = savedData?.find((val) => val.name === item?.name);

  // Save Tv  Object
  const itemData: Save = {
    item_id: item?.id,
    name: item?.name,
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
              //dispatch(openTvItemDetails(pathname));
              navigate(`/tvDetails/${item?.id}`);
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
                <EastIcon className="" />
              </button>
            </div>
          </div>

          {/* Title And Description */}
          <div className="sm:w-[220px] w-[170px] h-auto mt-5 flex flex-col">
            <div className="w-full flex items-center  justify-between mb-3">
              <h1 className="text-white font-semibold md:text-base text-[12px]">{item?.name?.length > 21 ? item?.name?.slice(0, 18) + "..." : item?.name}</h1>
              {tvFind?.name === item?.name && Number(tvFind?.item_id) === item.id ? (
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

            <h1 className="text-gray-400 text-[13px] h-[78.5px]">{item?.overview?.length >= 90 ? item?.overview.slice(0, 90) + "..." : item?.overview}</h1>
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
                navigate(`/tvDetails/${item?.id}`);
              }}
              className="text-gray-300"
            >
              <EastIcon className="mr-2 text-[16px]" />
              Details
            </MenuItem>
            {user?.user &&
              (tvFind?.name === item?.name && Number(tvFind?.item_id) === item.id ? (
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
