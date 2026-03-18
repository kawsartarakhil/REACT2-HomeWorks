import React, { useEffect, useState } from "react";
import { useToDo } from "./store/todo";
import * as Yup from "yup";
import { useFormik } from "formik";
const addSchema = Yup.object().shape({
  name: Yup.string(),
  loaction: Yup.string(),
  age: Yup.number(),
  status: Yup.boolean(),
});
const App = () => {
  const {
    data,
    getData,
    addData,
    deleteData,
    editData,
    changeStatus,
    setSearch,
    setStatus,
  } = useToDo();
  const [idx, setIdx] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      age: 0,
      status: false,
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      if (idx === null) {
        addData({
          id: Date.now(),
          name: values.name,
          location: values.location,
          age: values.age,
          status: values.status,
        });
        setOpenAdd(false);
      } else {
        editData({
          id: idx,
          name: values.name,
          location: values.location,
          age: values.age,
          status: values.status,
        });
        setOpenEdit(false);
        setIdx(null);
      }
      formik.resetForm();
    },
  });
  const handleEdit = (user) => {
    formik.setFieldValue("name", user.name);
    formik.setFieldValue("location", user.location);
    formik.setFieldValue("age", user.age);
    formik.setFieldValue("status", user.status);
    setIdx(user.id);
    setOpenEdit(true);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>location</th>
            <th>Status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user)=>{
           return(
             <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.status?"Active":"Inactive"}</td>
              <td>
               <button>
                edit
               </button>
                 <button>
                delete
               </button>
               <input type="checkbox" />
              </td>
            </tr>
           )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
