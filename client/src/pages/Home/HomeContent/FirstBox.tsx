import * as React from "react";
import { useGetTvByIdQuery } from "../../../redux/api/tvApi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip, Menu, MenuItem, IconButton, Skeleton } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import { Dispatch } from "../../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { openTvItemDetails } from "../../../redux/features/huluSlice";

 function FirstBox() {
  const { data, isFetching, error } = useGetTvByIdQuery(1429);
  const dispatch = Dispatch()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  

  // Menu State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(()=>{
    if(error){
      alert(error)
    }
  },[error])
  
  return (
    isFetching ? 
    (
      <Skeleton variant="rectangular" className="md:max-h-[700px] h-[650px] w-full bg-gray-400 mb-5"/>
    ) 
    : 
    (
      <div className="w-full h-auto flex flex-col mb-5">
      {/* Content */}
      <div className="w-full h-auto flex">
        <div className="relative  w-full h-auto ">
          <img
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt=""
            className="imgShadow brightness-50 hue-rotate-15 object-cover w-[100%] md:max-h-[700px] h-[650px]"
          />

          {/* Desktop Content */}
          <div className="w-auto px-5 py-2 h-auto  absolute  md:bottom-[120px] md:left-10 md:flex hidden  flex-col firstBox">
            {/* Title */}
            <h1 className="text-white mb-3">BASED ON MY FAVORITE ANIME</h1>

            {/* Show Title */}
            <div className="w-auto flex flex-col h-auto text-white mb-2">
              <h1 className="flex text-sm">Crunchyroll</h1>
              <h1 className="text-[20px] font-semibold flex ">{data?.name}</h1>
            </div>

            {/* Seasons */}
            <div className="w-full flex items-center text-white mb-2">
              <h1>Seasons {data?.number_of_seasons}</h1>
            </div>

            {/* Genre */}
            <div className="w-full flex items-center text-gray-400 mb-2">
              {data?.genres?.map((item: any, index: any) =>
                index === 0 ? (
                  <h1 key={index} className="mr-[4px]">
                    {item.name}
                  </h1>
                ) : (
                  <h1 key={index} className="mr-[4px]">
                    {" "}
                    • {item.name}
                  </h1>
                )
              )}
            </div>

            <div className="w-full flex items-center mb-2">
              {/* Play Btn */}
              <Tooltip title="Currently Unavailable">
                <button className="px-6 py-4 bg-gray-300/20 text-white rounded-lg mr-8 transition ease-in-out delay-150 duration-250 hover:bg-gray-300/10">
                  <PlayArrowIcon className="text-[20px] " /> Play
                </button>
              </Tooltip>
              {/* Details */}
              <button className="px-6 py-4 bg-inherit border border-white text-white rounded-lg mr-2 transition ease-in-out delay-150 duration-250 hover:border-gray-500 hover:text-gray-500" onClick={()=>{
                dispatch(openTvItemDetails(pathname))
                navigate(`/tvDetails/${data?.id}`)
              }}>
                Details
              </button>
              <IconButton onClick={(e) => handleClick(e)}>
                <MoreVertIcon className="text-white text-[30px] cursor-pointer" />
              </IconButton>

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
                <MenuItem onClick={()=>{
                  handleClose()
                  dispatch(openTvItemDetails(pathname))
                  navigate(`/tvDetails/${data?.id}`)
                }} className="text-gray-300">
                  <EastIcon className="mr-2 text-[16px]"/>
                  Details
                </MenuItem>
                
                
              </Menu>
            </div>
          </div>

          {/* ------------------------------------------------------- */}

          {/* Mobile Content */}
          <div className="min-w-[390px] px-5 py-2 h-auto  absolute  mobileFirstBox  md:hidden flex flex-col mobileFirstBox2 items-center justify-center">
            {/* Title */}
            <h1 className="text-white mb-3">BASED ON MY FAVORITE ANIME</h1>

            {/* Show Title */}
            <div className="w-auto flex flex-col items-center justify-center h-auto text-white mb-2">
              <h1 className="flex text-sm">Crunchyroll</h1>
              <h1 className="text-[20px] font-semibold flex ">{data?.name}</h1>
            </div>

            {/* Seasons */}
            <div className="w-full flex justify-center items-center text-white mb-2">
              <h1>Seasons {data?.number_of_seasons}</h1>
            </div>

            {/* Genre */}
            <div className="w-full flex flex-col items-center justify-center text-gray-400 mb-2">
              {data?.genres?.map((item: any, index: any) =>
                <h1 key={index} className="my-1">{item?.name}</h1>
              )}
            </div>

            <div className="w-full flex justify-center items-center mb-2">
              {/* Play Btn */}
              <Tooltip title="Currently Unavailable">
                <button className="px-6 py-4 bg-gray-300/20 text-white rounded-lg mr-4 transition ease-in-out delay-150 duration-250 hover:bg-gray-300/10">
                  <PlayArrowIcon className="text-[20px] " /> Play
                </button>
              </Tooltip>
              {/* Details */}
              <button className="px-6 py-4 bg-inherit border border-white text-white rounded-lg mr-1 transition ease-in-out delay-150 duration-250 hover:border-gray-500 hover:text-gray-500" onClick={()=>{
                dispatch(openTvItemDetails(pathname))
                navigate(`/tvDetails/${data?.id}`)
              }}>
                Details
              </button>
              <IconButton onClick={(e) => handleClick(e)} className="">
                <MoreVertIcon className="text-white text-[30px] cursor-pointer" />
              </IconButton>

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
                <MenuItem onClick={()=>{
                  handleClose()
                  dispatch(openTvItemDetails(pathname))
                  navigate(`/tvDetails/${data?.id}`)
                }} className="text-gray-300">
                  <EastIcon className="mr-2 text-[16px]"/>
                  Details
                </MenuItem>
                
                
              </Menu>
            </div>
          </div>


        </div>
      </div>
    </div>
    )
  );
}
export default React.memo(FirstBox)

// https://image.tmdb.org/t/p/w500/${item?.poster_path}
// https://image.tmdb.org/t/p/original/bvYjhsbxOBwpm8xLE5BhdA3a8CZ.jpg
