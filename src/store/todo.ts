import { create } from "zustand";
import axios from 'axios'
const api = "https://6966d79ebbe157c088b05041.mockapi.io/pro";

export const useToDo =create((set,get)=>({
    data:[],
    search:"",
    status:"all",
    getData:async()=>{
        const {search,status}=get()
        
        try {
            let url=api
            if(search&&status!=='all'){
             url=`${api}?name=${search}&status=${status==='active'}`
            }
            else if(search){
                url=`${api}?name=${search}`
            }
            else if(status){
                url=`${api}?status=${status==='active'}`
            }
            const {data}=await axios.get(url)
            set({data})
        } catch (error) {
            console.error(error);
            
        }
    },
    addData:async(newUser)=>{
       try {
         await axios.post(api,newUser)
        get().getData()
       } catch (error) {
        console.error(error);
        
       }
    },
    editData:async(newUser)=>{
      try {
        await axios.put(`${api}/${newUser.id}`,newUser)
        get().getData()
      } catch (error) {
        console.error(error);
      }
    },
     deleteData:async(id)=>{
      try {
        await axios.delete(`${api}/${id}`)
        get().getData()
      } catch (error) {
        console.error(error);
      }
    },
     changeStatus:async(user)=>{
      try {
        await axios.put(`${api}/${user.id}`,{
            ...user,
            status:!user.status
        })
        get().getData()
      } catch (error) {
        console.error(error);
      }
    },

    setSearch:(value)=>{
        set({search:value})
        get().getData()
    },
    setSelect:(value)=>{
        set({status:value})
        get().getData()
    },
}))