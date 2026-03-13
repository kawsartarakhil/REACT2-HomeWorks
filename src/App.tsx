import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { addUser,deleteUser,editUser,changeStatus } from './reducer/counter'
import { useFormik } from 'formik'
const addSchema=Yup.object().shape({
  name:Yup.string(),
  surname:Yup.string(),
  age:Yup.number(),
  status:Yup.boolean()
})
const App = () => {
  const{data}=useSelector((store)=>store.counter);
  const dispatch=useDispatch();
  const [openAdd,setOpenAdd]=useState(false);
   const [openEdit,setOpenEdit]=useState(false);
    const [idx,setIdx]=useState(null);
     const [search,setSearch]=useState("");
      const [slcstatus,setslcStatus]=useState("all");

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: 0,
      status: false,
    },
    validationSchema: addSchema,
    onSubmit: (user) => {
     if(idx===null){
      dispatch( addUser({
        id: Date.now(),
        name: user.name,
        surname: user.surname,
        age: user.age,
        status: user.status,
      }))
      setOpenAdd(false)
     }else{
      
      dispatch(editUser({
        id:idx,
         name: user.name,
        surname: user.surname,
        age: user.age,
        status: user.status,
      }))
      setIdx(null),setOpenEdit(false)
     }
    },
    
  });
  const handleEdit=((user)=>{
    formik.setFieldValue("name",user.name)
    formik.setFieldValue("surname",user.surname)
    formik.setFieldValue("age",user.age)
    formik.setFieldValue("status",user.status)
    setOpenEdit(true)
    setIdx(user.id)
  });
  const filter=data.filter((u)=>{
    const searchFilter=u.name.toLowerCase().includes(search.toLowerCase()) ||u.surname.toLowerCase().includes(search.toLowerCase())
    const slcFilter=slcstatus==='all'||(slcstatus==='active'&&u.status)||(slcstatus==='inactive'&&!u.status)
    return searchFilter&&slcFilter
  })
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-6xl font-bold text-blue-950'>User list</h1>
        
      <div className="flex gap-90 m-20">
        <input type="search" placeholder='Search...' className='h-10 p-2 border-3 border-blue-950 w-60' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <select className='h-10 w-30 border p-2 border-3 border-blue-950 font-bold text-blue-900' value={slcstatus} onChange={(e)=>setslcStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className='h-10 w-30 p-2 font-bold border-3 border-blue-950 text-blue-900' onClick={()=>setOpenAdd(true)}>Add</button>
      </div>
      {(openAdd || openEdit) && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
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
      <table className='w-[80%] '>
        <thead>
          <tr className='border-2 border-blue-950 text-blue-900 text-[18px] h-13'>
          <th>#id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
           {filter.map((user)=>{
            return(
              <tr key={user.id} className='border-2 border-blue-950 text-center h-10 text-gray-600 font-bold'>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td className={user.status?"text-green-700":"text-red-700"}>{user.status?"Active":"Inactive"}</td>
                <td className='flex  gap-5 justify-center mt-2'>
                  <button className='text-blue-800 text-[18px]' onClick={()=>handleEdit(user)}>Edit</button>
                  <button className='text-red-700 text-[18px]' onClick={()=>dispatch(deleteUser(user.id))}>Delete</button>
                  <input type="checkbox" checked={user.status} onChange={()=>dispatch(changeStatus(user.id))}/>
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


