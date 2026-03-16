import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useToDo, type User } from './store/todo';
import { useFormik } from 'formik';

const addSchema=Yup.object().shape({
   name: Yup.string(),
  age: Yup.number(),
  location: Yup.string(),
  status: Yup.boolean(),
});

const App = () => {
  const { data, getData, deleteData, addData, editData,changeStatus } = useToDo();
  const [idx, setIdx] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(()=>{
    getData()
  },[]);
  
  const formik=useFormik({
    initialValues: {
      name: "",
      age: 0,
      location: "",
      status: false,
    },
     validationSchema: addSchema,
    onSubmit: (values) => {
      if (idx !== null) {
        editData({
          id: idx,
          name: values.name,
          age: values.age,
          location: values.location,
          status: values.status,
        });
        setIdx(null);
        setOpenEdit(false);
      } else {
        addData({
          id: Date.now(),
          name: values.name,
          age: values.age,
          location: values.location,
          status: values.status,
        });
        setOpenAdd(false);
      }
      formik.resetForm();
    },
  });
  const handleEdit = (user: User) => {
    formik.setFieldValue("name", user.name);
    formik.setFieldValue("age", user.age);
    formik.setFieldValue("location", user.location);
    formik.setFieldValue("status", user.status);
    setOpenEdit(true);
    setIdx(user.id);
  };
  const filteredData = data.filter((user) => {
  const matchesSearch =
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.location.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    filterStatus === "all" ||
    (filterStatus === "active" && user.status) ||
    (filterStatus === "inactive" && !user.status);

  return matchesSearch && matchesStatus;
});
  return (
    <div className='flex flex-col items-center text-gray-800 gap-10 p-20'>
      <h1 className='text-5xl font-black'>Users</h1>
      <div className="flex gap-100 ">
        <input type="search" className='border-2 border-gray-800 h-10' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='search'/>
      <button className='border-2 border-gray-900 w-30 font-bold'onChange={()=>setOpenAdd(true)}>Add</button>
      <select className='border-2 border-gray-900 w-30 font-bold' onChange={(e)=>setFilterStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      {(openAdd || openEdit) && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <dialog open>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-5 bg-gray-100 items-center p-10 font-bold"
              >
                <input
                  type="text"
                  value={formik.values.name}
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                  placeholder="Name...."
                  className="border p-2 border-gray-300"
                />

                <input
                  type="text"
                  value={formik.values.location}
                  onChange={(e) =>
                    formik.setFieldValue("location", e.target.value)
                  }
                  placeholder="loaction...."
                  className="border p-2 border-gray-300"
                />

                <input
                  type="number"
                  value={formik.values.age}
                  onChange={(e) => formik.setFieldValue("age", e.target.value)}
                  className="border p-2 border-gray-300"
                />

                <select
                  value={formik.values.status ? "active" : "inactive"}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.value === "active")
                  }
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
                  onClick={() => {
                    setOpenAdd(false);
                    setOpenEdit(false);
                    formik.resetForm();
                    setIdx(null);
                  }}
                  className="border p-2 border-gray-300 w-50 font-bold text-red-700"
                >
                  Cancel
                </button>
              </form>
            </dialog>
          </div>
        )}
      </div>

      <table className='w-[90%] border'>
        <thead className='border h-10 text-[18px]'>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Location</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user)=>{
            return(
              <tr className='h-10 border-2 border-gray-800 text-center text-gray-700' key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.location}</td> 
                <td>{user.age}</td>
                <td className={user.status?"text-green-700 font-bold":"text-red-700 font-bold"}>{user.status?"Active":"Inactive"}</td>
                <td className='flex gap-1 justify-center'>
                  <button onClick={()=>handleEdit(user)}>Edit</button>
                  <button onClick={()=>deleteData(user.id)}>Delete</button>
                  <input type="checkbox" onChange={()=>changeStatus(user)} checked={user.status}/>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App