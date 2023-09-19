import * as React from "react";
import { useGetTvByIdQuery, useGetTvEpisodesBySeasonQuery } from "../../redux/api/tvApi";
import { Skeleton, Tooltip, Tabs, Tab, CircularProgress } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import EpisodeCard from "../cards/EpisodeCard";
import YouMayAlsoLikeTvCard from "../cards/YouMayAlsoLikeTvCard";
import { Dispatch, UseSelector } from "../../redux/store";
import { closeTvItemDetails, setHuluError } from "../../redux/features/huluSlice";
import { useNavigate, useParams } from "react-router-dom";
import { saveTvOrMovie } from "../../redux/features/huluSlice";
import { Save } from "../../redux/api/authApi";
import CheckIcon from "@mui/icons-material/Check";
import {  toast } from 'react-toastify';

export interface ITvDetailsProps {}

export default function TvDetails(props: ITvDetailsProps) {
  // Seasons State
  const [season, setSeason] = React.useState(1);
  const [show, setShow] = React.useState(false);

  // Params
  const { id } = useParams();

  // Redux State
  const [skip, setSkip] = React.useState(true);
  const { data: episodes, isFetching: episodesIsFetching, error: episodeError } = useGetTvEpisodesBySeasonQuery({ tvId: id, season_number: season }, { skip: skip });
  const { data, isFetching, error } = useGetTvByIdQuery(id);
  const { tvItemDetailsModal, location, saveLoading,savedData, savedError} = UseSelector((state) => state.hulu);
  const {user} = UseSelector(state => state.auth)
  const dispatch = Dispatch();
  const navigate = useNavigate();



  //! VERY IMPORTANT
  const tvFind = savedData?.find((val) => val.name === data?.name)



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
  const [value, setValue] = React.useState("episodes");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Ref for window scroll to 0,0
  const ref = React.useRef<any>(null);
  const executeScroll = () => ref?.current?.scrollTo(0, 0);

  // Save Tv Show Object
  const itemData:Save = {
    item_id: data?.id,
    name:data?.name,
    img: data?.poster_path,
    type: data?.name ? "Tv" : "Movie"
  }

  React.useEffect(() => {
    executeScroll();
    setValue("episodes");
    setSeason(1);
  }, [isFetching, data?.id]);

  React.useEffect(() => {
    if (data) {
      if (data?.number_of_seasons > 0) {
        setSkip(false);
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (!tvItemDetailsModal) {
      navigate("/TV");
    }
  }, [tvItemDetailsModal]); // eslint-disable-line

  React.useEffect(() => {
    if (error) {
      alert(error?.data?.status_message);
    }
    if (episodeError) {
      alert(episodeError?.data?.status_message);
    }
    if(savedError){
      toast.error(savedError)
    }
  }, [error, episodeError,savedError]);
  React.useEffect(()=>{
    dispatch(setHuluError())
  },[])// eslint-disable-line

 


  return (
    <div className={`w-full ${tvItemDetailsModal ? "h-auto" : "h-[500px] flex flex-col bodyBg"}`}>
      {/* Modal */}
      <div className={`${tvItemDetailsModal ? "block" : "hidden"} fixed z-10 left-0 top-0 w-full h-full  prac flex justify-center`}>
        {/* Content */}
        <div className="lg:w-[90%] w-full h-full bg-white border border-black lg:mt-[20px] relative overflow-y-auto no-scrollbar" onScroll={scrollEvent} ref={ref}>
          <nav
            className={`lg:w-[89.9%] w-full h-[70px] fixed lg:top-[21px] top-0 flex items-center justify-center  ${changeScroll ? "navbarBg " : " bg-transparent md:border-b border-gray-50/10"}  z-10`}
          >
            <span></span>

            {!isFetching && <h1 className={`${changeScroll ? "text-white font-medium" : "text-white font-bold underline md:bg-black/20 "}  sm:text-[19px] text-[14px] rounded-md p-2`}>{data?.name}</h1>}

            <button
              className={`${changeScroll ? "text-white" : " text-white bg-black/30 mr-1"} absolute right-0 rounded-md p-2`}
              onClick={() => {
                navigate(`${location}`);
                dispatch(closeTvItemDetails());
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
                  <h1 className="pl-2 mb-2">{data?.name}</h1>

                  {/* About Movie/Tv */}
                  <h1 className="text-[14px] font-medium pl-2 mb-2">{data?.overview ? (data?.overview.length >= 300 ? data?.overview?.slice(0, 300) + "..." : data?.overview) : "N/A"}</h1>

                  {/* Rating */}
                  <div className="flex items-center pl-2">
                    {data?.genres?.length ? (
                      data?.genres?.map((item: any, index: any) =>
                        index === 0 ? (
                          <h1 key={index} className="mr-1  text-[12px] font-medium">
                            {item?.name}
                          </h1>
                        ) : (
                          <h1 key={index} className="mr-1  text-[12px] font-medium">
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

                    {data?.number_of_seasons > 0 ? <h1 className="mr-6">Start Watching: S1 E1</h1> : <></>}

                    {user?.user ? (
                      tvFind?.name === data?.name && Number(tvFind?.item_id) === data?.id ? (
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
              <div className=" md:hidden flex w-full h-auto flex-col bodyBg justify-center items-center px-5 mt-3 text-gray-100 mb-6">
                {/* Title/Name */}
                <h1 className=" my-2 mb-4 underline text-[18px] text-gray-100">{data?.name}</h1>

                {/* About Movie/Tv */}
                <h1 className="text-[14px] font-medium w-[85%] mb-2 text-gray-100">
                  {data?.overview ? (data?.overview?.length >= 370 ? data?.overview?.slice(0, 370) + "..." : data?.overview) : "N/A"}
                </h1>

                {/* Rating */}
                <div className="flex items-center pl-2">
                  {data?.genres?.map((item: any, index: any) =>
                    index === 0 ? (
                      <h1 key={index} className="mr-1 text-[11px]">
                        {item?.name}
                      </h1>
                    ) : (
                      <h1 key={index} className="mr-1 text-[11px]">
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

                  {data?.number_of_seasons > 0 ? <h1 className="mr-6">Start Watching: S1 E1</h1> : <></>}

                  {user?.user ? (
                      tvFind?.name === data?.name && Number(tvFind?.item_id) === data?.id ? (
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

            {/*  Tabs */}
            <div className="w-full h-auto bodyBg px-8 pt-4  pb-5 mt-3">
              {isFetching ? (
                <Skeleton variant="rectangular" className="h-[40px] w-full" />
              ) : (
                <Tabs value={value} onChange={handleChange} aria-label="secondary tabs example" variant="scrollable">
                  <Tab value="episodes" className="text-gray-300 sm:text-base text-[12px]" label="Episodes" />
                  <Tab value="also" className="text-gray-300 sm:text-base text-[12px]" label="You May Also Like" />
                  <Tab value="details" className="text-gray-300 sm:text-base text-[12px]" label="Details" />
                </Tabs>
              )}
            </div>

            {/*  Episodes By Season */}
            {value === "episodes" && (
              <div className="w-full flex flex-col  px-8 py-6  min-h-[400px]">
                <div className="w-full h-auto flex flex-col relative">
                  {/* Season Box */}
                  <div className={`sm:w-[250px] w-full  p-4 border border-gray-200  rounded-lg flex justify-between ${show ? "seasonShadow" : ""}`}>
                    <h1 className="text-gray-200 cursor-pointer" onClick={() => setShow((item) => !item)}>
                      Season {season}
                    </h1>
                    {show ? (
                      <ArrowDropUpIcon onClick={() => setShow((item) => !item)} className="text-gray-200" />
                    ) : (
                      <ArrowDropDownIcon onClick={() => setShow((item) => !item)} className="text-gray-200" />
                    )}

                    {show && (
                      <div className="sm:w-[250px] w-full left-0 top-[57px]  absolute h-auto  rounded-lg bg-neutral-800 transition ease-in-out delay-150 duration-300 z-10">
                        {/* Content */}
                        <ul className="w-full max-h-[400px] flex flex-col overflow-y-auto rounded-lg">
                          {data?.number_of_seasons > 0 ? (
                            Array.from(Array(data?.number_of_seasons).keys()).map((item: any, index: any) => (
                              <li
                                key={index}
                                className={`h-[40px] flex items-center px-4 py-6 hover:bg-gray-600/20 transition ease-in-out delay-150 duration-300 text-gray-200 cursor-pointer ${
                                  season === index + 1 && "underline font-bold bg-gray-600/20"
                                }`}
                                onClick={() => {
                                  setShow(false);
                                  setSeason(index + 1);
                                }}
                              >
                                {index + 1}
                              </li>
                            ))
                          ) : (
                            <li className="h-[40px] flex items-center px-4 py-6 hover:bg-gray-600/20 transition ease-in-out delay-150 duration-300 text-gray-200" onClick={() => setShow(false)}>
                              No Seasons
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Data Episodes */}
                  {episodes && (
                    <div className="w-full h-auto flex items-center justify-center">
                      <div className="w-full h-auto grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 mt-10">
                        {episodes?.length <= 0 ? 
                        (
                          
                            <div className="text-gray-200 px-10 py-5">New Epiosdes Coming Soon!</div>
                        
                        )
                        :
                        (
                          episodes?.map((item: any, index: any) => (
                            <EpisodeCard item={item} key={index} loading={episodesIsFetching} />
                          ))
                        )
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Data For Similar Movies */}
            {value === "also" && (
              <div className="w-full flex justify-center items-center  px-3 py-6  ">
                {data?.recommendations?.results.length > 0 ? (
                  <div className="w-full h-auto grid justify-center items-center 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-4  gap-2">
                    {data?.recommendations?.results?.slice(0, 10).map((item: any, index: any) => (
                      <YouMayAlsoLikeTvCard item={item} key={index} loading={isFetching} />
                    ))}
                  </div>
                ) : (
                  <h1 className="text-gray-200 pt-10 pb-[100px]">Sorry, there are no similar tv shows</h1>
                )}
              </div>
            )}

            {value === "details" && (
              <div className="w-full min-h-[200px] bodyBg flex flex-col px-10 pt-6 pb-[60px]">
                <h1 className="text-white font-semibold mb-4">About This Show</h1>

                <h1 className="text-white mb-3 sm:text-[20px] ">{data?.name}</h1>

                <h1 className="text-gray-400 mb-3 md:w-[80%] w-full sm:text-base text-[13px]">{data?.overview}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
