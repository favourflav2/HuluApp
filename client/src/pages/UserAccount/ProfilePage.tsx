import * as React from "react";
import { Dispatch, UseSelector } from "../../redux/store";
import { Link } from "react-router-dom";
import { CircularProgress, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeEmail, changeName, setError } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
  const { user, loading, error } = UseSelector((state) => state.auth);
  const User = user?.user;
  const dispatch = Dispatch();

  // Input States
  const [inputState, setInputState] = React.useState({
    firstName: User?.first_name,
    lastName: User?.last_name,
    email: User?.email,
  });

  React.useEffect(() => {
    setInputState((item) => {
      return {
        ...item,
        firstName: User?.first_name,
        lastName: User?.last_name,
        email: User?.email,
      };
    });


  }, [User?.first_name, User?.last_name, User?.email, loading]);

  // Name Modal
  const [openNameModal, setOpenNameModal] = React.useState(false);
  const handleOpenName = () => setOpenNameModal(true);
  const handleCloseName = () => setOpenNameModal(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setError());

    if (user?.user) {
      if (inputState.firstName && inputState.lastName) {
        dispatch(changeName({ formData: inputState }));
        handleCloseName();
      } else {
        alert("Name fields cannot be empty");
      }
    } else {
      alert("You need to be logged in");
    }
  }

  // Email Modal
  const [openEmailModal, setOpenEmailModal] = React.useState(false);
  const handleOpenEmail = () => setOpenEmailModal(true);
  const handleCloseEmail = () => setOpenEmailModal(false);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setError());

    if (user?.user) {
      if (isValidEmail(inputState.email)) {
        dispatch(changeEmail({ formData: inputState }));
        handleCloseEmail();
      } else {
        alert("Email is not valid");
      }
    } else {
      console.log("You need to be logged in");
    }
  }

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    dispatch(setError());
  }, []);// eslint-disable-line

  return (
    <div className="w-full h-full bg-slate-100">
      {/* Desktop Content */}
      <div className="w-full h-full flex flex-col">
        {/* Navbar */}
        <nav className="w-full h-[65px] bg-white border-b border-gray-200 p-8 flex items-center justify-between">
          <h1 className=" font-extrabold w-auto text-[23px] cursor-pointer text-black">
            <Link to="/Home">BULU</Link>
          </h1>

          {/* Icons */}
          <div className="w-auto h-auto flex items-center">
            <button className="text-white bg-black p-2 w-[42px] rounded-full  mr-2">{User?.first_name?.slice(0, 1).toUpperCase()}</button>
            {loading ? <CircularProgress /> : <h1 className="text-black text-[18px]">{User?.first_name}</h1>}
          </div>
        </nav>

        {/* Manage Your Account Div */}
        <div className="w-full h-[200px] p-8 flex border-b bg-white border-gray-200 items-center">
          <h1 className="text-[40px] font-light">Manage Your Account</h1>
        </div>

        {/* Grid Content */}
        <div className="w-full h-full flex justify-center">
          {/* Desktop Grid Content */}
          <div className="xl:w-[80%] w-full h-auto md:grid hidden grid-cols-2 gap-10 px-8 py-7">
            {/* Left Side */}
            <div className="w-full h-auto grid grid-cols-1 gap-5">
              {/* Payment Info */}
              <div className="w-full h-auto flex flex-col px-6 py-[50px] bg-white profileShadow">
                <h1 className="text-[19px] font-medium mb-4">Payment Information</h1>

                {/* Method */}
                <h1 className="text-[14px]  mb-3">Payment Method</h1>

                <h1 className="text-[13px]">Billed Though iTunes</h1>
                <h1 className="text-[13px] text-blue-500 mt-[2px]">Upading Your Payment Info With iTunes is Currently Unavailable</h1>
              </div>

              {/* Subscription  */}
              <div className="w-full h-auto flex flex-col px-6 py-[50px] bg-white profileShadow">
                <h1 className="text-[19px] font-medium mb-4">Your Subscription</h1>

                <h1 className="text-[14px]  mb-7">Bulu Base Plan</h1>

                <div className="w-full h-auto flex flex-col ">
                  <div className="w-full h-auto flex items-center justify-between">
                    <h1>Bulu</h1>
                    <h1>$7.99/mo</h1>
                  </div>
                  <h1 className="text-[12.5px] text-gray-500 mt-2">
                    You are currently paying for Hulu through iTunes. You can make changes to your subscription through iTunes. If you're interested in getting Live TV, call 1-888-631-4858.{" "}
                    <span className="text-blue-500 cursor-pointer hover:text-blue-600">Learn More</span>
                  </h1>
                </div>

                <hr className="border-gray-300 my-8" />

                <div className="w-full h-auto flex flex-col ">
                  <div className="w-full h-auto flex items-center justify-between">
                    <h1>None Added</h1>
                  </div>
                  <h1 className="text-[12.5px] text-gray-500 mt-2">
                    Other plans and add-ons are available. To learn more about premium add-ons and plans like Hulu + Live TV, please visit the help page.
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full h-auto flex flex-col bg-white profileShadow">
              {/* Your Account */}
              <div className="w-full h-auto flex flex-col px-6 py-[50px]  bg-white">
                <h1 className="text-[19px] font-medium mb-7">Your Account</h1>

                <div className="w-full h-auto flex flex-col">
                  {/* Perosnal Info */}
                  <div className="w-full flex items-center justify-between mb-3">
                    <h1 className="font-semibold text-[14px]">Personal Info</h1>
                    <h1 className="text-blue-500 hover:text-blue-600 text-[17px] cursor-pointer font-medium transition ease-in-out delay-150 duration-300 " onClick={handleOpenName}>
                      UPDATE INFO
                    </h1>
                  </div>

                  <h1 className="text-[14px] font-normal">
                    {User?.first_name} {User?.last_name}
                  </h1>

                  <hr className="border-gray-300 my-8" />

                  {/* Email */}
                  <div className="w-full flex items-center justify-between mb-3">
                    <h1 className="font-semibold text-[14px]">Email</h1>
                    <h1 className="text-blue-500 hover:text-blue-600 text-[17px] cursor-pointer font-medium transition ease-in-out delay-150 duration-300 " onClick={handleOpenEmail}>
                      CHANGE EMAIL
                    </h1>
                  </div>

                  <h1 className="text-[14px] font-normal">{User?.email}</h1>
                </div>

                <hr className="border-gray-300 my-8" />

                <h1 className="font-semibold text-[14px] mb-3">Privacy And Settings</h1>

                <h1 className="text-blue-500 hover:text-blue-900 my-[1px] text-[15.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">California Privacy Rights</h1>
                <h1 className="text-blue-500 hover:text-blue-900 my-[1px] text-[15.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">Manage Email Notifaction</h1>
                <h1 className="text-blue-500 hover:text-blue-900 my-[1px] text-[15.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">View Subscriber Agreement</h1>
                <h1 className="text-blue-500 hover:text-blue-900 my-[1px] text-[15.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">Log Out of All Devices</h1>
              </div>
            </div>
          </div>

          {/* Mobile Grid Content */}
          <div className="w-full h-full md:hidden flex flex-col p-5">
            {/* Payment Info */}
            <div className="w-full h-auto flex flex-col px-6 py-[50px] mb-3 bg-white profileShadow">
              <h1 className="text-[19px] font-medium mb-4">Payment Information</h1>

              {/* Method */}
              <h1 className="text-[14px]  mb-3">Payment Method</h1>

              <h1 className="text-[13px]">Billed Though iTunes</h1>
              <h1 className="text-[13px] text-blue-500 mt-[2px]">Upading Your Payment Info With iTunes is Currently Unavailable</h1>
            </div>

            {/* Subscription  */}
            <div className="w-full h-auto flex flex-col px-6 py-[50px] my-3 bg-white profileShadow">
              <h1 className="text-[19px] font-medium mb-4">Your Subscription</h1>

              <h1 className="text-[14px]  mb-7">Bulu Base Plan</h1>

              <div className="w-full h-auto flex flex-col ">
                <div className="w-full h-auto flex items-center justify-between">
                  <h1>Bulu</h1>
                  <h1>$7.99/mo</h1>
                </div>
                <h1 className="text-[12.5px] text-gray-500 mt-2">
                  You are currently paying for Hulu through iTunes. You can make changes to your subscription through iTunes. If you're interested in getting Live TV, call 1-888-631-4858.{" "}
                  <span className="text-blue-500 cursor-pointer hover:text-blue-600">Learn More</span>
                </h1>
              </div>

              <hr className="border-gray-300 my-8" />

              <div className="w-full h-auto flex flex-col ">
                <div className="w-full h-auto flex items-center justify-between">
                  <h1>None Added</h1>
                </div>
                <h1 className="text-[12.5px] text-gray-500 mt-2">
                  Other plans and add-ons are available. To learn more about premium add-ons and plans like Hulu + Live TV, please visit the help page.
                </h1>
              </div>
            </div>

            {/* Your Account */}
            <div className="w-full h-auto flex flex-col px-6 py-[50px] my-3  bg-white profileShadow">
              <h1 className="text-[19px] font-medium mb-7">Your Account</h1>

              <div className="w-full h-auto flex flex-col">
                {/* Perosnal Info */}
                <div className="w-full flex items-center justify-between mb-3">
                  <h1 className="font-semibold text-[14px]">Personal Info</h1>
                  <h1 className="text-blue-500 hover:text-blue-600 md:text-[17px] text-[15px] cursor-pointer font-medium transition ease-in-out delay-150 duration-300 " onClick={handleOpenName}>UPDATE INFO</h1>
                </div>

                <h1 className="text-[14px] font-normal">
                  {User?.first_name} {User?.last_name}
                </h1>

                <hr className="border-gray-300 my-8" />

                {/* Email */}
                <div className="w-full flex items-center justify-between mb-3">
                  <h1 className="font-semibold text-[14px]">Email</h1>
                  <h1 className="text-blue-500 hover:text-blue-600 md:text-[17px] text-[15px] cursor-pointer font-medium transition ease-in-out delay-150 duration-300 "onClick={handleOpenEmail}>CHANGE EMAIL</h1>
                </div>

                <h1 className="text-[14px] font-normal">{User?.email}</h1>
              </div>

              <hr className="border-gray-300 my-8" />

              <h1 className="font-semibold text-[14px] mb-3">Privacy And Settings</h1>

              <h1 className="text-blue-500 hover:text-blue-900 my-[1px] sm:text-[15.5px] text-[13.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">
                California Privacy Rights
              </h1>
              <h1 className="text-blue-500 hover:text-blue-900 my-[1px] sm:text-[15.5px] text-[13.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">
                Manage Email Notifaction
              </h1>
              <h1 className="text-blue-500 hover:text-blue-900 my-[1px] sm:text-[15.5px] text-[13.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">
                View Subscriber Agreement
              </h1>
              <h1 className="text-blue-500 hover:text-blue-900 my-[1px] sm:text-[15.5px] text-[13.5px] font-medium cursor-pointer transition ease-in-out delay-150 duration-250">
                Log Out of All Devices
              </h1>
            </div>
          </div>
        </div>

        {/* Name Modal */}
        <Modal onClose={handleCloseName} open={openNameModal}>
          {/* Container */}
          <div className="md:w-[600px] bg-white absolute md:left-[50%] md:top-[50%] md:-translate-x-[50%] md:-translate-y-[50%] top-0 left-0 w-full rounded-md">
            {/* Content */}
            <div className="w-full flex flex-col h-auto px-6 py-8">
              {/* 1st Box / Header */}
              <div className="w-full h-auto flex items-center justify-between">
                <h1 className="text-black font-semibold text-[19px]">Update Personal Information</h1>
                <button onClick={handleCloseName}>
                  <CloseIcon className="text-black text-[27px]" />
                </button>
              </div>

              <form className="w-full flex flex-col mt-10" onSubmit={(e) => handleSubmit(e)}>
                {/* First Name */}
                <div className="flex w-full flex-col mb-4">
                  <label htmlFor="firstName" className="text-gray-500 text-[12.5px] font-semibold mb-2">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                    id="firstName"
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                    value={inputState.firstName}
                  />
                </div>

                {/* Last Name */}
                <div className="flex w-full flex-col my-4">
                  <label htmlFor="lastName" className="text-gray-500 text-[12.5px] font-semibold">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                    id="lastName"
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                    value={inputState.lastName}
                  />
                </div>

                <button type="submit" className="w-full bg-black text-white p-3 rounded-md font-medium hover:bg-gray-600 mt-6">
                  Save Changes
                </button>
                <button type="button" className="w-full bg-inherit text-black border-2 border-black p-3 rounded-md font-medium hover:border-gray-500  mb-3 mt-3" onClick={handleCloseName}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Modal>

        {/* Email Modal */}
        <Modal onClose={handleCloseEmail} open={openEmailModal}>
          {/* Container */}
          <div className="md:w-[600px] bg-white absolute md:left-[50%] md:top-[50%] md:-translate-x-[50%] md:-translate-y-[50%] top-0 left-0 w-full rounded-md">
            {/* Content */}
            <div className="w-full flex flex-col h-auto px-6 py-8">
              {/* 1st Box / Header */}
              <div className="w-full h-auto flex items-center justify-between">
                <h1 className="text-black font-semibold text-[19px]">Update Email</h1>
                <button onClick={handleCloseEmail}>
                  <CloseIcon className="text-black text-[27px]" />
                </button>
              </div>

              <form className="w-full flex flex-col mt-10" onSubmit={(e) => handleSubmitEmail(e)}>
                {/* Email */}
                <div className="flex w-full flex-col mb-4">
                  <label htmlFor="email" className="text-gray-500 text-[12.5px] font-semibold mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={inputState.email}
                  />
                </div>

                <button type="submit" className="w-full bg-black text-white p-3 rounded-md font-medium hover:bg-gray-600 mt-6">
                  Save Changes
                </button>
                <button type="button" className="w-full bg-inherit text-black border-2 border-black p-3 rounded-md font-medium hover:border-gray-500  mb-3 mt-3" onClick={handleCloseEmail}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
