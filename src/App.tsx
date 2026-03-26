import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  AddUser,
  AddUserImage,
  DeleteUser,
  DeleteUserImage,
  GetUsers,
  EditUser,
  apiImages,
  ToggleUserStatus,
} from "./reducers/userSlice";
import { Button, Input, Modal } from "antd";

const User = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.user);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [currentUserIdForImage, setCurrentUserIdForImage] = useState(null);
  
  const [imageFile, setImageFile] = useState(null);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { Name: "", Description: "", Images: null },
  });

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const handleAddUser = (user) => {
  const fd = new FormData();
  fd.append("Name", user.Name);
  fd.append("Description", user.Description);
  if (user.Images) fd.append("Images", user.Images);

  dispatch(AddUser(fd));
  setIsAddModalOpen(false);
};

  const handleFileChange = (e) => {
    setValue("Images", e.target.files[0]);
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    setValue("Name", user.name);
    setValue("Description", user.description);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (formData) => {
    dispatch(
      EditUser({
        id: editingUser.id,
        name: formData.Name,
        description: formData.Description,
      }),
    );
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  const showImageModal = (userId) => {
    setCurrentUserIdForImage(userId);
    setIsImageModalOpen(true);
  };

  const handleImageSubmit = () => {
    const fd = new FormData();
    fd.append("Images", imageFile);
    dispatch(AddUserImage({ id: currentUserIdForImage, image: fd }));
    setImageFile(null);
    setIsImageModalOpen(false);
  };

  const handleImageFileChange = (e) => setImageFile(e.target.files[0]);

  return (
    <div className="flex flex-col gap-20 m-20">
      <Button
        type="primary"
        onClick={() => setIsAddModalOpen(true)}
        className="w-50 h-20 ml-30"
      >
        Add User
      </Button>

      <div>
        <table className="w-[80%] border ml-30">
          <thead>
            <tr className="border h-10 ">
              <th>#ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th className="w-60">DESCRIPTION</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => {
              return (
                <tr className="border text-center" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.images?.map((img) => {
                      return (
                        <div key={img.imageName} className="flex">
                          <img
                            src={`${apiImages}${img.imageName}`}
                            className="rounded-full w-15"
                          />
                          <button
                            onClick={() =>
                             dispatch(DeleteUserImage({ imageId: img.id }))
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      );
                    })}
                  </td>
                  <td>{user.description}</td>
                  <td>{user.isCompleted ? "Active" : "Inactive"}</td>
                  <td className="flex gap-2 items-center justify-center pt-5">
                    <button onClick={() => dispatch(DeleteUser(user.id))}>
                      Delete
                    </button>
                    <button onClick={() => showEditModal(user)}>
                      Edit-User
                    </button>
                    <button onClick={() => showImageModal(user.id)}>
                      Add-Image
                    </button>
                    <input
                      type="checkbox"
                      checked={!!user.isCompleted}
                      onChange={() => dispatch(ToggleUserStatus(user.id))}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        title="Add User"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleAddUser)}>
          <Controller
            name="Name"
            control={control}
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
          <Controller
            name="Description"
            control={control}
            render={({ field }) => (
              <Input placeholder="Description" {...field} />
            )}
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Save</button>
        </form>
      </Modal>

      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleEditSubmit)}>
          <Controller
            name="Name"
            control={control}
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
          <Controller
            name="Description"
            control={control}
            render={({ field }) => (
              <Input placeholder="Description" {...field} />
            )}
          />
          <button type="submit">Save Changes</button>
        </form>
      </Modal>

      <Modal
        title="Add Image"
        open={isImageModalOpen}
        onCancel={() => setIsImageModalOpen(false)}
        onOk={handleImageSubmit}
      >
        <input type="file" onChange={handleImageFileChange} />
      </Modal>
    </div>
  );
};

export default User;
