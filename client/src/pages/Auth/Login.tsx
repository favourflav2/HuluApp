import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch, UseSelector } from "../../redux/store";
import {  toast } from 'react-toastify';
import { logIn, setError } from "../../redux/features/authSlice";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {

  // Redux State
  const {error, loading} = UseSelector(state => state.auth)
  const dispatch = Dispatch()
  const navigate = useNavigate()

  // Inpust State
  const [inputState, setInputState] = React.useState({
    email: "",
    password: "",
  });
  const { password, email } = inputState;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(){
    dispatch(setError())
    if(password && email){
      dispatch(logIn({formData:inputState, navigate}))
    }else{
      toast.error("Please Fill All The Fields")
    }
  }

  React.useEffect(()=>{
    if(error){
      toast.error(error)
    }
  },[error,dispatch])

  React.useEffect(()=>{
    dispatch(setError())
  },[])// eslint-disable-line
  return (
    <div className="w-full h-screen bg-gray-100">
      {/* Content */}
      <div className="w-full h-auto flex flex-col justify-center items-center">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-5 bg-white h-[65px]">
          <h1 className=" font-extrabold text-[23px] cursor-pointer"><Link to='/Home'>BULU</Link></h1>
        </nav>

        {/* Box */}
        <div className="sm:w-[500px] w-[90%] h-auto bg-white mt-[100px] signUpBox rounded-lg p-8 flex flex-col pb-10">
          <h1 className="font-semibold text-[24px] mb-3">Log In</h1>

          <h1 className="text-[14px] text-gray-500">
            You will use this email and password to log into your accounts for all your favorite services across The Walt Disney Family of Companies, including Disney+, Bulu and ESPN+.{" "}
            <span className="text-blue-500 cursor-pointer transition ease-in-out delay-150 duration-300 hover:text-blue-600 hover:underline">Learn More</span>
          </h1>

          <form className="w-full flex flex-col mt-10" >
            {/* Email */}
            <div className="flex w-full flex-col mb-3">
              <label htmlFor="email" className="text-gray-500 text-[12.5px] font-semibold">
                EMAIL
              </label>
              <input
                type="text"
                className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                id="email"
                name="email"
                value={inputState.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* Password */}
            <div className="flex w-full flex-col my-3">
              <label htmlFor="password" className="text-gray-500 text-[12.5px] font-semibold">
                PASSWORD
              </label>
              <input
                type="password"
                autoComplete=""
                className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                id="password"
                name="password"
                value={inputState.password}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {loading && (
              <h1 className="mt-5 text-xs font-bold leading-5 text-red-400">
                My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15 minutes of inactivity. So, this will cause a
                delay in the response of the first request after signing up or logging in. This first request to my backend may take a minute or so.
              </h1>
            )}

            <button type="button" className={`p-4 ${password && email ? "bg-black text-white" : "bg-black/60 text-gray-400"} rounded-lg my-5`} disabled={!email || !password || loading} onClick={()=>handleSubmit()}>{loading? "Loading...":"LOG IN"}</button>
          </form>

          <div className="w-full h-auto justify-center items-center flex flex-col mt-[50px]">
            <h1 className="text-[14px] text-gray-400">Don't have an account?</h1>
            <h1 className="text-blue-500 cursor-pointer transition ease-in-out delay-150 duration-300 hover:text-blue-600 hover:underline text-[15px]"><Link to='/signup'>Sign Up</Link></h1>
          </div>
        </div>
      </div>
    </div>
  );
}
