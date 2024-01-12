# Hulu Clone
- [Bulu (Hulu Clone) - Full-Stack Application](https://bulu.onrender.com/Home)
This is a Full-Stack Hulu Clone using React for the frontend and Nodejs for the backend. A user can login and or signup and when verified a user will be able to save shows and movies. 

# Description
I used Hulu for inspiration pertaining to styling and how to format the data. But, my goal with this application was to give users a place to stay up to date with all the new shows and movies while at the same time showcasing my skills.

My frontend consisted of the following. The Movie Database API for all my data, which also led to some problems. The problems I faced dealt with some of the images not being formatted correctly. When retrieving data the images came in all different sizes, which caused some of the item cards to be too small or too large. My solution was to set width and height values to all the images from the api to the same values to keep everything consistent. For my state management I used Redux’s createApi and createSlice. CreateApi fetches the data for me and caches it, then I'm able to use the data anywhere in my application. With createSlice I can manage my state throughout my whole application and also send asynchronous requests to my backend. I styled my application using tailwind css, using tailwind has made styling very easy for me. I also incorporated some MUI components here and there, especially for my drawers and modals.


My backend was very simple, I used Express Router to handle all my requests to my database and frontend. Since I handled all my api calls on the frontend, my backend routes mainly just consisted of fetching data from my database and sending it back to the frontend. Only problem I came across was finding a place where I could host my database, but that was solved pretty quick. I was able to host my database on CockroachDB, which is free up to a certain amount.




###### API
- TheMovieDB

###### Backend
- NodeJS

###### Database
- PosgreSQL

###### Frontend
- React