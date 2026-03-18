import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { AddData, ChangeStatus, DeleteData, EditData, GetData, SearchData, SelectData } from '../reducers/todo';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const addSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number(),
  location: Yup.string(),
  status: Yup.boolean(),
});

const Redux = () => {
   const {data,isLoading}=useSelector((store)=>store.todo)
   const dispatch=useDispatch()

   useEffect(()=>{
    dispatch(GetData())
   },[]);

   const [idx,setIdx]=useState(null)
   const [openAdd,setOpenAdd]=useState(false)
   const [openEdit,setOpenEdit]=useState(false)

    const formik = useFormik({
    initialValues: {
      name: "",
      age: 0,
      location: "",
      status: false,
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      if (idx !== null) {
        dispatch(EditData({
          id: idx,
          name: values.name,
          age: values.age,
          location: values.location,
          status: values.status,
        }));
        setIdx(null);
        setOpenEdit(false);
      } else {
        dispatch(AddData({
          id: Date.now(),
          name: values.name,
          age: values.age,
          location: values.location,
          status: values.status,
        }));
        setOpenAdd(false);
      }
      formik.resetForm();
    },
  });
   const handleEdit = (user) => {
    setIdx(user.id);
    setOpenEdit(true);
    formik.setFieldValue("name",user.name)
    formik.setFieldValue("location",user.location)
    formik.setFieldValue("age",user.age)
    formik.setFieldValue("status",user.status)
  };
 if(isLoading){
    return <div>Loading....</div>
 }
  return (
    <div className='flex flex-col items-center p-30'>
    <div className="flex gap-60 m-10">
        <input type="search" placeholder='search....' onChange={(e)=>dispatch(SearchData(e.target.value))}/>
        <Button variant='contained' onClick={()=>setOpenAdd(true)}> 
         Add
        </Button>
        <select onChange={(e)=>dispatch(SelectData(e.target.value))}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>   
    </div>
    <table className='w-[70%] border'>
        <thead className='h-13 text-[18px] font-black border'>
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
           {data.map((user)=>{
            return(
                <tr className='h-10 text-center border' key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.age}</td>
                <td>{user.status?"Active":"Inactive"}</td>
                <td className='flex gap-2 m-2 justify-center'>
                    <Button variant='outlined' onClick={()=>handleEdit(user)}>
                       Edit
                    </Button>
                    <Button variant='outlined' color='error' onClick={()=>dispatch(DeleteData(user.id))}>
                          Delete
                    </Button>
                    <input type="checkbox" onChange={()=>dispatch(ChangeStatus(user))} checked={user.status}/>
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

export default Redux