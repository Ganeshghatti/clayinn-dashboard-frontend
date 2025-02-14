"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import {
  fetchProfile_Action,
  editProfile_Action,
  changePassword_Action,
} from "@/app/redux/profile_Slice";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  const searchParams = useSearchParams();
  const locationId = searchParams.get("locationId");

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const { toast } = useToast();

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current_password: false,
    new_password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    dispatch(fetchProfile_Action());
  }, [dispatch, locationId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        mobile: profile.mobile,
      });
    }
  }, [profile]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile_Action(formData));
    setIsEditing(false);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New password and confirm password do not match.",
      });
      return;
    }

    const { confirmPassword, ...passwordDataToSend } = passwordData;
    dispatch(changePassword_Action(passwordDataToSend));
    setIsChangingPassword(false);

    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    const new_passwordData = {
      ...passwordData,
      [e.target.name]: e.target.value,
    };
    setPasswordData(new_passwordData);
    console.log(new_passwordData);
  };

  const toggleShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.error,
      });
    }
  }, [error, toast]);

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <div className="card shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        {profile && (
          <div>
            {isEditing ? (
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <Label className="text-lg font-semibold">Name: </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-gray-700 py-6"
                  />
                </div>
                <div className="mb-4">
                  <Label className="text-lg font-semibold">Mobile: </Label>
                  <Input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="text-gray-700 py-6"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary bg-black p-3 px-7 text-white border rounded-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary bg-red-600 p-3 px-7 text-white border rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Name:</p>
                  <p className="text-gray-700">{profile.name}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Email:</p>
                  <p className="text-gray-700">{profile.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Role:</p>
                  <p className="text-gray-700 capitalize">{profile.role}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-semibold">Mobile:</p>
                  <p className="text-gray-700">{profile.mobile}</p>
                </div>
                <button
                  className="btn btn-primary bg-black p-3 text-white border rounded-lg"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
            <div className="mt-6">
              <Dialog
                open={isChangingPassword}
                onOpenChange={setIsChangingPassword}
              >
                <DialogTrigger asChild>
                  <button
                    className="btn btn-primary bg-black p-3 text-white border rounded-lg"
                    onClick={() => setIsChangingPassword(true)}
                  >
                    Change Password
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    <form onSubmit={onChangePassword}>
                      <div className="mb-4">
                        <Label className="text-md font-medium">
                          Current Password:{" "}
                        </Label>
                        <div className="relative">
                          <Input
                            type={
                              showPassword.current_password
                                ? "text"
                                : "password"
                            }
                            name="current_password"
                            value={passwordData.current_password}
                            onChange={handlePasswordChange}
                            className="text-gray-700 mt-3 py-6"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2"
                            onClick={() =>
                              toggleShowPassword("current_password")
                            }
                          >
                            {showPassword.current_password ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label className="text-md  font-medium">
                          New Password:{" "}
                        </Label>
                        <div className="relative">
                          <Input
                            type={
                              showPassword.new_password ? "text" : "password"
                            }
                            name="new_password"
                            value={passwordData.new_password}
                            onChange={handlePasswordChange}
                            className="text-gray-700 mt-3 py-6"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2"
                            onClick={() => toggleShowPassword("new_password")}
                          >
                            {showPassword.new_password ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label className="text-md font-medium">
                          Confirm Password:{" "}
                        </Label>
                        <div className="relative">
                          <Input
                            type={
                              showPassword.confirmPassword ? "text" : "password"
                            }
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="text-gray-700 mt-3 py-6"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2"
                            onClick={() =>
                              toggleShowPassword("confirmPassword")
                            }
                          >
                            {showPassword.confirmPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary bg-black p-3 px-7 text-white border rounded-lg"
                      >
                        Change Password
                      </button>
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="btn btn-primary bg-red-600 p-3 px-7 text-white border rounded-md"
                          onClick={() => setIsChangingPassword(false)}
                        >
                          Cancel
                        </button>
                      </DialogClose>
                    </form>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
