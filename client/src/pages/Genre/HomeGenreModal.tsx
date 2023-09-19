import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import {  Modal } from "@mui/material";
import { closeGenreModal, setSelectedGenre } from "../../redux/features/huluSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {  useGetTvByHighVoteCountQuery, useGetTvByOneGenreQuery } from "../../redux/api/tvApi";
import { useGetHighGrossingMovieByYearAndGenreQuery, useGetMovieByOneGenreQuery } from "../../redux/api/movieApi";
import LargeGenreSlider from "../../components/HomeSlider/LargeGenreSlider";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

export interface IHomeGenreModalProps {}

export default function HomeGenreModal(props: IHomeGenreModalProps) {
  const { openGenreModal, selectedGenre } = UseSelector((state) => state.hulu);
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = React.useState(true);
  const date = new Date().getFullYear();

  // Page State
  const [PopularMovie, setPopularMovie] = React.useState(1)
  const [PopularTv, setPopularTv] = React.useState(1)

  //console.log(selectedGenre)

  // Popular API Data
  const {
    data: popularMovieByGenreData,
    isFetching: popularMovieByGenreLoading,
    error: popularMovieByGenreError,
  } = useGetMovieByOneGenreQuery({genre:selectedGenre?.movieId,page:PopularMovie}, { skip });
  const {
    data: popularTvByGenreData,
    isFetching: popularTvByGenreLoading,
    error: popularTvByGenreError,
  } = useGetTvByOneGenreQuery({genre:selectedGenre?.tvId,page:PopularTv}, { skip });

  // Highest Grossing Movies
  const {
    data: highGrossData,
    isFetching: highGrossLoading,
    error: highGrossError,
  } = useGetHighGrossingMovieByYearAndGenreQuery({ year: date, genre: selectedGenre?.movieId }, { skip });

  // Get Tv By Votes
  const { data: highVotesData, isFetching: highVotesLoading, error: highVotesError } = useGetTvByHighVoteCountQuery(selectedGenre?.tvId, { skip });



  React.useEffect(() => {
    if (selectedGenre?.tvId && selectedGenre?.movieId) {
      setSkip(false);
    }
  }, [selectedGenre?.movieId, selectedGenre?.tvId]);

  React.useEffect(() => {
    if (popularMovieByGenreError) {
      alert(popularMovieByGenreError?.data?.status_message);
    }
    if (popularTvByGenreError) {
      alert(popularTvByGenreError?.data?.status_message);
    }
    if (highGrossError) {
      alert(highGrossError?.data?.status_message);
    }
    if (highVotesError) {
      alert(highVotesError?.data?.status_message);
    }
    
  }, [
    popularMovieByGenreError,
    popularTvByGenreError,
    highGrossError,
    highVotesError
  ]);

  React.useEffect(()=>{
    if(!openGenreModal){
      navigate("/Home")
    }
  },[openGenreModal]) // eslint-disable-line

  




  return (
    <>
      {/* Modal */}
      <Modal
        open={openGenreModal}
        onClose={() => {
          dispatch(closeGenreModal());
          dispatch(setSelectedGenre());
          navigate(-1);
          window.scrollTo(0, 0);
          setSkip(true);
        }}
      >
        <div className="w-full bodyBg h-full ">
          {/* Desktop Content */}
          <div className="w-full h-full flex flex-col">
            {/* Navbar */}
            <nav className="w-full h-[70px] fixed  top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md flex items-center justify-between px-2">
              <span></span>

              <h1 className="text-gray-200 font-medium">{selectedGenre?.genre}</h1>

              <button
                className="text-gray-200"
                onClick={() => {
                  dispatch(closeGenreModal());
                  dispatch(setSelectedGenre());
                  navigate(-1);
                  window.scrollTo(0, 0);
                  setSkip(true);
                }}
              >
                <CloseIcon className="text-[30px]" />
              </button>
            </nav>

            <div className="h-auto w-full mt-[70px] md:p-10 p-5 overflow-y-auto no-scrollbar">
              {/* High Grossing Movies */}
              <LargeGenreSlider
                data={highGrossData?.results.slice(0,8)}
                loading={highGrossLoading}
                title={`This Year's Higgest Grossing ${selectedGenre?.genre} Movies`}
              />

              {/* High Votes Tv */}
              <LargeGenreSlider data={highVotesData?.results} loading={highVotesLoading} title={`Highly Voted ${selectedGenre?.genre} Tv `} />

              {/* Popular Movies */}
              <HomeSlider
                data={popularMovieByGenreData}
                loading={popularMovieByGenreLoading}
                title={`Popular ${selectedGenre?.genre} Movies`}
                moreTitle="View All"
                pageState={PopularMovie} setPageState={setPopularMovie}
              />

              {/* Popular Tv */}
              <HomeSlider
                data={popularTvByGenreData}
                loading={popularTvByGenreLoading}
                title={`Popular ${selectedGenre?.genre} Tv`}
                moreTitle="View All"
                pageState={PopularTv} setPageState={setPopularTv}
              />
            </div>
          </div>
        </div>
      </Modal>

      {!openGenreModal && <div className="w-full h-screen bodyBg" ></div>}
    </>
  );
}

// sm:absolute sm:translate-x-[-50%] sm:translate-y-[-50%] sm:top-[50%] sm:left-[50%] sm:w-[85%] bodyBg sm:h-auto h-full
