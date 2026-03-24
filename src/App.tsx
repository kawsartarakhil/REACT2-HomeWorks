import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToDo } from "./store/todo";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DeleteFilled, EditFilled} from '@ant-design/icons';

const App = () => {
  const { data, addData, getData, editData, DeleteData ,changeStatus,setSearch,setStatus} = useToDo();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idx, setIdx] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      age: "",
      status: "active"
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const submit = values => {
    if (idx === null) {
      addData({
        id: String(Date.now()),
        name: values.name,
        location: values.location,
        age: values.age,
        status: values.status === "active"
      });

      setOpenAdd(false);
    } else {
      editData({
        id: String(idx),
        name: values.name,
        location: values.location,
        age: values.age,
        status: values.status === "active"
      });

      setOpenEdit(false);
      setIdx(null);
    }

    reset();
  };

  const openEditModal = user => {
    setIdx(user.id);

    setValue("name", user.name);
    setValue("location", user.location ?? "");
    setValue("age", user.age);
    setValue("status", user.status ? "active" : "inactive");

    setOpenEdit(true);
  };

  return (
    <div className="flex flex-col items-center p-20">
      <div className="flex gap-100">
            <Button variant='contained' onClick={()=>setOpenAdd(true)}>
                Add
            </Button>
            <input type="search" className='border p-2' placeholder='search' onChange={(e)=>setSearch(e.target.value)}/>
            <select className='border p-2' onChange={(e)=>setStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    <table className="w-[90%] m-20">
      <thead className="h-13 border text-[18px]">
        <tr>
          <th>#id</th>
          <th>Name</th>
          <th>Location</th>
          <th>Age</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
      {data.map(user => (
        <tr key={user.id} className="text-center  h-10 text-gray-600 border">
        <td className="font-black text-gray-900">{user.id}</td>
        <td>{user.name}</td>
         <td>{user.location}</td>
          <td>{user.age}</td>
           <td className={user.status?"text-blue-800 font-bold":"text-red-800 font-bold"}>{user.status?"Active":"Inactive"}</td>
         <td className="flex gap-2 justify-center mt-2">
           <button onClick={() => openEditModal(user)} className="text-[19px] text-blue-800"><EditFilled /></button>
          <button onClick={() => DeleteData(user.id)} className="text-[18px] text-red-800"><DeleteFilled /></button>
          <input type="checkbox"  checked={user.status} onChange={()=>changeStatus(user)}/>
         </td>
        </tr>
      ))}
      </tbody>
    </table>

      {/* ADD MODAL */}
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        className="flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-3 w-80 p-8 bg-white"
        >
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true })}
          />

          <input
            type="text"
            placeholder="location"
            {...register("location")}
          />

          <input
            type="number"
            placeholder="age"
            {...register("age", { required: true })}
          />

          <select {...register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Button variant="outlined" type="submit">
            Save
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenAdd(false);
              reset();
            }}
          >
            Cancel
          </Button>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        className="flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-3 w-80 p-8 bg-white"
        >
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true })}
          />

          <input
            type="text"
            placeholder="location"
            {...register("location")}
          />

          <input
            type="number"
            placeholder="age"
            {...register("age", { required: true })}
          />

          <select {...register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Button variant="outlined" type="submit">
            Save
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenEdit(false);
              reset();
              setIdx(null);
            }}
          >
            Cancel
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default App;