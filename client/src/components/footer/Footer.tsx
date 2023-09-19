import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation } from "react-router-dom";

export interface IFooterProps {}

function Footer(props: IFooterProps) {
  const [browseOpen, setBrowseOpen] = React.useState(false);
  const [helpState, setHelpState] = React.useState(false);
  const [aboutUs, setAboutUs] = React.useState(false)
  const {pathname} = useLocation()

  // Return null if we are on login page or signup page
  if(pathname === "/signup" || pathname === "/login" || pathname === "/profile"){
    return null
  }
  return (
    <div className="w-full h-auto footer lg:px-20 lg:py-[65px] px-5 py-5">
      {/* Desktop Content */}
      <div className="w-full h-full lg:flex hidden flex-col">
        {/* 1st Box */}
        <div className="w-full h-auto grid grid-cols-[60%_20%_20%]">
          {/* Browse */}
          <div className="w-full h-auto flex flex-col pr-[100px]">
            {/* Title */}
            <h1 className="text-gray-300 mb-2 text-[16px] font-medium">Browse</h1>

            <div className="grid grid-cols-4 w-auto h-auto gap-4">
              {/* 1st Under Browse */}
              <div className="w-auto h-auto flex flex-col ">
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Streaming Library
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Live TV
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Live News
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Live Sports
                </h1>
              </div>

              {/* 2nd Under Browse */}
              <div className="w-auto h-auto flex flex-col">
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  TV Shows
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Movies
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Originals
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Networks
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Kids
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  FX
                </h1>
              </div>

              {/* 3rd Under Browse */}
              <div className="w-auto h-auto flex flex-col">
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Max
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Cinemax
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Showtime
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  STARZ
                </h1>
              </div>

              {/* 4th Under Browse */}
              <div className="w-auto h-auto flex flex-col">
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Hulu, Disney+, and ESPN+
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Hulu (No Ads), Disney+, and ESPN+
                </h1>
                <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                  Student Discount
                </h1>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="w-full h-auto flex flex-col px-[100px]">
            {/* Title */}
            <h1 className="text-gray-300 mb-2 text-[16px] font-medium">Help</h1>

            <div className="w-auto h-auto flex flex-col ">
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Account & Billing
              </h1>
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Plans & Pricing
              </h1>
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Supported Devices
              </h1>
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Accessibility
              </h1>
            </div>
          </div>

          {/* About Us */}
          <div className="w-full h-auto flex flex-col px-[100px]">
            {/* Title */}
            <h1 className="text-gray-300 mb-2 text-[16px] font-medium">About Us</h1>

            <div className="w-auto h-auto flex flex-col ">
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Press
              </h1>
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Jobs
              </h1>
              <h1 className="text-gray-300 my-2 text-[14px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Contact
              </h1>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-500 my-5" />

        {/* Social Media */}
        <div className="w-auto flex items-center ">
          <IconButton className="text-gray-400 text-[35px] mr-2">
            <InstagramIcon className=" text-[35px]" />
          </IconButton>
          <IconButton className="text-gray-400 text-[35px] mx-2">
            <FacebookIcon className=" text-[35px]" />
          </IconButton>
          <IconButton className="text-gray-400 text-[35px] mx-2">
            <TwitterIcon className=" text-[35px]" />
          </IconButton>
          <IconButton className="text-gray-400 text-[35px] mx-2">
            <YouTubeIcon className=" text-[35px]" />
          </IconButton>
        </div>

        {/* Bottom Links */}
        <div className="w-full h-auto xl:flex hidden justify-between items-center mt-5">
          <h1 className="text-[12px] text-gray-400  ">About Ads</h1>
          <h1 className="text-[12px] text-gray-400  ">Terms of Use</h1>
          <h1 className="text-[12px] text-gray-400  ">Privacy Policy</h1>
          <h1 className="text-[12px] text-gray-400  ">Do Not Sell My Personal Information</h1>
          <h1 className="text-[12px] text-gray-400  ">Your California Privacy Rights</h1>
          <h1 className="text-[12px] text-gray-400  ">Tv Parental Guidelines</h1>
          <h1 className="text-[12px] text-gray-400  ">Sitemap</h1>
          <h1 className="text-[12px] text-gray-400  ">© 2023 Bulu, LLC</h1>
        </div>

        <div className="w-full h-auto grid xl:hidden grid-cols-4 mt-5">
          <h1 className="text-[12px] text-gray-400 my-1  ">About Ads</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">Terms of Use</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">Privacy Policy</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">Do Not Sell My Personal Information</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">Your California Privacy Rights</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">Tv Parental Guidelines</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">Sitemap</h1>
          <h1 className="text-[12px] text-gray-400 my-1  ">© 2023 Bulu, LLC</h1>
        </div>
      </div>

      {/* --------------------------------------Mobile Content----------------------------- */}
      <div className="w-full h-auto lg:hidden flex flex-col">

        {/* Browse */}
        <div className="w-full h-auto flex flex-col p-3">
          <div className="w-full h-auto flex items-center justify-between">
            <h1 className="text-gray-300  md:text-[14px] text-[13px]">BROWSE</h1>
            {browseOpen ? (
              <KeyboardArrowUpIcon className="text-gray-300" onClick={() => setBrowseOpen((item) => !item)} />
            ) : (
              <KeyboardArrowDownIcon className="text-gray-300" onClick={() => setBrowseOpen((item) => !item)} />
            )}
          </div>
          
          {/* Browse State Modal */}
          {browseOpen && <div className="w-full h-auto flex flex-col mt-2">
            {/* 1st Under Browse */}
            <div className="w-auto h-auto flex flex-col ">
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Streaming Library
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Live TV
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Live News
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Live Sports
              </h1>
            </div>

            {/* 2nd Under Browse */}
            <div className="w-auto h-auto flex flex-col">
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                TV Shows
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Movies
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Originals
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Networks
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Kids
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                FX
              </h1>
            </div>

            {/* 3rd Under Browse */}
            <div className="w-auto h-auto flex flex-col">
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Max
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Cinemax
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Showtime
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                STARZ
              </h1>
            </div>

            {/* 4th Under Browse */}
            <div className="w-auto h-auto flex flex-col">
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Hulu, Disney+, and ESPN+
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Hulu (No Ads), Disney+, and ESPN+
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Student Discount
              </h1>
            </div>
          </div>}
        </div>

        <hr className="border-gray-400 my-2" />

        {/* Help */}
        <div className="w-full h-auto flex flex-col p-3">
          <div className="w-full h-auto flex items-center justify-between">
            <h1 className="text-gray-300  md:text-[14px] text-[13px]">HELP</h1>
            {helpState? (
              <KeyboardArrowUpIcon className="text-gray-300" onClick={() => setHelpState((item) => !item)} />
            ) : (
              <KeyboardArrowDownIcon className="text-gray-300" onClick={() => setHelpState((item) => !item)} />
            )}
          </div>
          
          {/* Help State Modal */}
          {helpState && <div className="w-full h-auto flex flex-col mt-2">
            {/* 1st Under Browse */}
            <div className="w-auto h-auto flex flex-col ">
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Account & Billing
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Plans & Pricing
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Supported Devices
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Accessibility
              </h1>
            </div>
           
          </div>}
        </div>

        <hr className="border-gray-400 my-2" />

        {/* About Us */}
        <div className="w-full h-auto flex flex-col p-3">
          <div className="w-full h-auto flex items-center justify-between">
            <h1 className="text-gray-300  md:text-[14px] text-[13px]">ABOUT US</h1>
            {aboutUs? (
              <KeyboardArrowUpIcon className="text-gray-300" onClick={() => setAboutUs((item) => !item)} />
            ) : (
              <KeyboardArrowDownIcon className="text-gray-300" onClick={() => setAboutUs((item) => !item)} />
            )}
          </div>
          
          {/* About Us State Modal */}
          {aboutUs && <div className="w-full h-auto flex flex-col mt-2">
            {/* 1st Under Browse */}
            <div className="w-auto h-auto flex flex-col ">
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Press
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Jobs
              </h1>
              <h1 className="text-gray-300 my-2 md:text-[12px] text-[11px] font-medium transition ease-in-out delay-150 duration-300 hover:text-gray-100 cursor-pointer">
                Contact
              </h1>
            </div>
           
          </div>}
        </div>

        <hr className="border-gray-400 my-2" />

        {/* Social Media */}
        <div className="w-auto flex items-center">
          <IconButton className="text-gray-400 md:text-[30px] text-[25px] mr-2">
            <InstagramIcon className=" md:text-[30px] text-[25px]" />
          </IconButton>
          <IconButton className="text-gray-400 md:text-[30px] text-[25px] mx-2">
            <FacebookIcon className=" md:text-[30px] text-[25px]" />
          </IconButton>
          <IconButton className="text-gray-400 md:text-[30px] text-[25px] mx-2">
            <TwitterIcon className=" md:text-[30px] text-[25px]" />
          </IconButton>
          <IconButton className="text-gray-400 md:text-[30px] text-[25px] mx-2">
            <YouTubeIcon className=" md:text-[30px] text-[25px]" />
          </IconButton>
        </div>

        <div className="w-full h-auto grid grid-cols-2 mt-5">
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">About Ads</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">Terms of Use</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">Privacy Policy</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">Do Not Sell My Personal Information</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">Your California Privacy Rights</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">Tv Parental Guidelines</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">Sitemap</h1>
          <h1 className="md:text-[12px] text-[10px] text-gray-400 my-1  ">© 2023 Bulu, LLC</h1>
        </div>


      </div>
    </div>
  );
}
export default React.memo(Footer);
