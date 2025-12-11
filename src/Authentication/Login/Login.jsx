import React from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { googleSignIn, logInUser, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  const { register, handleSubmit, formState: {errors} } = useForm()

  // email password login
  const handlePasswordLogin = async (data) => {
    const { email, password } = data;
    // console.log({email, password})
    try {
      const LoggedIn = await logInUser(email, password)
        if (LoggedIn) {
          // console.log(LoggedIn)
          toast.success("LogIn successful")
          if (from.includes('/dashboard')) {
            navigate('/')
          } else {
            navigate(from, {replace: true})
          }
        }
    } catch (err) {
      toast.error("Give Correct Email/Password")
      console.log(err.message);
      setLoading(false)
    }
  }

  //google login
   const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn()

      // save user to database
      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
        role: 'user'
      }
      await axiosSecure.post('/users', userInfo)
     
      // console.log(result)
      toast.success('Login Successful')
      if (from.includes('/dashboard')) {
            navigate('/')
          } else {
            navigate(from, {replace: true})
          }
    } catch (err) {
      toast.error(err?.message)
      console.log(err)
    }
  }

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT IMAGE SIDE */}
      <div className="hidden lg:flex w-1/2 justify-center items-center p-10">
        <img
          src="https://i.ibb.co/tpt5JCTN/images.jpg"
          alt="Login visual"
          className="w-full max-w-lg rounded-xl shadow-lg"
        />
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
          {/* HOME BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="text-sm mb-4 text-lime-600 underline"
          >
            ← Back to Home
          </button>

          <h1 className="text-4xl font-bold text-center mb-2">Login</h1>
          <p className="text-center text-gray-500 mb-6">
            Access your BookCourier account
          </p>

          <form
            onSubmit={handleSubmit(handlePasswordLogin)}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-lime-500 w-full py-3 rounded-md text-white font-semibold"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center py-4 space-x-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="text-sm text-gray-500">or</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-50"
          >
            <FcGoogle size={28} />
            <p className="font-medium">Continue with Google</p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" state={from} className="text-lime-600 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
