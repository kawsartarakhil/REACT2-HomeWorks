import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const api ="https://6966d79ebbe157c088b05041.mockapi.io/pro"

const intailstate:TodoState={
    data:[],
    isLoading:false
}
export const toDoSlice=createSlice({
    name:'todo',
    initialState:intailstate,
    reducers:{},
    extraReducers:(builder)=> {
       builder.addCase(GetData.pending,(state,action)=>{
        state.isLoading=true;
       }) ;
       builder.addCase(GetData.fulfilled,(state,action)=>{
        state.data=action.payload
        state.isLoading=false;
    });

     builder.addCase(SearchData.pending,(state,action)=>{
        state.isLoading=true;
       }) ;
       builder.addCase(SearchData.fulfilled,(state,action)=>{
        state.data=action.payload
        state.isLoading=false;
    });

     builder.addCase(SelectData.pending,(state,action)=>{
        state.isLoading=true;
       }) ;
       builder.addCase(SelectData.fulfilled,(state,action)=>{
        state.data=action.payload
        state.isLoading=false;
    });
    },
});
export const GetData=createAsyncThunk("todo/GetData",async()=>{
    try {
       const {data}=await axios.get(api)
       return data 
    } catch (error) {
        console.error(error);  
    }
});
export const AddData=createAsyncThunk("todo/AddData",async(newUser,{dispatch})=>{
    try {
       await axios.post(api,newUser)
       dispatch(GetData())
    } catch (error) {
        console.error(error);  
    }
});
export const DeleteData=createAsyncThunk("todo/DeleteData",async(id,{dispatch})=>{
    try {
       await axios.delete(`${api}/${id}`)
       dispatch(GetData())
    } catch (error) {
        console.error(error);  
    }
});
export const EditData=createAsyncThunk("todo/EditData",async(newUser,{dispatch})=>{
    try {
       await axios.put(`${api}/${newUser.id}`,newUser)
       dispatch(GetData())
    } catch (error) {
        console.error(error);  
    }
});
export const ChangeStatus=createAsyncThunk("todo/ChangeStatus",async(user,{dispatch})=>{
    try {
       await axios.put(`${api}/${user.id}`,{
        ...user,
        status:!user.status
       })
       dispatch(GetData())
    } catch (error) {
        console.error(error);  
    }
});
export const SearchData=createAsyncThunk("todo/SearchData",async(search)=>{
    try {
        const {data}=await axios.get(`${api}?name=${search}`)
        return data
    } catch (error) {
        console.error(error);
    }
});
export const SelectData=createAsyncThunk("todo/SelectData",async(status)=>{
    try {
        if(status==='all'){
        const {data}=await axios.get(api)
        return data
        }
        const value=status==='active';

        const {data}=await axios.get(`${api}?status=${value}`)
        return data
    } catch (error) {
        console.error(error);
    }
});
export const {}=toDoSlice.actions

export default toDoSlice.reducer