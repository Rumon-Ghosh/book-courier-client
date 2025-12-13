import React from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { uploadImage } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUP = () => {
  const { loading, googleSignIn, registerUser, updateUser, setLoading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // register user using email and password
  const handleRegister = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];
    try {
      const photoURL = await uploadImage(imageFile);

      const userInfo = {
        name: name,
        email: email,
        photo: photoURL,
        role: "user",
      };

      await axiosSecure.post("/users", userInfo);

      const result = await registerUser(email, password);

      if (result.user) {
        await updateUser(name, photoURL);
        toast.success("User SignUp successful");
        if (from.includes('/dashboard')) {
            navigate('/')
          } else {
            navigate(from, {replace: true})
          }
      }
    } catch (error) {
      toast.error(error.message || "Registration failed!");
      setLoading(false);
    }
  };

  // google login
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();

      const userInfo = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
        role: "user",
      };

      await axiosSecure.post("/users", userInfo);
      toast.success("Login Successful");
      if (from.includes('/dashboard')) {
            navigate('/')
          } else {
            navigate(from, {replace: true})
          }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      {/* Left Side Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <img
          src="https://i.ibb.co/PvYBrLCT/images.jpg"
          alt="Signup Illustration"
          className="w-4/5 object-cover rounded-3xl drop-shadow-lg"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-xl">

          {/* Back to Home */}
          <Link to="/" className="btn btn-sm btn-outline mb-4">
            ← Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-center">Create an Account</h1>
          <p className="mt-2 text-center text-gray-500">
            Join BookCourier — your gateway to books.
          </p>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-4 mt-6"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required.
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium">Profile Image</label>
              <input
                type="file"
                {...register("image", { required: true })}
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  Profile image is required.
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Email is required.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                    message:
                      "Must contain uppercase, lowercase, number & symbol",
                  },
                })}
                placeholder="*******"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button className="btn btn-primary w-full mt-2">
              {loading ? (
                <TbFidgetSpinner className="animate-spin text-xl" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">Or continue with</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full flex items-center gap-2"
          >
            <FcGoogle size={28} />
            Continue with Google
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
