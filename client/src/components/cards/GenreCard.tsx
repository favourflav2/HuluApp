import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { openGenreModalFunc, selectGenre } from "../../redux/features/huluSlice";
import { useLocation, useNavigate } from "react-router-dom";

export interface IGenreCardProps {
  item: {
    genre: string;
    tvName: string;
    movieName: string;
    tvId: number;
    movieId: number;
    
  };
  
}

export default function GenreCard({item}: IGenreCardProps) {
  const dispatch = Dispatch()
  const {selectedGenre} = UseSelector(state => state.hulu)
  const {pathname} = useLocation()
  const pageUrl = pathname?.slice(1,pathname.length)
  const navigate = useNavigate()
  
  //console.log(selectedGenre)
    
  return (
    <div className={` h-[200px] genreCard rounded-xl relative transition ease-in-out delay-150  duration-300 hover:border-4 hover:border-gray-300 my-2 ${item.genre === "Action" ? 'mr-2' : 'mx-2'}`} onClick={()=>{
      if(pageUrl === "Home"){
        dispatch(selectGenre({...item}))
        dispatch(openGenreModalFunc())
        navigate(`/modal/Home/${item?.genre}`)
      }
      if(pageUrl === "TV"){
        dispatch(selectGenre({...item}))
        dispatch(openGenreModalFunc())
        navigate(`/modal/TV/${item?.genre}`)
      }
      if(pageUrl === "Movies"){
        dispatch(selectGenre({...item}))
        dispatch(openGenreModalFunc())
        navigate(`/modal/Movies/${item?.genre}`)
      }
      
    }}>
      <h1 className="huluGreen absolute bottom-5 left-4 text-[24px] font-bold">{item.genre}</h1>
    </div>
  );
}

// lg:w-[280px] w-[400px]
