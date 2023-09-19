import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { Modal } from "@mui/material";
import { closeGenreModal, setSelectedGenre } from "../../redux/features/huluSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useGetTvByHighVoteCountQuery, useGetTvByOneGenreQuery, useGetTvByTwoGenreQuery } from "../../redux/api/tvApi";
import LargeGenreSlider from "../../components/HomeSlider/LargeGenreSlider";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

export interface ITvGenreModalProps {}

export default function TvGenreModal(props: ITvGenreModalProps) {
  const { openGenreModal, selectedGenre } = UseSelector((state) => state.hulu);
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = React.useState(true);

  // Page State
  const [Popular, setPopular] = React.useState(1);
  const [Drama, setDrama] = React.useState(1);
  const [Action, setAction] = React.useState(1);
  const [Comedy, setComedy] = React.useState(1);
  const [AllTv, setAllTv] = React.useState(1);

  // Highly Voted Selected Genre Tv Shows
  const { data: votes, isFetching: votesLoading, error: votesError } = useGetTvByHighVoteCountQuery(selectedGenre?.tvId, { skip });

  // Popular Tv
  const { data: popularData, isFetching: popularLoading, error: popularError } = useGetTvByOneGenreQuery({ page: Popular, genre: selectedGenre?.tvId }, { skip });

  // Selected Genre Drama
  const { data: selectedGenreDramaData, isFetching: selectedGenreDramaLoading, error: selectedGenreDramaError } = useGetTvByTwoGenreQuery({ genre1: selectedGenre?.tvId, page: Drama, genre2: 18 }, { skip });

  // Selected Genre Action
  const { data: selectedGenreActionData, isFetching: selectedGenreActionLoading, error: selectedGenreActionError } = useGetTvByTwoGenreQuery({ genre1: selectedGenre?.tvId, page: Action, genre2: 10759 }, { skip });

  // Selected Genre Comedy
  const { data: selectedGenreComedyData, isFetching: selectedGenreComedyLoading, error: selectedGenreComedyError } = useGetTvByTwoGenreQuery({ genre1: selectedGenre?.tvId, page: Comedy, genre2: 35 }, { skip });

  // A-Z
  // Selected Genre All
  const { data: selectedGenreData, isFetching: selectedGenreLoading, error: selectedGenreError } = useGetTvByOneGenreQuery({ genre: selectedGenre?.tvId, page: AllTv }, { skip });

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
  }, [votesError, popularError, selectedGenreDramaError, selectedGenreActionError, selectedGenreComedyError, selectedGenreError]);

  React.useEffect(() => {
    if (selectedGenre?.tvId) {
      setSkip(false);
    }
  }, [selectedGenre?.tvId]);

  React.useEffect(()=>{
    if(!openGenreModal){
      navigate("/TV")
    }
  },[openGenreModal]) // eslint-disable-line

  if(!openGenreModal){
    return navigate("/TV")
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
          <div className="w-full bodyBg h-full ">
            {/* Desktop Content */}
            <div className="w-full h-full flex flex-col">
              {/* Navbar */}
              <nav className="w-full h-[70px] fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md flex items-center justify-between px-2">
                <span></span>

                <h1 className="text-gray-200 font-medium">{selectedGenre?.genre} Tv</h1>

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
                <LargeGenreSlider data={votes?.results} loading={votesLoading} title={`Highly Voted ${selectedGenre?.genre} Tv`} />

                {/* Popular Tv */}
                <HomeSlider data={popularData} loading={popularLoading} title={`Popular ${selectedGenre?.genre} Tv`} moreTitle="View All" pageState={Popular} setPageState={setPopular}/>

                {/* selectedGenre Drama Tv */}
                {selectedGenre?.genre !== "Drama" && <HomeSlider data={selectedGenreDramaData} loading={selectedGenreDramaLoading} title={` ${selectedGenre?.genre} Drama Tv`} moreTitle="View All" pageState={Drama} setPageState={setDrama}/>}

                {/* selectedGenre Action Tv */}
                {selectedGenre?.genre !== "Action" && <HomeSlider data={selectedGenreActionData} loading={selectedGenreActionLoading} title={` ${selectedGenre?.genre} Action Tv`} moreTitle="View All" pageState={Action} setPageState={setAction}/>}

                {/* selectedGenre Comedy Tv */}
                {selectedGenre?.genre !== "Comedy" && <HomeSlider data={selectedGenreComedyData} loading={selectedGenreComedyLoading} title={` ${selectedGenre?.genre} Comedy Tv`} moreTitle="View All" pageState={Comedy} setPageState={setComedy}/>}

                {/* selectedGenre A-Z Tv */}
                <HomeSlider data={selectedGenreData} loading={selectedGenreLoading} title={`A-Z`} moreTitle="View All" pageState={AllTv} setPageState={setAllTv}/>
              </div>
            </div>
          </div>
        </Modal>

        {!openGenreModal && <div className="w-full h-screen bodyBg"></div>}
      </div>
    </div>
  );
}
