import * as React from "react";
import GenreSlider from "../../components/HomeSlider/GenreSlider";
import { useGetTrendingTvQuery, useGetTvByOneGenreQuery } from "../../redux/api/tvApi";
import HomeSlider from "../../components/HomeSlider/HomeSlider";

export interface ITVProps {}

export default function TV(props: ITVProps) {

    // Page State
  const [Popular, setPopular] = React.useState(1)
  const [Action, setAction] = React.useState(1)
  const [News, setNews] = React.useState(1)
  const [Anime, setAnime] = React.useState(1)
  const [Western, setWestern] = React.useState(1)
  const [Kids, setKids] = React.useState(1)
  const [SciFi, setSciFi] = React.useState(1)


  //* Popular Tv
  const { data: popularTv, isFetching: popularTvLoading, error: popularTvError } = useGetTrendingTvQuery(Popular);

  //* Action and Adventure
  const { data: actionTv, isFetching: actionTvLoading, error: actionTvError } = useGetTvByOneGenreQuery({page:Action, genre:10759})

  //* Animation
  const { data: animationTv, isFetching: animationTvLoading, error: animationTvError } = useGetTvByOneGenreQuery({page:Anime, genre:16})

  //* News
  const { data: newsTv, isFetching: newsTvLoading, error: newsTvError } = useGetTvByOneGenreQuery({page:News, genre:10763})

  //* Western
  const { data: westernTv, isFetching: westernTvLoading, error: westernTvError } = useGetTvByOneGenreQuery({page:Western, genre:37})

  //* Kids
  const { data: kidsTv, isFetching: kidsTvLoading, error: kidsTvError } = useGetTvByOneGenreQuery({page:Kids, genre:10762})

  //* Sci-Fi & Fantasy
  const { data: scifiTv, isFetching: scifiTvLoading, error: scifiTvError } = useGetTvByOneGenreQuery({page:SciFi, genre:10765})
  





  React.useEffect(()=>{
    if(popularTvError){
      alert(popularTvError?.data?.status_message);
    }
    if(actionTvError){
      alert(actionTvError?.data?.status_message);
    }
    if(animationTvError){
      alert(animationTvError?.data?.status_message);
    }
    if(newsTvError){
      alert(newsTvError?.data?.status_message);
    }
    if(westernTvError){
      alert(westernTvError?.data?.status_message);
    }
    if(kidsTvError){
      alert(kidsTvError?.data?.status_message);
    }
    if(scifiTvError){
      alert(scifiTvError?.data?.status_message);
    }
  },[popularTvError,actionTvError,animationTvError,newsTvError, westernTvError, kidsTvError, scifiTvError])

  return (
    <div className="w-full h-full bodyBg pb-[150px]">
      {/* Content */}
      <div className="w-full h-full flex flex-col pt-10">

        <span className="mb-3">
          {/* Genre Array */}
          <GenreSlider />
        </span>

        {/* Popular Tv */}
        <HomeSlider data={popularTv} loading={popularTvLoading} title="Popular Tv" moreTitle="View All" pageState={Popular} setPageState={setPopular} />

        {/* Action Tv */}
        <HomeSlider data={actionTv} loading={actionTvLoading} title="Action & Adventure Tv" moreTitle="View All" pageState={Action} setPageState={setAction}/>

        {/* Animation Tv */}
        <HomeSlider data={animationTv} loading={animationTvLoading} title="Animation Tv" moreTitle="View All" pageState={Anime} setPageState={setAnime}/>

         {/* News Tv */}
         <HomeSlider data={newsTv} loading={newsTvLoading} title="News Tv" moreTitle="View All" pageState={News} setPageState={setNews}/>

         {/* Western Tv */}
         <HomeSlider data={westernTv} loading={westernTvLoading} title="Western Tv" moreTitle="View All" pageState={Western} setPageState={setWestern}/>

         {/* Kids Tv */}
         <HomeSlider data={kidsTv} loading={kidsTvLoading} title="Kids Tv" moreTitle="View All" pageState={Kids} setPageState={setKids}/>

         {/* Sci-Fi Tv */}
         <HomeSlider data={scifiTv} loading={scifiTvLoading} title="Sci-Fi & Fantasy Tv" moreTitle="View All" pageState={SciFi} setPageState={setSciFi}/>
      </div>
    </div>
  );
}
