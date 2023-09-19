import * as React from "react";
import { useGetMovieByIdQuery } from "../../redux/api/movieApi";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress, Skeleton, Tooltip } from "@mui/material";
import { Tabs, Tab } from "@mui/material";

import { Dispatch, UseSelector } from "../../redux/store";
import { closeMovieItemDetails, setHuluError } from "../../redux/features/huluSlice";
import { useNavigate, useParams } from "react-router-dom";
import YouMayAlsoLikeCard from "../cards/YouMayAlsoLikeCard";
import { Save } from "../../redux/api/authApi";
import { saveTvOrMovie } from "../../redux/features/huluSlice";
import CheckIcon from "@mui/icons-material/Check";
import {  toast } from 'react-toastify';


export interface IMovieDetailsProps {}

export default function MovieDetails(props: IMovieDetailsProps) {
  // Redux State
  const { movieItemDetailsModal, location, savedError, saveLoading, savedData } = UseSelector((state) => state.hulu);
  const { user } = UseSelector((state) => state.auth);
  const dispatch = Dispatch();
  const navigate = useNavigate();

  //console.log(savedData);

  // Params
  const { id } = useParams();

  // Data
  const { data, isFetching, error } = useGetMovieByIdQuery(id);
  //console.log(data);

  //! VERY IMPORT
  const movieFind = savedData?.find((val) => val.name === data?.title);
  //console.log(movieFind);

  // Navbar Event Listener
  const [changeScroll, setChangeScroll] = React.useState(false);
  function scrollEvent(e: any) {
    const target = e.target as HTMLTextAreaElement;
    if (target.scrollTop > 20) {
      setChangeScroll(true);
    } else {
      setChangeScroll(false);
    }
  }

  // Tab Values
  const [value, setValue] = React.useState("also");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Ref for window scroll to 0,0
  const ref = React.useRef<any>(null);
  const executeScroll = () => ref?.current?.scrollTo(0, 0);

  // Save Moive  Object
  const itemData: Save = {
    item_id: data?.id,
    name: data?.title,
    img: data?.poster_path,
    type: data?.name ? "Tv" : "Movie",
  };

  React.useEffect(() => {
    executeScroll();
    setValue("also");
  }, [isFetching, data?.id]);
  React.useEffect(() => {
    if (error) {
      alert(error?.data?.status_message);
    }
    if(savedError){
      toast.error(savedError)
    }
  }, [error,savedError]);
  React.useEffect(() => {
    if (!movieItemDetailsModal) {
      navigate("/Home");
    }
  }, [movieItemDetailsModal]); // eslint-disable-line
  React.useEffect(()=>{
    dispatch(setHuluError())
  },[])// eslint-disable-line

  return (
    <div className={`w-full ${movieItemDetailsModal ? "h-auto" : "h-[500px]"} flex flex-col bodyBg`}>
      {/* Modal */}
      <div className={`${movieItemDetailsModal ? "block" : "hidden"} fixed z-10 left-0 top-0 w-full h-full  prac flex justify-center`}>
        {/* Content */}
        <div className="lg:w-[90%] w-full h-full bg-white border border-black lg:mt-[20px] relative overflow-y-auto no-scrollbar" onScroll={scrollEvent} ref={ref}>
          <nav
            className={`lg:w-[89.9%] w-full h-[70px] fixed lg:top-[21px] top-0 flex items-center justify-center  ${changeScroll ? "navbarBg " : " bg-transparent md:border-b border-gray-50/10"}  z-10`}
          >
            <span></span>

            {!isFetching && <h1 className={`${changeScroll ? "text-white font-medium" : "text-white font-bold underline md:bg-black/20 "}  text-[19px] rounded-md p-2`}>{data?.title}</h1>}

            <button
              className={`${changeScroll ? "text-white" : " text-white bg-black/30 mr-1"} absolute right-0 rounded-md p-2`}
              onClick={() => {
                navigate(`${location}`);
                dispatch(closeMovieItemDetails());
              }}
            >
              <CloseIcon className="text-[35px] font-bold" />
            </button>
          </nav>

          <div className=" flex flex-col w-full h-auto bodyBg">
            {/* Image Box Relative */}
            <div className="w-full h-auto  relative">
              {/* Gradient Overlay */}
              {!isFetching && <div className=" w-full h-full  absolute top-0 left-0 gradient gradient2"></div>}
              {/* Image */}
              {isFetching ? (
                <Skeleton variant="rectangular" className="w-full lg:h-[600px] h-[400px]" />
              ) : (
                <img src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`} alt="" className=" w-full max-h-[800px] object-cover" loading="lazy" />
              )}

              {/* Movie/Tv Detials Absolute */}
              {!isFetching && (
                <div className=" absolute left-10 bottom-[100px]  md:flex hidden flex-col  md:max-w-[40%] h-auto text-white">
                  {/* Title/Name */}
                  <h1 className="pl-2 mb-2">{data?.title}</h1>

                  {/* About Movie/Tv */}
                  <h1 className="text-[14px] font-medium pl-2 mb-2">{data?.overview ? data?.overview : "N/A"}</h1>

                  {/* Rating */}
                  <div className="flex items-center pl-2">
                    {data?.genres?.length ? (
                      data?.genres?.map((item: any, index: any) =>
                        index === 0 ? (
                          <h1 key={index} className="mr-1">
                            {item?.name}
                          </h1>
                        ) : (
                          <h1 key={index} className="mr-1">
                            • {item?.name}
                          </h1>
                        )
                      )
                    ) : (
                      <h1>N/A</h1>
                    )}
                  </div>

                  {/* Play Btn */}
                  <div className="w-full h-auto flex items-center mt-5">
                    <Tooltip title="Currenlty Unavailable" placement="top">
                      <PlayCircleIcon className="text-[65px] cursor-pointer mr-1 hover:text-gray-200/60 transition ease-in-out delay-150 duration-300" />
                    </Tooltip>

                    <h1 className="mr-6">Watch Movie</h1>

                    {user?.user ? (
                      movieFind?.name === data?.title && Number(movieFind?.item_id) === data?.id ? (
                        saveLoading ? (
                          <CircularProgress color="success"/>
                        ) : (
                          <Tooltip title="Remove From My Stuff" placement="top">
                            <button className="p-1 rounded-full border bg-white border-white" onClick={() => dispatch(saveTvOrMovie(itemData))}>
                              <CheckIcon className="text-black" />
                            </button>
                          </Tooltip>
                        )
                      ) : (
                        saveLoading ? (
                          <CircularProgress color="success"/>
                        ) : (
                          <Tooltip title="Add To My Stuff" placement="top">
                            <button className="p-1 rounded-full border  border-white" onClick={() => dispatch(saveTvOrMovie(itemData))}>
                              <AddIcon  />
                            </button>
                          </Tooltip>
                        )
                      )
                    ) : (
                      <Tooltip title="You Need To Be Logged In To Save" placement="top">
                        <button className="p-1 rounded-full border border-white">
                          <AddIcon />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Movie Details */}
            {!isFetching && (
              <div className=" md:hidden flex w-full h-auto flex-col bodyBg justify-center items-center px-5 mt-3 text-gray-100">
                {/* Title/Name */}
                <h1 className=" my-2 mb-4 underline text-[18px] text-gray-100">{data?.title}</h1>

                {/* About Movie/Tv */}
                <h1 className="text-[14px] font-medium w-[85%] mb-2 text-gray-100">{data?.overview}</h1>

                {/* Rating */}
                <div className="flex items-center pl-2">
                  {data?.genres?.map((item: any, index: any) =>
                    index === 0 ? (
                      <h1 key={index} className="mr-1 text-[12px]">
                        {item?.name}
                      </h1>
                    ) : (
                      <h1 key={index} className="mr-1 text-[12px]">
                        • {item?.name}
                      </h1>
                    )
                  )}
                </div>

                {/* Play Btn */}
                <div className="w-full h-auto flex items-center justify-center mt-5">
                  <Tooltip title="Currenlty Unavailable" placement="top">
                    <PlayCircleIcon className="text-[65px] cursor-pointer mr-1 hover:text-gray-200/60 transition ease-in-out delay-150 duration-300" />
                  </Tooltip>

                  <h1 className="mr-6">Watch Movie</h1>

                  {user?.user ? (
                      movieFind?.name === data?.title && Number(movieFind?.item_id) === data?.id ? (
                        saveLoading ? (
                          <CircularProgress color="success"/>
                        ) : (
                          <Tooltip title="Remove From My Stuff" placement="top">
                            <button className="p-1 rounded-full border bg-white border-white" onClick={() => dispatch(saveTvOrMovie(itemData))}>
                              <CheckIcon className="text-black" />
                            </button>
                          </Tooltip>
                        )
                      ) : (
                        saveLoading ? (
                          <CircularProgress color="success"/>
                        ) : (
                          <Tooltip title="Add To My Stuff" placement="top">
                            <button className="p-1 rounded-full border  border-white" onClick={() => dispatch(saveTvOrMovie(itemData))}>
                              <AddIcon  />
                            </button>
                          </Tooltip>
                        )
                      )
                    ) : (
                      <Tooltip title="You Need To Be Logged In To Save" placement="top">
                        <button className="p-1 rounded-full border border-white">
                          <AddIcon />
                        </button>
                      </Tooltip>
                    )}
                </div>
              </div>
            )}
            <hr className="border-gray-200 mt-7" />

            {/* Actors and Director */}
            <div className="w-full flex items-center bodyBg border-b border-gray-200 px-5 py-7 text-white">
              {isFetching ? (
                <Skeleton variant="rectangular" className="w-full h-[40px]" />
              ) : (
                <h1
                  className="mr-5 flex items-center"
                  onClick={() => {
                    ref?.current?.scrollTo(0, 0);
                  }}
                >
                  <span className="font-medium mr-1 sm:text-base text-[14px]">Staring:</span>
                  {data?.credits?.cast?.length >= 2 ? (
                    data?.credits?.cast?.slice(0, 2).map((item: any, index: any) =>
                      index === 0 ? (
                        <span className="mr-1 sm:text-base text-[12px]" key={index}>
                          {item?.original_name},
                        </span>
                      ) : (
                        <span className="mr-1 sm:text-base text-[12px]" key={index}>
                          {item?.original_name}
                        </span>
                      )
                    )
                  ) : (
                    <span className="sm:text-base text-[12px]">N/A</span>
                  )}
                </h1>
              )}
            </div>

            {/* You May Also Like Tabs */}
            <div className="w-full h-auto bodyBg px-3 pt-4  pb-5">
              {isFetching ? (
                <Skeleton variant="rectangular" className="h-[40px] w-full" />
              ) : (
                <Tabs value={value} onChange={handleChange} aria-label="secondary tabs example">
                  <Tab value="also" className="text-gray-300" label="You May Also Like" />
                  <Tab value="details" className="text-gray-300" label="Details" />
                </Tabs>
              )}
            </div>

            {/* Data For Similar Movies */}
            {value === "also" && (
              <div className="w-full flex justify-center items-center  px-3 py-6  ">
                {data?.recommendations?.results?.length > 0 ? (
                  <div className="w-full h-auto grid justify-center items-center 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-4  gap-2">
                    {data?.recommendations?.results?.slice(0, 10).map((item: any, index: any) => (
                      <YouMayAlsoLikeCard item={item} key={index} loading={isFetching} />
                    ))}
                  </div>
                ) : (
                  <h1 className="text-gray-200 py-10">Sorry, there are no similar movies</h1>
                )}
              </div>
            )}

            {value === "details" && (
              <div className="w-full min-h-[200px] bodyBg flex flex-col px-5 pt-6 pb-[60px]">
                <h1 className="text-white font-semibold mb-4">About This Movie</h1>

                <h1 className="text-white mb-3 text-[20px]">{data?.title}</h1>

                <h1 className="text-gray-400 mb-3 md:w-[80%] w-full">{data?.overview ? data?.overview : "N/A"}</h1>

                <div className="flex items-center text-gray-300">
                  {data?.genres?.length ? (
                    data?.genres?.map((item: any, index: any) =>
                      index === 0 ? (
                        <h1 key={index} className="mr-1">
                          {item?.name}
                        </h1>
                      ) : (
                        <h1 key={index} className="mr-1">
                          • {item?.name}
                        </h1>
                      )
                    )
                  ) : (
                    <h1>N/A</h1>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
