import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import noImage from "../../assets/noImage.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import grayLazy from "../../assets/grayLazy.avif";
import { Skeleton, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import { openMovieItemDetials, openTvItemDetails, saveTvOrMovie } from "../../redux/features/huluSlice";
import { Save } from "../../redux/api/authApi";
import EastIcon from "@mui/icons-material/East";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export interface ILargeGenreCardProps {
  item: {
    [key: string]: any;
    id: number;
    poster_path: string;
  };
  loading: boolean;
}

export default function LargeGenreCard({ item, loading }: ILargeGenreCardProps) {
  const navigate = useNavigate();
  const dispatch = Dispatch();
  const { pathname } = useLocation();

  // Redux State
  const { user } = UseSelector((state) => state.auth);
  const { savedData } = UseSelector((state) => state.hulu);

  // Menu State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Save Movie  Object
  const itemData: Save = {
    item_id: item?.id,
    name: item?.type === "Tv" ? item?.name : item?.type === "Movie" ? item?.title : "",
    img: item?.poster_path,
    type: item?.type === "Tv" ? "Tv" : "Movie",
  };

  let copiedData = savedData?.slice();
  let movieFilter: any = copiedData?.filter((item) => item?.type === "Movie");
  const movieFind = movieFilter?.find((val: any) => val.name === item.title);
  const tvFilter = copiedData?.filter((item) => item?.type === "Tv");
  const tvFind = tvFilter?.find((val:any) => val.name === item?.name)

  //console.log(movieFind)

  return (
    <>
      {loading ? (
        <Skeleton variant="rectangular" className="w-auto h-[300px] my-5 mx-2" />
      ) : (
        <div className=" w-auto  h-auto flex flex-col group rounded-lg sm:hover:scale-105 sm:hover:border-4 sm:hover:border-gray-200 transition ease-in-out delay-100 duration-300 my-5 mx-2 ">
          {item?.poster_path === null ? (
            <LazyLoadImage src={noImage} alt="" className=" object-cover  h-[300px] w-auto  rounded-t-lg" effect="blur" placeholderSrc={grayLazy} />
          ) : (
            <LazyLoadImage
              src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
              alt=""
              className=" object-cover  h-auto w-auto  rounded-t-lg"
              effect="blur"
              placeholderSrc={grayLazy}
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
            />
          )}
          <div className="w-full h-auto text-white flex flex-col items-center justify-center z-10 bg-black/60 rounded-b-lg py-2 px-3">
            <h1 className="text-[14px] mb-3 font-medium">
              {item?.title ? (item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title) : item?.name.length > 20 ? item.name.slice(0, 20) : item.name}
            </h1>

            <div className="w-full flex items-center justify-between mb-1">
              <div className="flex w-auto items-center">
                <button
                  className="text-black bg-gray-200 rounded-full p-[5px] mr-3"
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
                  <ArrowForwardIcon className="" />
                </button>
                <h1>Details</h1>
              </div>

              <button onClick={handleClick}>
                <MoreVertIcon />
              </button>
            </div>
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
                if (item?.type === "Movie") {
                  handleClose();
                  dispatch(openMovieItemDetials(pathname));
                  navigate(`/movieDetails/${item?.id}`);
                } else if (item?.type === "Tv") {
                  handleClose();
                  dispatch(openTvItemDetails(pathname));
                  navigate(`/tvDetails/${item?.id}`);
                } else {
                  handleClose();
                  alert("This item is not a movie or tv mbile buttoin");
                }
              }}
              className="text-gray-300"
            >
              <EastIcon className="mr-2 text-[16px]" />
              Details
            </MenuItem>

            {/* Movie Add and Remove Button */}
            {user?.user &&
              item.type === "Movie" &&
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

              {/* Tv Add and Remove Button */}
              {user?.user &&
              item.type === "Tv" &&
              (tvFind?.name === item?.name && Number(tvFind?.item_id) === item.id ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    dispatch(saveTvOrMovie(itemData));
                  }}
                  className="text-gray-300"
                >
                  <RemoveIcon className="mr-2 text-[16px]" />
                  Remove Tv Show From My Stuff
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
                  Add Tv Show To My Stuff
                </MenuItem>
              ))}

          </Menu>
        </div>
      )}
    </>
  );
}

// https://images.unsplash.com/photo-1629654857396-dc8e37d6cc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2157&q=80
// 780 × 1170 px
