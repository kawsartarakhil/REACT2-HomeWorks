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
import {  Input, Modal } from "antd";
import { Button } from "./components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";

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
        onClick={() => setIsAddModalOpen(true)} 
        className="w-40 h-10">
     ADD-USER
      </Button>

      <div>
        <Table >
          <TableCaption>User-List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>IMAGE</TableHead>
              <TableHead >DESCRIPTION</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => {
              return (
                <TableRow  key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {user.images?.map((img) => {
                      return (
                        <div key={img.imageName} className="flex">
                          <img
                            src={`${apiImages}${img.imageName}`}
                            className="w-10 h-10 rounded-full object-cover m-2"
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
                  </TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell>{user.isCompleted ? "Active" : "Inactive"}</TableCell>
                  <TableCell >
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
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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