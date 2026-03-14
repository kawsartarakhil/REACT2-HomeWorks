import { useAtom } from "jotai";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAtom, atomData, changeStatusAtom, deleteAtom, editAtom } from "./stores/jotaiStore";
import type { User } from "./stores/jotaiStore";
const addSchema = Yup.object().shape({
  name: Yup.string(),
  surname: Yup.string(),
  age: Yup.number(),
  status: Yup.boolean(),
});
const App = () => {
  const [data] = useAtom(atomData);
  const [, deleteData] = useAtom(deleteAtom);
  const [, addData] = useAtom(addAtom);
  const [openAdd, setOpenAdd] = useState(false);
  const [idx,setIdx]=useState<null|number>(null)
  const [openEdit,setopenEdit]=useState(false)
const [,editData]=useAtom(editAtom)
const [,changeStatusData]=useAtom(changeStatusAtom)
const [search,setSearch]=useState("")
const [slcStatus,setSelectStatus]=useState('all')
  const formik = useFormik({
    initialValues:{
      name: "",
      surname: "",
      age: 0,
      status: false,
    },
    validationSchema: addSchema,
    onSubmit: (user) => {
      if(idx==null){
        addData({
        id: Date.now(),
        name: user.name,
        surname: user.surname,
        age: user.age,
        status: user.status,
      });
      setOpenAdd(false)
      }else{
        editData({
        id: Number(idx),
        name: user.name,
        surname: user.surname,
        age: user.age,
        status: user.status,
        })
      }
    },
  });
  const handleEdit=(user:User)=>{
   formik.setFieldValue("name",user.name)
   formik.setFieldValue("surname",user.surname)
   formik.setFieldValue("age",user.age)
   formik.setFieldValue("status",user.status)
   setopenEdit(true)
   setIdx(user.id)
  }
   const filters=data.filter((u:User)=>{
      const searchFilter=u.name.toLowerCase().includes(search.toLowerCase()) ||u.surname.toLowerCase().includes(search.toLowerCase())
      const slcFilter=slcStatus==='all'||(slcStatus==='active'&&u.status)||(slcStatus==='inactive'&&!u.status)
      return searchFilter&&slcFilter
    })
  return (
      <div className="flex flex-col items-center text-blue-950">
              <h1 className='text-6xl font-bold text-blue-950 m-5'>User list</h1>
        <div className="flex gap-90 m-20">
        <input type="search" placeholder='Search...' className='h-10 p-2 border-3 border-blue-950 w-60' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <select className='h-10 w-30 border p-2 border-3 border-blue-950 font-bold text-blue-900' value={slcStatus} onChange={(e)=>setSelectStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className='h-10 w-30 p-2 font-bold border-3 border-blue-950 text-blue-900' onClick={()=>setOpenAdd(true)}>Add</button>
      </div>
       <div className="">
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
          setopenEdit(false)
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
       </div>
      <table className="border mt-10 w-[70%] text-center">
        <thead>
          <tr className="border h-15 text-[18px]">
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
            <tr key={user.id} className="border text-black h-10">
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
                  onClick={() => deleteData(user.id)}
                  className="text-red-600 ml-2"
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  className="ml-2"
                  onChange={() => changeStatusData(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
};

export default App;