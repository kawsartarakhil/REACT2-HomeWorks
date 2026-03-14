import React, { useState } from 'react'
import *as Yup from 'yup'
import { useTodo } from './stores/zustandStore';
import type {User} from './stores/zustandStore'
import { useFormik } from 'formik';
const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short (min 2 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .required("Name is required"),
  surname: Yup.string()
    .min(2, "Surname is too short (min 2 characters)")
    .max(50, "Surname is too long (max 50 characters)")
    .required("Surname is required"),
  age: Yup.number()
    .min(5, "Age is too young")
    .max(90, "Age is too old")
    .required("Age is required"),
  status: Yup.boolean(),
});

type FormValues = {
  name: string
  surname: string
  age: number
  status: boolean
}

const Zustand = () => {
  const { data, addUser, editUser, deleteUser, changeStatus } = useTodo();
const [idx, setIdx] = useState<number | null>(null)
const [openAdd, setOpenAdd] = useState<boolean>(false)
const [openEdit, setOpenEdit] = useState<boolean>(false)
const [search, setSearch] = useState<string>("")
const [filterStatus, setFilterStatus] = useState<string>("all")
  const formik=useFormik<FormValues>({
    initialValues:{
      name: "",
      surname: "",
      age: 0,
      status: false,
    },
    validationSchema:addSchema,
    onSubmit:(values)=>{      
      if (idx !== null) {
        editUser({
          id: idx,
          name: values.name,
          surname: values.surname,
          age: Number(values.age),
          status: values.status,
        });
        setIdx(null);
        setOpenEdit(false);
      } else {
        addUser({
          id: Date.now(),
          name: values.name,
          surname: values.surname,
          age:values.age,
          status: values.status,
        });
        setOpenAdd(false);
      }
      formik.resetForm();
    }
  });
  const handleEdit = (user:User) => {
    formik.setFieldValue("name", user.name);
    formik.setFieldValue("surname", user.surname);
    formik.setFieldValue("age", user.age);
    formik.setFieldValue("status", user.status);
    setIdx(user.id);
    setOpenEdit(true);
  };
    const filters = data.filter((u) => {
    const searchUsers =
      u.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      u.surname.toLowerCase().includes(search.toLocaleLowerCase());
    const statusFilter =
      filterStatus == "all" ||
      (filterStatus === "active" && u.status) ||
      (filterStatus === "inactive" && !u.status);
    return searchUsers && statusFilter;
  });
  return (
   <div className='flex flex-col items-center text-blue-950'>
   <h1 className="text-5xl font-bold m-10">User List</h1>
      <div className="flex gap-90 m-20">
        <input type="search" placeholder='Search...' className='h-10 p-2 border-3 border-blue-950 w-60' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <select className='h-10 w-30 border p-2 border-3 border-blue-950 font-bold text-blue-900' value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className='h-10 w-30 p-2 font-bold border-3 border-blue-950 text-blue-900' onClick={()=>setOpenAdd(true)}>Add</button>
      </div>
        {(openAdd || openEdit) && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center ">
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 bg-gray-100 items-center p-10 font-bold">
      
      <input
        type="text"
        value={formik.values.name}
        onChange={(e)=>formik.setFieldValue("name",e.target.value)}
        placeholder="Name...."
        className="border p-2 border-gray-300"
      />

      <input
        type="text"
        value={formik.values.surname}
        onChange={(e)=>formik.setFieldValue("surname",e.target.value)}
        placeholder="surname...."
        className="border p-2 border-gray-300"
      />

      <input
        type="number"
        value={formik.values.age}
        onChange={(e)=>formik.setFieldValue("age",e.target.value)}
        className="border p-2 border-gray-300"
      />

      <select
        value={formik.values.status ? "active" : "inactive"}
        onChange={(e)=>formik.setFieldValue("status",e.target.value==="active")}
        className="border p-2 border-gray-300 w-50"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button
        type="submit"
        className="border p-2 border-gray-300 w-50 font-bold"
      >
        Save
      </button>

      <button
        type="button"
        onClick={()=>{
          setOpenAdd(false)
          setOpenEdit(false)
          formik.resetForm()
          setIdx(null)
        }}
        className="border p-2 border-gray-300 w-50 font-bold text-red-700"
      >
        Cancel
      </button>

    </form>

  </div>
)}
    
      <table className="border mt-10 w-[70%] text-center">
        <thead>
          <tr className="border">
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filters.map((user) => (
            <tr key={user.id} className="border h-10">
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-600 ml-2"
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  className="ml-2"
                  onChange={() => changeStatus(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
  )
}

export default Zustand