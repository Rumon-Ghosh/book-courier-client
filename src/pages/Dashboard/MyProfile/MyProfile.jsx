import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiCamera } from "react-icons/fi";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadImage } from "../../../utils";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUser } = useAuth();

  const {register, handleSubmit, reset, formState: {errors}} = useForm()

  const { data: myData = {}, isLoading, refetch } = useQuery({
    queryKey: ["my-data", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });

  const handleUpdateProfile = async (data) => {
    // console.log(data);
    const { name, photo } = data;
    const imageFile = photo[0];
    try {
      const photoURL = await uploadImage(imageFile)
      
      await updateUser(name, photoURL)
      
      const result = await axiosSecure.patch(`/users/my-profile/${user?.email}`, {name, photoURL})
      if (result.data.modifiedCount) {
        toast.success('Profile update success!')
        refetch();
        reset(); 
       }
        // console.log(updateRes)
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  // if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-11/12 mx-auto my-10">
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8"
      >
        My Profile
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ---------- PROFILE CARD ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-base-100 shadow-xl p-6 rounded-xl border"
        >
          <div className="flex flex-col items-center gap-4">

            <motion.img
              src={user?.photoURL}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            />

            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FiUser /> {user?.displayName}
            </h3>

            <p className="flex items-center gap-2">
              <FiMail /> {myData.email}
            </p>

            <span className="badge badge-primary p-3 text-sm mt-3">
              Role: {myData.role}
            </span>
          </div>
        </motion.div>

        {/* ---------- UPDATE FORM ---------- */}
        <motion.form
          onSubmit={handleSubmit(handleUpdateProfile)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-base-100 shadow-xl p-6 rounded-xl"
        >
          <h3 className="text-2xl font-semibold mb-4">{isLoading ? 'Updating...' : ' Update Profile'}</h3>

          {/* Name Input */}
          <label className="form-control mb-4">
            <span className="label-text font-medium">Name</span>
            <input
              type="text"
              defaultValue={user?.displayName}
              className="input input-bordered"
              {...register('name', { required: 'Name field required'})}
            />
            {errors?.name && <span className="text-red-500 mt-1">{ errors?.name?.message}</span>}
          </label>

          {/* Photo Input */}
          <label className="form-control mb-4">
            <span className="label-text font-medium">Change IMG</span>
            <div className="flex items-center gap-3">
              <FiCamera className="text-xl opacity-60" />
              <input
                type="file"
                className="input input-bordered w-full"
                {...register('photo', { required: 'Photo field required'})}
              />
              {errors?.photo && <span className="text-red-500 mt-1">{ errors?.photo?.message}</span>}
            </div>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default MyProfile;
