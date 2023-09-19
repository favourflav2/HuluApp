import * as React from "react";
import FirstBox from "./HomeContent/FirstBox";
import { useGetTrendingTvQuery, useGetTvByOneGenreQuery } from "../../redux/api/tvApi";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import { useGetMovieByOneGenreQuery, useGetTrendingMovieQuery } from "../../redux/api/movieApi";
import SecondBox from "./HomeContent/SecondBox";
import ThirdBox from "./HomeContent/ThirdBox";
import GenreSlider from "../../components/HomeSlider/GenreSlider";
import { Dispatch, UseSelector } from "../../redux/store";
import { getAllStuff } from "../../redux/features/huluSlice";
import { CircularProgress } from "@mui/material";

// Going to add padding to each indivdual box
//* px-10 py-3

export default function Home() {
  // Page States
  //* Trending Page State
  const [trendingTvPageState, setTrendingTvPageState] = React.useState(1);
  const [trendingMoviePageState, setTrendingMoviePageState] = React.useState(1);

  //* Movie Page State
  const [movieDramaPageState, setMovieDramaPageState] = React.useState(1);
  const [movieComedyPageState, setMovieComedyPageState] = React.useState(1);
  const [movieRomancePageState, setMovieRomancePageState] = React.useState(1);
  const [movieCrimePageState, setMovieCrimePageState] = React.useState(1);

  //* Tv Page State
  const [tvDramaPageState, setTvDramaPageState] = React.useState(1);
  const [tvActionPageState, setTvActionPageState] = React.useState(1);
  const [tvAnimationPageState, setTvAnimationPageState] = React.useState(1);
  const [tvKidsPageState, setTvKidsPageState] = React.useState(1);
  const [tvWarPageState, setTvWarPageState] = React.useState(1);

  // Redux State
  const { user } = UseSelector((state) => state.auth);
  const { savedData, saveLoading } = UseSelector((state) => state.hulu);
  const dispatch = Dispatch();

  // Trending API Data
  const { data: trendingData, isFetching: trendingLoading, error: trendingError } = useGetTrendingTvQuery(trendingTvPageState);
  const { data: movieTrending, isFetching: movieLoading, error: movieError } = useGetTrendingMovieQuery(trendingMoviePageState);

  // Movie Genre API Data
  //* Drama
  const { data: movieDrama, isFetching: movieDramaLoading, error: movieDramaError } = useGetMovieByOneGenreQuery({ genre: 18, page: movieDramaPageState });
  //* Comedy
  const { data: movieComedy, isFetching: movieComedyLoading, error: movieComedyError } = useGetMovieByOneGenreQuery({ genre: 35, page: movieComedyPageState });
  //* Romance
  const { data: movieRomance, isFetching: movieRomanceLoading, error: movieRomanceError } = useGetMovieByOneGenreQuery({ genre: 10749, page: movieRomancePageState });
  //* Crime
  const { data: movieCrime, isFetching: movieCrimeLoading, error: movieCrimeError } = useGetMovieByOneGenreQuery({ genre: 80, page: movieCrimePageState });

  // Tv Genre API Data
  //* Drama
  const { data: tvDrama, isFetching: tvDramaLoading, error: tvDramaError } = useGetTvByOneGenreQuery({ genre: 18, page: tvDramaPageState });
  //* Action
  const { data: tvAction, isFetching: tvActionLoading, error: tvActionError } = useGetTvByOneGenreQuery({ genre: 10759, page: tvActionPageState });
  //* Animation
  const { data: tvAnimation, isFetching: tvAnimationLoading, error: tvAnimationError } = useGetTvByOneGenreQuery({ genre: 16, page: tvAnimationPageState });
  //* Kids
  const { data: tvKids, isFetching: tvKidsLoading, error: tvKidsError } = useGetTvByOneGenreQuery({ genre: 10762, page: tvKidsPageState });
  //* War
  const { data: tvWar, isFetching: tvWarLoading, error: tvWarError } = useGetTvByOneGenreQuery({ genre: 10768, page: tvWarPageState });

  React.useEffect(() => {
    if (trendingError) {
      alert(trendingError?.data?.status_message);
    }
    if (movieError) {
      alert(movieError?.data?.status_message);
    }
    if (movieDramaError) {
      alert(movieDramaError?.data?.status_message);
    }
    if (movieComedyError) {
      alert(movieComedyError?.data?.status_message);
    }
    if (tvActionError) {
      alert(tvActionError?.data?.status_message);
    }
    if (tvDramaError) {
      alert(tvDramaError.data?.status_message);
    }
    if (movieRomanceError) {
      alert(movieRomanceError?.data?.status_message);
    }
    if (movieCrimeError) {
      alert(movieCrimeError?.data?.status_message);
    }
    if (tvAnimationError) {
      alert(tvAnimationError?.data?.status_message);
    }
    if (tvKidsError) {
      alert(tvKidsError?.data?.status_message);
    }
    if (tvWarError) {
      alert(tvWarError?.data?.status_message);
    }
  }, [trendingError, movieError, movieDramaError, movieComedyError, tvDramaError, tvActionError, movieRomanceError, tvAnimationError, tvWarError, tvKidsError, movieCrimeError]);

  //* On intial page load when a user logs we are going to get all the users saved shows and movies... only if the saved data array is empty and a user is logged in
  React.useEffect(() => {
    if (user?.user) {
      if (savedData?.length <= 0) {
        dispatch(getAllStuff());
        //console.log("Fetched saved data from backend since a user logged in and saved data array is empty");
      }
    }
  }, []); // eslint-disable-line

  React.useEffect(()=>{
    window.scrollTo(0, 0)
  },[])

  

  if (saveLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bodyBg">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bodyBg">
      {/* Content */}
      <div className="w-full h-full flex flex-col pb-[150px]">
        <FirstBox />

        {/* Trending Tv */}
        <HomeSlider title="Trending Tv" moreTitle="MORE TRENDING TV" data={trendingData} loading={trendingLoading} pageState={trendingTvPageState} setPageState={setTrendingTvPageState} />

        {/* Trending Movie */}
        <HomeSlider title="Trending Movies" moreTitle="MORE TRENDING MOVIES" data={movieTrending} loading={movieLoading} pageState={trendingMoviePageState} setPageState={setTrendingMoviePageState} />

        {/* Drama Movie */}
        <HomeSlider title="Drama Movies" moreTitle="MORE DRAMA MOVIES" data={movieDrama} loading={movieDramaLoading} pageState={movieDramaPageState} setPageState={setMovieDramaPageState} />

        <SecondBox />

        {/* Comedy Movie */}
        <HomeSlider title="Comedy Movies" moreTitle="MORE COMEDY MOVIES" data={movieComedy} loading={movieComedyLoading} pageState={movieComedyPageState} setPageState={setMovieComedyPageState} />

        {/* Drama Tv */}
        <HomeSlider title="Drama Tv" moreTitle="MORE DRAMA TV" data={tvDrama} loading={tvDramaLoading} pageState={tvDramaPageState} setPageState={setTvDramaPageState} />

        {/* Action Tv */}
        <HomeSlider title="Action Tv" moreTitle="MORE ACTION TV" data={tvAction} loading={tvActionLoading} pageState={tvActionPageState} setPageState={setTvActionPageState} />

        <ThirdBox />

        {/* Romance Movie */}
        <HomeSlider
          title="Romance Movies"
          moreTitle="MORE ROMANCE MOVIES"
          data={movieRomance}
          loading={movieRomanceLoading}
          pageState={movieRomancePageState}
          setPageState={setMovieRomancePageState}
        />

        {/* Crime Movie */}
        <HomeSlider title="Crime Movies" moreTitle="MORE CRIME MOVIES" data={movieCrime} loading={movieCrimeLoading} pageState={movieCrimePageState} setPageState={setMovieCrimePageState} />

        {/* Animation Tv */}
        <HomeSlider title="Animation Tv" moreTitle="MORE Animation TV" data={tvAnimation} loading={tvAnimationLoading} pageState={tvAnimationPageState} setPageState={setTvAnimationPageState} />

        {/* Kids Tv */}
        <HomeSlider title="Kids Tv" moreTitle="MORE KIDS TV" data={tvKids} loading={tvKidsLoading} pageState={tvKidsPageState} setPageState={setTvKidsPageState} />

        {/* War Tv */}
        <HomeSlider title="War Tv" moreTitle="MORE WAR TV" data={tvWar} loading={tvWarLoading} pageState={tvWarPageState} setPageState={setTvWarPageState} />

        {/* Genre Array */}
        <GenreSlider />

        {/* Go Back Up */}
        <div className="w-full h-auto flex justify-end md:px-12 px-5 mt-10">
          <button
            className="transition ease-in-out delay-150 duration-300 hover:underline text-gray-200 hover:text-white hover:scale-105 text-[12px]"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Scroll To Top
          </button>
        </div>

        
      </div>
    </div>
  );
}
// group-hover:border-[5px] group-hover:border-white

// transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300

// transition ease-in-out delay-300 duration-500 hover:border-4 hover:border-gray-300

// fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md

//w-full h-[100px] bg-purple-400 fixed top-0 left-0 right-0
