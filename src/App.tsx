import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { AddData, ChangeStatus, DeleteData, EditData, GetData, SearchData, SelectData, type User } from './reducers/todo';
import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from '@mui/material/Modal';

const addSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number(),
  location: Yup.string(),
  status: Yup.boolean(),
});

const App = () => {
  const { data, isLoading } = useSelector((store: any) => store.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetData() as any)
  }, [])

  const [idx, setIdx] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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

  const handleEdit = (user: User) => {
    setIdx(user.id);
    setOpenEdit(true);
    formik.setValues(user);
  };

  if (isLoading) {
    return <div>Loading.....</div>
  }

  return (
    <div className='flex flex-col items-center
    gap-10 p-20'>
      <div className='flex gap-75'>
        <input
          type="search"
          placeholder='Search'
          onChange={(e) => dispatch(SearchData(e.target.value))}
          className='border p-2'
        />

        <Button variant="outlined" onClick={() => setOpenAdd(true)}>
          Add
        </Button>

        <select onChange={(e) => dispatch(SelectData(e.target.value))} className='border p-2'>
          <option value="all">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <table className='w-[70%] border'>
        <thead>
          <tr className='h-10 text-[18px] border'>
            <th>id</th>
            <th>name</th>
            <th>location</th>
            <th>age</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user: User) => (
            <tr key={user.id} className='text-center h-10 border'>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.age}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td className='flex gap-2 justify-center p-1'>
                <Button variant='outlined' color='error' onClick={() => dispatch(DeleteData(String(user.id)) as any)}>
                  Delete
                </Button>

                <Button onClick={() => handleEdit(user)} variant='outlined'>
                  Edit
                </Button>

                <input
                  type="checkbox"
                  checked={user.status}
                  onChange={() => dispatch(ChangeStatus(user))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} className='flex flex-col items-center bg-white/50'>
        <form onSubmit={formik.handleSubmit} className='flex flex-col p-50'>
          <input name="name" value={formik.values.name} onChange={formik.handleChange} placeholder='name' className='border-2 border-white p-2 bg-white' /> <br /> <br />
          <input name="location" value={formik.values.location} onChange={formik.handleChange} placeholder='location' className='border-2 border-white p-2 bg-white'   /> <br /> <br />
          <input name="age" value={formik.values.age} onChange={formik.handleChange} placeholder='age'  className='border-2 border-white p-2 bg-white' /> <br /> <br />

          <select name="status" value={String(formik.values.status)} onChange={(e) =>
            formik.setFieldValue("status", e.target.value === "true")
          } className='border-2 border-white p-2  bg-white' > 
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <Button type="submit" variant='contained'>Save</Button>
          <Button onClick={() => setOpenAdd(false)} color='error' variant='contained' >Cancel</Button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}  className='flex flex-col items-center bg-white/50'>
        <form onSubmit={formik.handleSubmit}  className='flex flex-col p-50 gap-10'>
          <input name="name" value={formik.values.name} onChange={formik.handleChange}  className='border-2 border-white p-2 bg-white'/>
          <input name="location" value={formik.values.location} onChange={formik.handleChange}  className='border-2 border-white p-2 bg-white'/>
          <input name="age" value={formik.values.age} onChange={formik.handleChange}  className='border-2 border-white p-2 bg-white'/>

          <select name="status" value={String(formik.values.status)} onChange={(e) =>
            formik.setFieldValue("status", e.target.value === "true")
          }  className='border-2 border-white p-2 bg-white'>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <Button type="submit" variant='contained'>Save</Button>
          <Button onClick={() => setOpenEdit(false)} color='error' variant='contained'>Cancel</Button>
        </form>
      </Modal>
    </div>
  )
}

export default App