import { useDispatch } from "react-redux";
import { BG_URL } from "../Utils/constant";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { login as storeLogin } from "../Utils/userSlice";
import { Link } from "react-router-dom";
import { validate } from "../Utils/validate";
import authService from "../appwrite/authService";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin({ userData }));
        }
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const create = async (data) => {
    setError("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleLoginForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = () => {
    const message = validate(email.current.value, password.current.value);
    setError(message);
    if (message) return;

    if (isLogin) {
      login({ email: email.current.value, password: password.current.value });
    } else {
      create({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      });
    }
  };

  return (
    <div className="w-full h-screen font-nunito">
      <div className="w-full h-full bg-cover opacity-50 absolute">
        <img className="w-full h-full" src={BG_URL} />
      </div>
      <div className="w-full h-full py-12 flex items-start justify-center px-2">
        <div className="p-6 sm:px-8 py-12 rounded-lg bg-white shadow-lg z-10 w-full max-w-sm sm:max-w-md md:max-w-lg space-y-4">
          <div>
            <h1 className="text-center text-2xl font-bold leading-tight">
              {isLogin
                ? "Sign in to your account"
                : "Sign up to create an account"}
            </h1>
            <p className="text-center text-base text-black/60 mt-1">
              {isLogin
                ? "Don't have any account? "
                : "Already have an account? "}
              <span
                className="font-medium text-lg transition-all duration-200 hover:underline hover:text-black cursor-pointer"
                onClick={() => {
                  toggleLoginForm();
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-6 mt-10 text-white"
            >
              {!isLogin && (
                <input
                  ref={name}
                  type="text"
                  placeholder="Full Name"
                  className="p-3 w-full bg-gray-600 outline-none border-2 border-gray-800 rounded-md focus:bg-gray-700"
                />
              )}
              <input
                ref={email}
                type="text"
                placeholder="Email Address"
                className="p-3 w-full bg-gray-600 outline-none border-2 border-gray-800 rounded-md focus:bg-gray-700"
              />
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full p-3 bg-gray-600 outline-none border-2 border-gray-800 rounded-md focus:bg-gray-700"
              />
              {error && (
                <p className="text-red-500 font-semibold text-sm py-2">
                  {error}
                </p>
              )}
              <button
                className="p-3 bg-red-500 w-full rounded-md hover:bg-red-600"
                onClick={handleSubmit}
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
