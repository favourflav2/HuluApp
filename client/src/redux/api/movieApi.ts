import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const movieApi:any = createApi({

    reducerPath: "movieApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://api.themoviedb.org/3"}),
    endpoints: (builder) => ({
        getMovieById: builder.query({
            query: (id:number) => ({
                url: `/movie/${id}?append_to_response=recommendations%2Ccredits%2C&language=en-US`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        getTrendingMovie: builder.query({
            query: (page:number) => ({
                url: `/trending/movie/week?language=en-US&page=${page}`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        getMovieByOneGenre: builder.query({
            query: ({genre,page}:any) => ({
                url:`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&region=US&sort_by=vote_count.desc&with_genres=${genre}`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        getHighGrossingMovieByYearAndGenre: builder.query({
            query: ({genre,year}:any) => ({
                url:`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&region=US&sort_by=revenue.desc&with_genres=${genre}`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        getMovieByTwoGenre: builder.query({
            query: ({genre1,genre2,page}:any) => ({
                url:`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&region=US&sort_by=vote_count.desc&with_genres=${genre1}%2C${genre2}`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_HEADER}`
                }
            })
        }),
        

        // Next One

    })


})

export const {useGetMovieByIdQuery, useGetTrendingMovieQuery, useGetMovieByOneGenreQuery, useGetHighGrossingMovieByYearAndGenreQuery, useGetMovieByTwoGenreQuery} = movieApi

// https://api.themoviedb.org/3/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=popularity.desc&with_genres=18

// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=popularity.desc&with_genres=18

// /discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=vote_count.desc&with_genres=18%2C35