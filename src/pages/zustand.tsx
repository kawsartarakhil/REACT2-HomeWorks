import React, { useEffect, useState } from 'react'
import { useTodo, type User } from '../store/storeZustand'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
const addSchema=Yup.object().shape({
   name: Yup.string(),
  age: Yup.number(),
  location: Yup.string(),
  status: Yup.boolean(),
});

const Zustand = () => {
    const {data,getData,editData,addData,changeStatus,deleteData,setSearch,setStatus}=useTodo()
    const [idx, setIdx] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
    useEffect(()=>{
       getData()
    },[])

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
  return (
    <div>
        <div className="">
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
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>location</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user:User)=>{
                    return(
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.location}</td>
                            <td>{user.age}</td>
                            <td>{user.status?"active":"inactive"}</td>
                            <td>
                                <Button variant='outlined' onClick={()=>handleEdit(user)}>
                                    edit
                                </Button>
                                <Button variant='outlined' color='error' onClick={()=>deleteData(user.id)}>
                                    delete
                                </Button>
                                <input type="checkbox" onChange={()=>changeStatus(user)} checked={user.status}/>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
         {/* addModal */}
        <Modal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          className="flex flex-col items-center justify-center"
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80 p-20 bg-white"
          >
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              className="bg-white h-10"
            />
            <input
              type="text"
              name="location"
              placeholder="location"
              value={formik.values.location}
              onChange={(e) => formik.setFieldValue("location", e.target.value)}
              className="bg-white h-10"
            />
            <input
              type="number"
              name="age"
              value={formik.values.age}
              onChange={(e) =>
                formik.setFieldValue("age", Number(e.target.value))
              }
              className="bg-white h-10"
            />
            <select
              className="bg-white h-10"
              value={formik.values.status? "active" : "inactive"}
              onChange={(e) =>
                formik.setFieldValue("status", e.target.value === "active")
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Button variant="outlined" type="submit">
              Save
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenAdd(false)}
            >
              Cancel
            </Button>
          </form>
        </Modal>

        {/* edit */}
        <Modal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          className="flex flex-col items-center justify-center"
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80 p-20 bg-white"
          >
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              className="bg-white h-10"
            />
            <input
              type="text"
              name="location"
              placeholder="location"
              value={formik.values.location}
              onChange={(e) => formik.setFieldValue("location", e.target.value)}
              className="bg-white h-10"
            />
            <input
              type="number"
              name="age"
              value={formik.values.age}
              onChange={(e) =>
                formik.setFieldValue("age", Number(e.target.value))
              }
              className="bg-white h-10"
            />
            <select
              className="bg-white h-10"
              value={formik.values.status? "active" : "inactive"}
              onChange={(e) =>
                formik.setFieldValue("status", e.target.value === "active")
              }
            >
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
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
          </form>
        </Modal>  
    </div>
  )
}

export default Zustand