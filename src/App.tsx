// App.tsx
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTodo } from "./store/todo";
import { ThemeContext} from "./mode/themeContext";

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
 

export default function App() {
   const { data, addUser, editUser, deleteUser, changeStatus } = useTodo();
  const { theme, setTheme } = useContext(ThemeContext);

  const [idx, setIdx] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
 const [search, setSearch] = useState(""); 
const [filterStatus, setFilterStatus] = useState("all"); 
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: 0,
      status: false,
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
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
          age: Number(values.age),
          status: values.status,
        });
        setOpenAdd(false);
      }
      formik.resetForm();
    },
  });

  const handleEdit = (user) => {
    formik.setFieldValue("name", user.name);
    formik.setFieldValue("surname", user.surname);
    formik.setFieldValue("age", user.age);
    formik.setFieldValue("status", user.status);
    setIdx(user.id);
    setOpenEdit(true);
  };
  const filters =data.filter((u)=>{
    const searchUsers = u.name.toLowerCase().includes(search.toLocaleLowerCase())||
    u.surname.toLowerCase().includes(search.toLocaleLowerCase());
    const statusFilter= filterStatus=='all'||(filterStatus==='active'&&u.status) || (filterStatus==='inactive'&&!u.status);
    return searchUsers&&statusFilter;
  })
  

  return (
   
       <div
      className={
        theme === "light"
          ? "bg-white text-black min-h-screen flex flex-col items-center"
          : "bg-black text-white min-h-screen flex flex-col items-center"
      }
    >
      <h1 className="text-4xl font-bold m-10">User List</h1>
      <div className="flex gap-5 mb-5">
        <input type="search" className="border h-10 " placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <select className={`border  p-2 shadow-md ${theme=="dark"? "bg-black text-white":"bg-white text-black"}`} value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button onClick={() => setOpenAdd(true)} className="border p-2">
          Add User
        </button>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="border p-2"
        >
          Change Mode
        </button>
      </div>

      {(openAdd || openEdit) && (
  <dialog open>
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-3 p-5"
    >
      <input
        name="name"
        placeholder="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && formik.touched.name && (
        <span className="text-red-600 text-sm">{formik.errors.name}</span>
      )}

      <input
        name="surname"
        placeholder="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
      />
      {formik.errors.surname && formik.touched.surname && (
        <span className="text-red-600 text-sm">{formik.errors.surname}</span>
      )}

      <input
        name="age"
        type="number"
        value={formik.values.age}
        onChange={(e) =>
          formik.setFieldValue("age", Number(e.target.value))
        }
      />
      {formik.errors.age && formik.touched.age && (
        <span className="text-red-600 text-sm">{formik.errors.age}</span>
      )}

      <label>
        <input
          type="checkbox"
          name="status"
          checked={formik.values.status}
          onChange={(e) =>
            formik.setFieldValue("status", e.target.checked)
          }
        />{" "}
        Status
      </label>

      <button type="submit">{idx !== null ? "Update" : "Save"}</button>
      <button
        type="button"
        onClick={() => {
          setOpenAdd(false);
          setOpenEdit(false);
          formik.resetForm();
          setIdx(null);
        }}
      >
        Close
      </button>
    </form>
  </dialog>
)}

      <table className="border mt-10 w-[600px] text-center">
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
            <tr key={user.id} className="border">
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
    
  );
}
