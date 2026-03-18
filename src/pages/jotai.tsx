import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  AddDataAtom,
  ChangeStatusAtom,
  DeleteAtom,
  EditDataAtom,
  loadableAtom,
  searchAtom,
  selectAtom
} from "../store/storeJotai";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const addSchema = Yup.object().shape({
  name: Yup.string(),
  age: Yup.number(),
  location: Yup.string(),
  status: Yup.boolean(),
});

const Jotai = () => {
  const [{ data, state }] = useAtom(loadableAtom);
  const [, deleteUser] = useAtom(DeleteAtom);
  const [, addUser] = useAtom(AddDataAtom);
  const [, editUser] = useAtom(EditDataAtom);
  const [,changeStatus]=useAtom(ChangeStatusAtom)
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idx, setIdx] = useState(null);
  const [search, setSearch] = useAtom(searchAtom); 
  const [slcStatus,setSlcStatus] = useAtom(selectAtom);
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
        addUser({
          id: Date.now(),
          name: values.name,
          location: values.location,
          age: values.age,
          status: values.status,
        });
        setOpenAdd(false)
      } else {
        editUser({
          id: idx,
          name: values.name,
          location: values.location,
          age: values.age,
          status: values.status,
        });
        setIdx(null),setOpenEdit(false)
      }
    },
  });

  const handleEdit=(user)=>{
    formik.setFieldValue("name",user.name)
    formik.setFieldValue("location",user.location)
    formik.setFieldValue("age",user.age)
    formik.setFieldValue("status",user.status)
    setIdx(user.id)
    setOpenEdit(true)
  }
  if (state === "loading") {
    return <div>Loading....</div>;
  }
  return (
    state === "hasData" && (
      <div className="flex flex-col items-center p-30">
        <div className="flex gap-45 items-center">
          <input
            type="search"
            placeholder="search"
            className="p-2 border-2 m-10"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            className="w-30 h-11"
            onClick={() => {setOpenAdd(true)
                setIdx(null)
                formik.resetForm()
            }}
          >
            Add
          </Button>
          <select className="h-12 font-bold border-2  w-30" value={slcStatus}
            onChange={(e)=>setSlcStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <table className="w-[70%] border">
          <thead className="h-13 text-[18px]">
            <tr>
              <th>id</th>
              <th>name</th>
              <th>loaction</th>
              <th>age</th>
              <th>status</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => {
              return (
                <tr className="h-10 text-center border" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.location}</td>
                  <td>{user.age}</td>
                  <td>{user.status ? "Active" : "Inactive"}</td>
                  <td className="flex gap-2 justify-center m-1">
                    <Button variant="outlined" onClick={()=>handleEdit(user)}>Edit</Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>

                    <input type="checkbox" checked={user.status} onChange={()=>changeStatus(user)}/>
                  </td>
                </tr>
              );
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
  );
};

export default Jotai;
