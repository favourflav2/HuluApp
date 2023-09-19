import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { Modal } from "@mui/material";
import { closeGenreModal, setSelectedGenre } from "../../redux/features/huluSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useGetHighGrossingMovieByYearAndGenreQuery, useGetMovieByOneGenreQuery, useGetMovieByTwoGenreQuery } from "../../redux/api/movieApi";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import LargeGenreSlider from "../../components/HomeSlider/LargeGenreSlider";

export interface IMovieGenreModalProps {}

export default function MovieGenreModal(props: IMovieGenreModalProps) {
  const { openGenreModal, selectedGenre } = UseSelector((state) => state.hulu);
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = React.useState(true);
  const date = new Date().getFullYear();

  // Page State
  const [Popular, setPopular] = React.useState(1)
  const [Drama, setDrama] = React.useState(1)
  const [Action, setAction] = React.useState(1)
  const [Comedy, setComedy] = React.useState(1)
  const [AllTv, setAllTv] = React.useState(1)


  // Highly Voted Selected Genre Tv Shows
  const { data: votes, isFetching: votesLoading, error: votesError } = useGetHighGrossingMovieByYearAndGenreQuery({genre:selectedGenre?.movieId,year:date}, { skip });


  // Popular Tv
  const {
    data: popularData,
    isFetching: popularLoading,
    error: popularError,
  } = useGetMovieByOneGenreQuery({page:Popular,genre:selectedGenre?.movieId}, { skip });

  // Selected Genre Drama
  const {data:selectedGenreDramaData, isFetching:selectedGenreDramaLoading, error:selectedGenreDramaError} = useGetMovieByTwoGenreQuery({genre1:selectedGenre?.movieId,genre2:18, page:Drama}, { skip })

  // Selected Genre Action
  const {data:selectedGenreActionData, isFetching:selectedGenreActionLoading, error:selectedGenreActionError} = useGetMovieByTwoGenreQuery({genre1:selectedGenre?.movieId,genre2:28, page:Action}, { skip })

  // Selected Genre Comedy
  const {data:selectedGenreComedyData, isFetching:selectedGenreComedyLoading, error:selectedGenreComedyError} = useGetMovieByTwoGenreQuery({genre1:selectedGenre?.movieId,genre2:35, page:Comedy}, { skip })

  // A-Z
  const {data:selectedGenreData, isFetching:selectedGenreLoading, error:selectedGenreError} = useGetMovieByOneGenreQuery({genre:selectedGenre?.movieId,page:AllTv}, { skip });


  React.useEffect(() => {
    if (votesError) {
      alert(votesError?.data?.status_message);
    }
    if (popularError) {
      alert(popularError?.data?.status_message);
    }
    if (selectedGenreDramaError) {
      alert(selectedGenreDramaError?.data?.status_message);
    }
    if (selectedGenreActionError) {
      alert(selectedGenreActionError?.data?.status_message);
    }
    if (selectedGenreComedyError) {
      alert(selectedGenreComedyError?.data?.status_message);
    }
    if (selectedGenreError) {
      alert(selectedGenreError?.data?.status_message);
    }
  }, [votesError, popularError,selectedGenreDramaError,selectedGenreActionError,selectedGenreComedyError,selectedGenreError]);

  React.useEffect(() => {
    if (selectedGenre?.movieId) {
      setSkip(false);
    }
  }, [selectedGenre?.movieId]);

  React.useEffect(()=>{
    if(!openGenreModal){
      navigate("/Movies")
    }
  },[openGenreModal]) // eslint-disable-line

  if(!openGenreModal){
    return navigate("/Movies")
  }

  return (
    <div className="w-full h-full flex">
      <div className="h-[700px] bg-gray-800/20 w-full">
        {/* Modal */}
        <Modal
          open={openGenreModal}
          onClose={() => {
            dispatch(closeGenreModal());
            dispatch(setSelectedGenre());
            navigate(-1);
            window.scrollTo(0, 0);
          }}
        >
          <div className="w-full bodyBg h-full  ">
            {/* Desktop Content */}
            <div className="w-full h-full flex flex-col">
              {/* Navbar */}
              <nav className="w-full h-[70px] fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md flex items-center justify-between px-2">
                <span></span>

                <h1 className="text-gray-200 font-medium">{selectedGenre?.genre} Movies</h1>

                <button
                  className="text-gray-200"
                  onClick={() => {
                    dispatch(closeGenreModal());
                    dispatch(setSelectedGenre());
                    navigate(-1);
                    window.scrollTo(0, 0);
                  }}
                >
                  <CloseIcon className="text-[30px]" />
                </button>
              </nav>

              <div className="h-auto w-full mt-[70px] md:p-10 p-5 overflow-y-auto no-scrollbar">
                {/* High Votes */}
                <LargeGenreSlider data={votes?.results.slice(0,8)} loading={votesLoading} title={`Highest Grossing ${selectedGenre?.genre} Movies of ${date}`} />

                {/* Popular Movies */}
                <HomeSlider
                  data={popularData}
                  loading={popularLoading}
                  title={`Popular ${selectedGenre?.genre} Movies`}
                  moreTitle="View All"
                  pageState={Popular} setPageState={setPopular}
                />

                {/* selectedGenre Drama Movies */}
                {selectedGenre?.genre !== "Drama" &&<HomeSlider
                  data={selectedGenreDramaData}
                  loading={selectedGenreDramaLoading}
                  title={` ${selectedGenre?.genre} Drama Movies`}
                  moreTitle="View All"
                  pageState={Drama} setPageState={setDrama}
                />}

                {/* selectedGenre Action Movies */}
                {selectedGenre?.genre !== "Action" && <HomeSlider
                  data={selectedGenreActionData}
                  loading={selectedGenreActionLoading}
                  title={` ${selectedGenre?.genre} Action Movies`}
                  moreTitle="View All"
                  pageState={Action} setPageState={setAction}
                />}

                {/* selectedGenre Comedy Movies */}
                {selectedGenre?.genre !== "Comedy" &&<HomeSlider
                  data={selectedGenreComedyData}
                  loading={selectedGenreComedyLoading}
                  title={` ${selectedGenre?.genre} Comedy Movies`}
                  moreTitle="View All"
                  pageState={Comedy} setPageState={setComedy}
                />}

                {/* selectedGenre A-Z Movies */}
                <HomeSlider
                  data={selectedGenreData}
                  loading={selectedGenreLoading}
                  title={`All ${selectedGenre?.genre} Movies`}
                  moreTitle="View All"
                  pageState={AllTv} setPageState={setAllTv}
                />




              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
