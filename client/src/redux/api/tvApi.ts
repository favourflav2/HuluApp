import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TransformedRes {
  [key: string]: any;
  _id: string;
}

export const tvApi: any = createApi({
  reducerPath: "tvApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getTvById: builder.query({
      query: (id: number) => ({
        url: `/tv/${id}?append_to_response=recommendations%2Cvideos%2C&language=en-US`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
    }),
    getTrendingTv: builder.query({
      query: (page: number) => ({
        url: `/trending/tv/week?language=en-US&page=${page}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
    }),
    getTvByOneGenre: builder.query({
      query: ({ genre, page }: any) => ({
        url: `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=vote_count.desc&watch_region=US&with_genres=${genre}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
    }),
    getTvByHighVoteCount: builder.query({
      query: (genre: number) => ({
        url: `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genre}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
    }),
    getTvByTwoGenre: builder.query({
      query: ({ genre1, genre2, page }: any) => ({
        url: `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=vote_count.desc&watch_region=US&with_genres=${genre1}%2C${genre2}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
    }),
    getTvEpisodesBySeason: builder.query({
      query: ({ tvId, season_number }: any) => ({
        url: `/tv/${tvId}/season/${season_number}?language=en-US`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
      transformResponse: (response: TransformedRes) => {
        //console.log(response);
        let obj = response
        const newArr = obj.episodes.map((item:any)=>{
            return {
                air_date: item.air_date,
                overview: item.overview,
                id: item.id,
                episode_number: item.episode_number,
                name: item.name,
                season_number: item.season_number,
                show_id: item.show_id,
                still_path: item.still_path,
                vote_average: item.vote_average,
                runtime: item.runtime

            }
        })
        return newArr
      },
    }),
    getSearchTvAndMovie: builder.query({
      query:(searchValue:string) => ({
        url:`/search/multi?query=${searchValue}&include_adult=false&language=en-US&page=1`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HEADER}`,
        },
      }),
      transformResponse: (response:any) => {
        //console.log(response)
        let newObj = response
        let newArray = response?.results?.filter((item:any) => item.media_type === "movie" || item.media_type === "tv")
        newObj.results = newArray
        return newObj
      }
    })
    // Next One
  }),
});

export const { useGetTvByIdQuery, useGetTrendingTvQuery, useGetTvByOneGenreQuery, useGetTvByHighVoteCountQuery, useGetTvByTwoGenreQuery, useGetTvEpisodesBySeasonQuery,useGetSearchTvAndMovieQuery } = tvApi;
