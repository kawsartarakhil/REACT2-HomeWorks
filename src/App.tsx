import { useAtom } from 'jotai'
import React from 'react'
import { loadableAtom,DeleteAtomData } from './store/store'
import * as Yup from "yup";
import { useFormik } from "formik";
const addSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number(),
  location: Yup.string(),
  status: Yup.boolean(),
});
const App = () => {
  const [{data,state}]=useAtom(loadableAtom)
  const [,deleteUser]=useAtom(DeleteAtomData)
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
 if(state==='loading'){
  <div>Loading....</div>
 } return (
   state==="hasData"&&( 
   <div className='grid grid-cols-3 gap-10'>
             <div className="">
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
            </dialog>     </div>
        )}
      </div>
      </div>
    {data.map((user)=>{
      return(<div className="shadow flex flex-col items-center gap-2 p-2" key={user.id}>
        <h1>{user.name}</h1>
        <p>{user.location}</p>
        <p>{user.age}</p>
        <p>{user.status?"Active":"Inactive"}</p>
        <button onClick={()=>deleteUser(user.id)}>Delete</button>
      </div>)
    })}
   </div>
  ))
}

export default App