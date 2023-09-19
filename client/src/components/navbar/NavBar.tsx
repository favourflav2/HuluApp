import * as React from "react";
//import hulu from "../../assets/hulu.png";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import { setLogout } from "../../redux/features/authSlice";
import jwt_decode from "jwt-decode";
import { closeGenreModal, closeMovieItemDetails, closeTvItemDetails, setHuluLogout } from "../../redux/features/huluSlice";

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  // Navigate and Redux
  const { user } = UseSelector((state) => state.auth);
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathName = pathname?.slice(1, pathname.length);
  const destructUser = user?.user;


  //User Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  if (user?.token) {
    const decoded: any = jwt_decode(user?.token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      console.log("jwt expired");
      dispatch(setLogout());
      dispatch(closeGenreModal());
      dispatch(closeMovieItemDetails());
      dispatch(closeTvItemDetails());
      dispatch(setHuluLogout());
      navigate("/Home");
    }
  }

  // Mobile States
  const [mobilePageState, setMobliePageState] = React.useState(pathName);
  const [moblieOpen, setOpenMobile] = React.useState(false);
  const refOne = React.useRef<HTMLDivElement>(null);
  function useOutsideAlerter(ref: any) {
    React.useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenMobile(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(refOne);

  React.useEffect(() => {
    if (pathname === "/" || pathname === "/Home") {
      setMobliePageState("Home");
    }
  }, [pathname, pathName]);

  //* On intial page load when a user logs we are going to get all the users saved shows and movies... only if the saved data array is empty and a user is logged in
  

  // Return null if we are on login page or signup page
  if (pathname === "/signup" || pathname === "/login" || pathname === "/profile") {
    return null;
  }

  return (
    <div className="w-full h-[70px] navbarBg">
      {/* Desktop Content */}
      <div className="w-full h-full md:flex hidden justify-between items-center px-10">
        {/* Logo */}
        {/* <img src={hulu} alt="" className=" object-cover h-[70px]" onClick={()=>navigate("/Home")}/> */}
        <h1 className="huluGreen font-extrabold text-[23px]">
          <Link to="/Home">BULU</Link>
        </h1>

        {/* Middle */}
        <ul className="w-auto h-full flex items-center">
          {/* Home */}
          <li
            className={`transition ease-in-out delay-150 duration-250 cursor-pointer  ${
              pathName === "Home" ? "text-white hover:text-gray-400 underline" : "text-gray-400 hover:text-white hover:bg-gray-400/20"
            } p-[6px] rounded-md mx-4`}
            onClick={() => navigate("/Home")}
          >
            <h1 className=" text-[18px]">Home</h1>
          </li>

          {/* TV */}
          <li
            className={`transition ease-in-out delay-150 duration-250 cursor-pointer  ${
              pathName === "TV" ? "text-white hover:text-gray-400 underline" : "text-gray-400 hover:text-white hover:bg-gray-400/20"
            } p-[6px] rounded-md mx-4`}
            onClick={() => navigate("/TV")}
          >
            <h1 className=" text-[18px]">TV</h1>
          </li>

          {/* Movies */}
          <li
            className={`transition ease-in-out delay-150 duration-250 cursor-pointer  ${
              pathName === "Movies" ? "text-white hover:text-gray-400 underline" : "text-gray-400 hover:text-white hover:bg-gray-400/20"
            } p-[6px] rounded-md mx-4`}
            onClick={() => navigate("/Movies")}
          >
            <h1 className=" text-[18px]">Movies</h1>
          </li>

          {/* My Stuff */}
          {user?.user && (
            <li
              className={`transition ease-in-out delay-150 duration-250 cursor-pointer  ${
                pathName === "Saved" ? "text-white hover:text-gray-400 underline" : "text-gray-400 hover:text-white hover:bg-gray-400/20"
              } p-[6px] rounded-md mx-4`}
              onClick={() => navigate("/Saved")}
            >
              <h1 className=" text-[18px]">My Stuff</h1>
            </li>
          )}
        </ul>

        {/* Right Side */}
        {user ? (
          <div className="w-auto h-full flex items-center cursor-pointer">
            <SearchIcon className=" cursor-pointer text-[30px] text-gray-400" onClick={() => navigate("/search")} />

            <div className="h-[40px] rounded-full border-2 border-white bg-inherit flex items-center p-4 ml-4" onClick={(e) => handleOpenUserMenu(e)}>
              <h1 className="text-[18px] text-white cursor-pointer">{destructUser?.first_name.slice(0, 1).toUpperCase()}</h1>
            </div>
          </div>
        ) : (
          <div className="w-auto h-full flex items-center">
            <SearchIcon className=" cursor-pointer text-[30px] text-gray-400" onClick={() => navigate("/search")} />

            <div className="w-auto flex items-center ml-8 transition ease-in-out delay-150 duration-250 cursor-pointer  text-gray-400 hover:text-white">
              <h4 className="mr-2">
                <Link to="/login">Sign In</Link>
              </h4>
              <PersonIcon />
            </div>
          </div>
        )}

        {/* Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseUserMenu}
          sx={{
            "& .MuiPaper-root": { backgroundColor: "#3F3D3D" },
          }}
        >
          
          <MenuItem onClick={()=>{
            handleCloseUserMenu()
            navigate("/profile")
          }} className="text-white">
            Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              dispatch(setLogout());
              dispatch(closeGenreModal());
              dispatch(closeMovieItemDetails());
              dispatch(closeTvItemDetails());
              dispatch(setHuluLogout());
              navigate("/Home");
            }}
            className="text-white"
          >
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------------------- */}

      {/* Mobile Content */}
      <div className="w-full h-full md:hidden flex justify-between items-center px-2 relative z-10">
        {/* Logo */}
        {/* <img src={hulu} alt="" className=" object-cover h-[70px]" /> */}
        <h1 className="huluGreen font-extrabold text-[23px] w-full">
          <Link to="/Home">BULU</Link>
        </h1>

        {/* Middle */}
        <div className="w-auto h-auto justify-center flex items-center p-2 mobileSelect cursor-pointer transition ease-in-out delay-150 duration-250 hover:bg-gray-500/80 rounded-lg" ref={refOne}>
          <h1 className="text-white" onClick={() => setOpenMobile((item) => !item)}>
            {pathName === "Movies" || pathName === "TV" || pathName === "Home" || pathName === "Saved" ? mobilePageState : ""}
          </h1>

          {moblieOpen ? <ExpandLessIcon className="text-white ml-2" onClick={() => setOpenMobile(false)} /> : <ExpandMoreIcon className="text-white ml-2" onClick={() => setOpenMobile(true)} />}

          {/* Menu */}
          {moblieOpen && (
            <div className="w-[300px] h-auto bg-zinc-800 absolute top-[56px] flex flex-col rounded-md z-1">
              <ul className="flex flex-col w-full h-auto justify-center items-center pb-4">
                {/* Home */}
                <li
                  className={`flex flex-col w-full justify-center items-center py-3 transition ease-in-out delay-150 duration-250 cursor-pointer hover:bg-gray-600/50  ${
                    mobilePageState === "Home" ? "text-white font-medium underline" : "text-gray-400 "
                  }`}
                  onClick={() => {
                    setMobliePageState("Home");
                    navigate("/Home");
                    setOpenMobile(false);
                  }}
                >
                  Home
                </li>

                {/* TV */}
                <li
                  className={`flex flex-col w-full justify-center items-center py-3 transition ease-in-out delay-150 duration-250 cursor-pointer hover:bg-gray-600/50  ${
                    mobilePageState === "TV" ? "text-white font-medium underline" : "text-gray-400 "
                  }`}
                  onClick={() => {
                    setMobliePageState("TV");
                    navigate("/TV");
                    setOpenMobile(false);
                  }}
                >
                  TV
                </li>

                {/* Movies */}
                <li
                  className={`flex flex-col w-full justify-center items-center py-3 transition ease-in-out delay-150 duration-250 cursor-pointer hover:bg-gray-600/50  ${
                    mobilePageState === "Movies" ? "text-white font-medium underline" : "text-gray-400 "
                  }`}
                  onClick={() => {
                    setMobliePageState("Movies");
                    navigate("/Movies");
                    setOpenMobile(false);
                  }}
                >
                  Movies
                </li>

                {/* My Stuff */}
                {user?.user && (
                  <li
                    className={`flex flex-col w-full justify-center items-center py-3 transition ease-in-out delay-150 duration-250 cursor-pointer hover:bg-gray-600/50  ${
                      mobilePageState === "Saved" ? "text-white font-medium underline" : "text-gray-400 "
                    }`}
                    onClick={() => {
                      setMobliePageState("Saved");
                      navigate("/Saved");
                      setOpenMobile(false);
                    }}
                  >
                    My Stuff
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side */}
        {user ? (
          <div className="w-full h-full flex items-center justify-end">
            <SearchIcon className=" cursor-pointer text-[30px] text-gray-400" onClick={() => navigate("/search")} />

            <div className="h-[40px] rounded-full border-2 border-white bg-inherit flex items-center p-4 ml-5" onClick={(e) => handleOpenUserMenu(e)}>
              <h1 className="text-[18px] text-white">{destructUser?.first_name.slice(0, 1).toUpperCase()}</h1>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-end">
            <SearchIcon className=" cursor-pointer text-[25px] mr-1 text-gray-400" onClick={() => navigate("/search")} />

            <div className="w-auto flex items-center  transition ease-in-out delay-150 duration-250 cursor-pointer  text-gray-400 hover:text-white">
              <h4 className="mr-2 text-[13px]">
                <Link to="/login">Sign In</Link>
              </h4>
              <PersonIcon className="text-[20px]"/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
