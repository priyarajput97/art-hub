"use client";
import React, { useContext, useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconEdit from "../icon-components/IconEdit";
import { DialogActions, DialogContent } from "@mui/material";
import Link from "next/link";
import ButtonSecondary from "../utils-components/ButtonSecondary";
import ButtonPrimary from "../utils-components/ButtonPrimary";
import Input from "../utils-components/Input";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";

const EditProfileModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) => {
  const { user } = useContext(AuthenticationContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const { editProfile } = useAuth();

  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.bio) setBio(user.bio);
  }, [user]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    editProfile(name, bio);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <div className="bg-slate-200 text-stone-900 dark:bg-stone-900 dark:text-white">
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent>
          <Input
            placeholder="Name"
            type="text"
            value={name}
            setValue={setName}
            classes="w-full"
          />
          <textarea
            rows={8}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Add your bio..."
            className="w-full bg-slate-200 dark:bg-stone-900 p-2 outline outline-1 outline-gray-500 rounded text-sm mt-5"
          />
        </DialogContent>

        <DialogActions className="gap-x-5 m-3">
          <Link href="profile">
            <ButtonSecondary title="Cancel" onClick={handleClose} />
          </Link>
          <ButtonPrimary title="Save" onClick={handleSave} />
        </DialogActions>
      </div>
    </Dialog>
  );
};

const EditProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowEditModal(true)}>
        <IconEdit className="mr-2 cursor-pointer" />
      </div>
      <EditProfileModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </>
  );
};
export default EditProfile;
