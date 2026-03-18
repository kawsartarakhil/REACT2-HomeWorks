import axios from "axios";
import { data } from "react-router-dom";
import {create} from 'zustand'
const api = "https://6966d79ebbe157c088b05041.mockapi.io/pro";

export type User={
    id:number,
    name:string,
    location:string,
    age:number,
    status:boolean
} 
export type Store={
    data:User[];
    search: string;
    status: string;
    getData:()=>void;
    addData:(newUser:User)=>void;
    editData:(newUser:User)=>void;
    deleteData:(id:number)=>void;
    changeStatus:(user:User)=>void;
    setSearch: (value: string) => void;
  setStatus: (value: string) => void;
}
export const useTodo=create<Store>((set,get)=>({
    data:[],
    search: "",    
  status: "all",
    getData:async()=>{
         const { search, status } = get();
       try {
        let url=api
          if (search && status !== "all") {
      url = `${api}?name=${search}&status=${status === "active"}`;
    } else if (search) {
      url = `${api}?name=${search}`;
    } else if (status !== "all") {
      url = `${api}?status=${status === "active"}`;
    }
         const {data}=await axios.get(url)
        set({data})
       } catch (error) {
        console.error(error);  
       }
    },
    addData:async(newUser:User)=>{
        try {
            await axios.post(api,newUser)
            get().getData()
        } catch (error) {
            console.error(error);
        }
    },
    editData:async(newUser:User)=>{
        try {
            await axios.put(`${api}/${newUser.id}`,newUser)
            get().getData()
        } catch (error) {
            console.error(error);
        }
    },
    deleteData:async(id:number)=>{
        try {
            await axios.delete(`${api}/${id}`)
            get().getData()
        } catch (error) {
            console.error(error);
        }
    },
    changeStatus:async(user:User)=>{
        try {
            await axios.put(`${api}/${user.id}`,{
                ...user,
                status:!user.status,
            })
            get().getData()
        } catch (error) {
            console.error(error); 
        }
    },
    setSearch: (value) => {
  set({ search: value });
  get().getData();
},

setStatus: (value) => {
  set({ status: value });
  get().getData();
},
}))