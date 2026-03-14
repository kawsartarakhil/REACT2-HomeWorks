import { createSlice } from "@reduxjs/toolkit"

export interface IData{
  id:number,
  name:string,
  surname:string,
  status:boolean,
  age:number
}
export type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  status: boolean;
};
export interface DataState{
  data:IData[],
}

const initialState: DataState={
  data:[
     { id: 1, name: "Kawsar", surname: "Tarakhil", age: 16, status: true },
    { id: 2, name: "Mursal", surname: "Qadir", age: 19, status: false },
    { id: 3, name: "Asra", surname: "Tarakhil", age: 20, status: true },
    { id: 4, name: "Muska", surname: "Zaher", age: 17, status: false },
    { id: 5, name: "Bushra", surname: "Tarakhil", age: 23, status: true },
    { id: 6, name: "Roya", surname: "Qadir", age: 28, status: false },
    { id: 7, name: "Lemarzala", surname: "Tarakhil", age: 24, status: true },
    { id: 8, name: "Maryam", surname: "Zaher", age: 22, status: false },
  ]
}

export const dataSlice=createSlice({
  name:'to do list',
  initialState,
  reducers:{
    deleteUser:(state,{payload})=>{
      state.data=state.data.filter((e)=>e.id !==payload)
    },
    addUser:(state,action)=>{
      state.data=[...state.data,action.payload];
    },
    editUser:(state,action)=>{
     state.data=state.data.map((u)=>
     u.id===action.payload.id?action.payload:u
    )
    },
    changeStatus:(state,{payload})=>{
      state.data=state.data.map((u)=>
      u.id===payload?{...u,status:!u.status}:u
      )

    }

  }
})

export const {deleteUser,addUser,editUser,changeStatus}=dataSlice.actions

export default dataSlice.reducer