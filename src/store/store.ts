import axios from 'axios'
import {atom} from 'jotai'
import {loadable} from 'jotai/utils'
const Api="https://6966d79ebbe157c088b05041.mockapi.io/pro"


const refreshAtom =atom(0);
const GetDataAtom=atom(async(get)=>{
    try {
        get(refreshAtom)
    const {data}=await axios.get(Api)

    return data
    } catch (error) {
        console.error(error);
        
    }
});


 export const DeleteAtomData=atom(null,async(get,set,id)=>{
    try {
    await axios.delete(`${Api}/${id}`)
    set(refreshAtom, get(refreshAtom)+1)
    } catch (error) {
        console.error(error);
        
    }
});

 export const EditAtomData=atom(null,async(get,set,newUser)=>{
    try {
    await axios.put(`${Api}/${newUser.id}`,newUser)
    set(refreshAtom, get(refreshAtom)+1)
    } catch (error) {
        console.error(error);
        
    }
});
export const loadableAtom=loadable(GetDataAtom)
