import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import {  UseSelector } from "../../redux/store";
import SavedCard from "../../components/cards/SavedCard";
import {  toast } from 'react-toastify';

export interface ISavedProps {}

export default function Saved(props: ISavedProps) {
  // Redux State
  const { savedData, saveLoading, savedError } = UseSelector((state) => state.hulu);
  

  const movies = savedData?.filter(item => item.type === "Movie")
  const tv = savedData?.filter(item => item.type === "Tv")

  

  React.useEffect(()=>{
    if(savedError){
      toast.error(savedError)
    }
  },[savedError])
  return (
    <div className="w-full h-full flex bodyBg">
      {/* Content */}
      <div className="w-full flex flex-col h-full">
        {/* My stuff navbar */}
        <div className="w-full h-[200px] flex flex-col bg-zinc-900 justify-center text-gray-300 p-8">
          <h1 className="text-[35px] font-medium">My Stuff</h1>
          <h1 className="text-[14px]">
            Use the to{" "}
            <button className="border p-1 rounded-full border-gray-300 mx-[3px] text-base">
              <AddIcon />
            </button>{" "}
            to add content you want to keep track of.
          </h1>
        </div>

        {/* Mapped Data */}
        <div className="w-full h-full flex flex-col bodyBg p-8">

          {/* Tv Section */}
          <div className="w-full flex flex-col h-full">

            {/* Title */}
            <h1 className="text-white font-medium text-[20px] my-5">TV</h1>

            {/* Data */}
            {tv?.length > 0 ? 
            (
              <div className="w-full h-auto grid 2xl:grid-cols-7 xl:grid-cols-5 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
                {tv?.map((item:any,index:any)=> (
                <SavedCard item={item} key={index} loading={saveLoading}/>
              ))}
              </div>
            )
            :
            (
              <div className="min-h-[100px]">
                  <h1 className="underline text-white">You Have No Saved Tv Shows</h1>
              </div>
            )
            }
          </div>

          {/* Tv Section */}
          <div className="w-full flex flex-col h-full">

            {/* Title */}
            <h1 className="text-white font-medium text-[20px] my-5">Movies</h1>

            {/* Data */}
            {movies?.length > 0 ? 
            (
              <div className="w-full h-auto grid 2xl:grid-cols-7 xl:grid-cols-5 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
                {movies?.map((item:any,index:any)=> (
                <SavedCard item={item} key={index} loading={saveLoading}/>
              ))}
              </div>
            )
            :
            (
              <div className="min-h-[100px]">
                  <h1 className="underline text-white">You Have No Movies</h1>
              </div>
            )
            }
          </div>


        </div>
      </div>
    </div>
  );
}
