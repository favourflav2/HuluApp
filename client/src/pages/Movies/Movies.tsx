import * as React from 'react';
import GenreSlider from '../../components/HomeSlider/GenreSlider';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import { useGetMovieByOneGenreQuery, useGetTrendingMovieQuery } from '../../redux/api/movieApi';

export interface IMoviesProps {
}

export default function Movies (props: IMoviesProps) {

  // Page State
  const [Popular, setPopular] = React.useState(1)
  const [Action, setAction] = React.useState(1)
  const [Horror, setHorror] = React.useState(1)
  const [Anime, setAnime] = React.useState(1)
  const [Western, setWestern] = React.useState(1)
  const [Kids, setKids] = React.useState(1)
  const [SciFi, setSciFi] = React.useState(1)


  //* Popular Tv
  const { data: popularMovies, isFetching: popularMoviesLoading, error: popularMoviesError } = useGetTrendingMovieQuery(Popular);

  //* Action and Adventure
  const { data: actionMovies, isFetching: actionMoviesLoading, error: actionMoviesError } = useGetMovieByOneGenreQuery({genre:28,page:Action})
  //* Horror
  const { data: horrorMovies, isFetching: horrorMoviesLoading, error: horrorMoviesError } = useGetMovieByOneGenreQuery({genre:27,page:Horror})

  //* Animation
  const { data: animationMovies, isFetching: animationMoviesLoading, error: animationMoviesError } = useGetMovieByOneGenreQuery({genre:16,page:Anime})

  //* Western
  const { data: westernMovies, isFetching: westernMoviesLoading, error: westernMoviesError } = useGetMovieByOneGenreQuery({genre:37,page:Western})

  //* Kids
  const { data: kidsMovies, isFetching: kidsMoviesLoading, error: kidsMoviesError } = useGetMovieByOneGenreQuery({genre:10751,page:Kids})

  //* Sci-Fi & Fantasy
  const { data: scifiMovies, isFetching: scifiMoviesLoading, error: scifiMoviesError } = useGetMovieByOneGenreQuery({genre:878,page:SciFi})

  

  





  React.useEffect(()=>{
    if(popularMoviesError){
      alert(popularMoviesError?.data?.status_message);
    }
    if(actionMoviesError){
      alert(actionMoviesError?.data?.status_message);
    }
    if(horrorMoviesError){
      alert(horrorMoviesError?.data?.status_message);
    }
    if(westernMoviesError){
      alert(westernMoviesError?.data?.status_message);
    }
    if(kidsMoviesError){
      alert(kidsMoviesError?.data?.status_message);
    }
    if(scifiMoviesError){
      alert(scifiMoviesError?.data?.status_message);
    }
    if(animationMoviesError){
      alert(animationMoviesError?.data?.status_message);
    }
  },[popularMoviesError,actionMoviesError,horrorMoviesError, westernMoviesError, kidsMoviesError, scifiMoviesError,animationMoviesError])

  return (
    <div className="w-full h-full bodyBg pb-[150px]">
      {/* Content */}
      <div className="w-full h-full flex flex-col pt-10">

        <span className="mb-3">
          {/* Genre Array */}
          <GenreSlider />
        </span>

        {/* Popular Movies */}
        <HomeSlider data={popularMovies} loading={popularMoviesLoading} title="Popular Movies" moreTitle="View All" pageState={Popular} setPageState={setPopular}/>

        {/* Action Movies */}
        <HomeSlider data={actionMovies} loading={actionMoviesLoading} title="Action Movies" moreTitle="View All" pageState={Action} setPageState={setAction}/>

        {/* Horror Movies */}
        <HomeSlider data={horrorMovies} loading={horrorMoviesLoading} title="Horror Movies" moreTitle="View All" pageState={Horror} setPageState={setHorror}/>

         {/* Animation Movies */}
         <HomeSlider data={animationMovies} loading={animationMoviesLoading} title="Animation Movies" moreTitle="View All" pageState={Anime} setPageState={setAnime}/>

         {/* Western Movies */}
         <HomeSlider data={westernMovies} loading={westernMoviesLoading} title="Western Movies" moreTitle="View All" pageState={Western} setPageState={setWestern}/>

         {/* Kids Movies */}
         <HomeSlider data={kidsMovies} loading={kidsMoviesLoading} title="Kids & Family Movies" moreTitle="View All" pageState={Kids} setPageState={setKids}/>

         {/* Sci-Fi Movies */}
         <HomeSlider data={scifiMovies} loading={scifiMoviesLoading} title="Sci-Fi" moreTitle="View All" pageState={SciFi} setPageState={setSciFi}/>
      </div>
    </div>
  );
}
