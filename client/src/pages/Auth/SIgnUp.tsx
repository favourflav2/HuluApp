import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch, UseSelector } from "../../redux/store";
import { setError, signUp } from "../../redux/features/authSlice";

export interface ISignUpProps {}

export default function SignUp(props: ISignUpProps) {
  // Redux State
  const dispatch = Dispatch();
  const navigate = useNavigate();
  const { error, loading } = UseSelector((state) => state.auth);

  // Input State
  const [inputState, setInputState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  }
  const { firstName, lastName, email, password } = inputState;

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch(setError());
    if (firstName && lastName && email && password) {
      dispatch(signUp({ formData: inputState, navigate }));
    } else {
      toast.error("Please Fill All Fields");
    }
  }

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    dispatch(setError());
  }, []); // eslint-disable-line
  return (
    <div className="w-full h-full bg-gray-100">
      {/* Content */}
      <div className="w-full h-full flex flex-col">
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-5 bg-white h-[65px]">
          {/* <img src={blackHulu} alt="" className="w-[55px] h-[55px]" /> */}
          <h1 className=" font-extrabold text-[23px] cursor-pointer">
            <Link to="/Home">BULU</Link>
          </h1>
          <h1 className="curor-pointer">
            <Link to="/login">LOG IN</Link>
          </h1>
        </nav>

        {/* Body Box Center of Page */}
        <div className="w-full h-auto flex flex-col justify-center items-center ">
          {/* Create Your Account */}
          <div className="w-full h-auto flex flex-col items-center my-[60px] px-10 sm:px-0">
            <h1 className="md:text-[45px] text-[25px] font-extrabold">Create Your Account</h1>
            <h1 className="text-gray-500  text-[14px] ">Use your email and password to watch on your favorite devices</h1>
          </div>

          {/* Box */}
          <div className="flex md:w-[700px] w-[90%] bg-white h-auto flex-col signUpBox rounded-sm pt-10 sm:px-[50px] px-5 pb-[80px]">
            <h1 className="text-[14px] text-gray-500">
              You will use this email and password to log into your accounts for all your favorite services across The Walt Disney Family of Companies, including Disney+, Bulu and ESPN+.{" "}
              <span className="text-blue-500 cursor-pointer transition ease-in-out delay-150 duration-300 hover:text-blue-600 hover:underline">Learn More</span>
            </h1>

            <form className="w-full flex flex-col mt-10">
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
                  className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                  id="password"
                  name="password"
                  autoComplete=""
                  value={inputState.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* First Name */}
              <div className="flex w-full flex-col my-3">
                <label htmlFor="firstName" className="text-gray-500 text-[12.5px] font-semibold">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                  id="firstName"
                  name="firstName"
                  value={inputState.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Last Name */}
              <div className="flex w-full flex-col my-3">
                <label htmlFor="lastName" className="text-gray-500 text-[12.5px] font-semibold">
                  LAST NAME
                </label>
                <input
                  type="text"
                  className="w-full border-2 rounded-sm border-gray-400 h-[50px] indent-1 outline-black"
                  id="lastName"
                  name="lastName"
                  value={inputState.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </form>
          </div>

          {/* Text and Button */}
          <div className="md:w-[700px] w-[90%] h-auto flex flex-col px-10 py-5 mt-5 pb-[60px]">
            <h1 className="text-gray-500 text-[14px]">
              Hulu will use your data to personalize and improve your Hulu experience and to send you information about Bulu. You can change your communication preferences at any time. We may use your
              data as described in our Privacy Policy, including sharing it with The Walt Disney Family of Companies. By clicking “CONTINUE” below you agree to our Subscriber Agreement and acknowledge
              that you have read our Privacy Policy.
            </h1>

            {loading && (
              <h1 className="mt-5 text-xs font-bold leading-5 text-red-400">
                My applications are all deployed on render. Web Services on the free instance type which I am using are automatically spun down after 15 minutes of inactivity. So, this will cause a
                delay in the response of the first request after signing up or logging in. This first request to my backend may take a minute or so.
              </h1>
            )}

            <button
              type="submit"
              className={`p-4 ${password && email && firstName && lastName ? "bg-black text-white" : "bg-black/60 text-gray-500"} rounded-lg my-5`}
              disabled={!firstName || !lastName || !email || !password || loading}
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Loading..." : "CONTINUE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
