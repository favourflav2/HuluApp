import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useGetTrendingMovieQuery } from "../../redux/api/movieApi";
import { useGetSearchTvAndMovieQuery, useGetTrendingTvQuery } from "../../redux/api/tvApi";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import SearchCard from "../../components/cards/SearchCard";

export interface ISearchPageProps {}

export default function SearchPage(props: ISearchPageProps) {
  // Input State
  const [inputState, setInputState] = React.useState("")
  // Input Ref for Focus
  const inputRef = React.useRef<HTMLInputElement>(null);

   // Redux Api Page States
   const [trendingTvPageState, setTrendingTvPageState] = React.useState(1);
   const [trendingMoviePageState, setTrendingMoviePageState] = React.useState(1);

  // Redux Data
  const {data:movieData, isFetching:movieLoad, error:movieError} = useGetTrendingMovieQuery(trendingMoviePageState)
  const {data:tvData, isFetching:tvLoad, error:tvError} = useGetTrendingTvQuery(trendingTvPageState)


  // Redux Search Data
  const {data:searchData, isFetching:searchLoad, error:searchError} = useGetSearchTvAndMovieQuery(inputState)


  React.useEffect(()=>{
    if (movieError) {
        alert(movieError?.data?.status_message);
      }
      if (tvError) {
        alert(tvError?.data?.status_message);
      }
      if (searchError) {
        alert(searchError?.data?.status_message);
      }
  },[movieError,tvError,searchError])

  React.useEffect(()=>{
    inputRef?.current?.focus()
  },[])



  return (
    <div className="w-full h-full searchBg">
      {/* Desktop Content */}
      <div className="w-full h-full flex flex-col pb-[100px]">



        {/* Inputs */}
        <div className="w-full h-auto flex flex-col p-8">
          {/* Single Input With CLear */}
          <div className="w-full h-auto flex items-center">

            <input type="text" autoFocus className="w-full indent-3 h-[80px] border-2 border-gray-200 bg-inherit rounded-xl text-[50px] huluGreen placeholder-gray-500" placeholder="Search" value={inputState} onChange={(e)=>setInputState(e.target.value)} ref={inputRef}/>

            <h1 className={`${inputState.length > 0 ? 'block ml-2' : 'hidden'} text-gray-200 cursor-pointer`} onClick={()=>setInputState('')}>Clear</h1>
          </div>

          {/* Search Icon Input Show */}
          <div className={`w-full  items-center mt-4 text-gray-200 ${inputState.length > 0 ? 'flex' : 'hidden'}`}>
            <button><SearchIcon className="text-gray-200 text-[30px] mr-2"/></button>
            <h1>Search for "<span className="font-semibold">{inputState}</span>"</h1>

          </div>
        </div>

        <div className="w-full h-auto flex flex-col px-5 mb-10">
            {searchData?.length && inputState.length}
            {searchData?.results?.slice(0,10).map((item:any,index:any)=>(
                <SearchCard item={item} loading={searchLoad} key={index}/>
            ))}
        </div>

        


        {/* Trending Tv & Movie Sliders */}
        <HomeSlider data={movieData} loading={movieLoad} title="Movies" moreTitle="VIEW ALL" pageState={trendingMoviePageState} setPageState={setTrendingMoviePageState}/>
        <HomeSlider data={tvData} loading={tvLoad} title="TV Shows" moreTitle="VIEW ALL" pageState={trendingTvPageState} setPageState={setTrendingTvPageState}/>


      </div>
    </div>
  );
}
