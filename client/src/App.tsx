import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import React, { Suspense, lazy } from "react";
import Footer from "./components/footer/Footer";
// import HomeGenreModal from "./pages/Genre/HomeGenreModal";
// import MovieGenreModal from "./pages/Genre/MovieGenreModal";
// import TvGenreModal from "./pages/Genre/TvGenreModal";
// import MovieDetails from "./components/itemDetails/MovieDetails";
// import TvDetails from "./components/itemDetails/TvDetails";
// import SearchPage from "./pages/Search/SearchPage";
// import SignUp from "./pages/Auth/SIgnUp";
// import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dispatch } from "./redux/store";
import { setUser } from "./redux/features/authSlice";
import UserPrivateRoute from "./components/redirects/UserPrivateRoute";
import PrivateRoute from "./components/redirects/PrivateRoute";
import ProfilePage from "./pages/UserAccount/ProfilePage";

const Home = lazy(() => import("./pages/Home/Home"));
const TV = lazy(() => import("./pages/TV/TV"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const Saved = lazy(() => import("./pages/Saved/Saved"));
const HomeGenreModal = lazy(() => import("./pages/Genre/HomeGenreModal"));
const MovieGenreModal = lazy(() => import("./pages/Genre/MovieGenreModal"));
const TvGenreModal = lazy(() => import("./pages/Genre/TvGenreModal"));
const MovieDetails = lazy(() => import("./components/itemDetails/MovieDetails"));
const TvDetails = lazy(() => import("./components/itemDetails/TvDetails"));
const SearchPage = lazy(() => import("./pages/Search/SearchPage"));
const SignUp = lazy(() => import("./pages/Auth/SIgnUp"));
const Login = lazy(() => import("./pages/Auth/Login"));

function App() {
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = Dispatch();

  React.useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />

          {/* Home */}
          <Route
            path="/Home"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-screen bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <Home />
              </Suspense>
            }
          />

          {/* TV */}
          <Route
            path="/TV"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <TV />
              </Suspense>
            }
          />

          {/* Movies */}
          <Route
            path="/Movies"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <Movies />
              </Suspense>
            }
          />

          {/* Saved */}
          <Route
            path="/Saved"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <PrivateRoute>
                  <Saved />
                </PrivateRoute>
              </Suspense>
            }
          />

          {/* Home Genre Modal */}
          <Route
            path="/modal/Home/:genre"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <HomeGenreModal />
              </Suspense>
            }
          />

          {/* Movie Genre Modal */}
          <Route
            path="/modal/Movies/:genre"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <MovieGenreModal />
              </Suspense>
            }
          />

          {/* TV Genre Modal */}
          <Route
            path="/modal/TV/:genre"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <TvGenreModal />
              </Suspense>
            }
          />

          {/* Movie Item Details */}
          <Route
            path="/movieDetails/:id"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <MovieDetails />
              </Suspense>
            }
          />

          {/* TV Item Details */}
          <Route
            path="/tvDetails/:id"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <TvDetails />
              </Suspense>
            }
          />

          {/* TV Item Details */}
          <Route
            path="/search"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px] bodyBg flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <SearchPage />
              </Suspense>
            }
          />

          {/* Sign UP */}
          <Route
            path="/signup"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px]  flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <UserPrivateRoute>
                  <SignUp />
                </UserPrivateRoute>
              </Suspense>
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-[500px]  flex items-center justify-center">
                    <div>Loading...</div>
                  </div>
                }
              >
                <Login />
              </Suspense>
            }
          />

          {/* Profile Page */}
          <Route
            path="/profile"
            element={
              
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
             
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
