import {create} from 'zustand'
import axios from 'axios'
const url="https://6966d79ebbe157c088b05041.mockapi.io/pro"
export const useToDo=create((set,get)=>({
    data:[],
    search:"",
    status:"all",
    getData:async()=>{
        const {search,status}=get()
        try {
            let api=url
            if(search&&status !=='all'){
                api=`${url}?name=${search}&status=${status==='active'}`
            }else if(search){
                api=`${url}?name=${search}`
            }else if(status !=='all'){
                api=`${url}?status=${status==='active'}`
            }
            const {data}=await axios.get(api)
            set({data})
        } catch (error) {
            console.error(error);
            
        }
    },
    addData: async (newUser) => {
        try {
            await axios.post(url, newUser)
            get().getData()
        } catch (error) {
            console.error(error)

        }
    },
    editData:async(newUser)=>{
        try {
           await axios.put(`${url}/${newUser.id}`,newUser) 
           get().getData()
        } catch (error) {
            console.error(error);
            
        }
    },
    DeleteData:async(id)=>{
        try {
           await axios.delete(`${url}/${id}`) 
           get().getData()
        } catch (error) {
            console.error(error);
            
        }
     },
    changeStatus:async(user:User)=>{
        try {
            await axios.put(`${url}/${user.id}`,{
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