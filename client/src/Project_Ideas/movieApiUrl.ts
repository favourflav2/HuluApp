const value = 28
const page = 1

const getMovieByGenre = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${value}`
const getSimilarMovies = `https://api.themoviedb.org/3/movie/${value}/similar?language=en-US&page=${page}`

// Action 
const actionThrillers = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=28,53`
const actionComedies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=28,35`
const popularAction = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${value}`
const mostVotesAction = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=vote_average.desc&with_genres=28`
//* Going to need to sort action form a-z ... so im going to get the data then im going to sort on the frontend

export {}