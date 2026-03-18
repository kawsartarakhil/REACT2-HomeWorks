import {atom} from 'jotai'
import axios from 'axios'
import {loadable} from 'jotai/utils'
const Api="https://6966d79ebbe157c088b05041.mockapi.io/pro"
const refreshAtom=atom(false)

export const searchAtom=atom("")
export const selectAtom=atom("")
const GetDataAtom=atom(async(get)=>{
    get(refreshAtom)
    const searchValue=get(searchAtom)
    const selectValue=get(selectAtom)
    try {
        const {data}=await axios.get(
          searchValue&&selectValue
          ?`${Api}?name=${searchValue}&status=${selectValue}`
          :searchValue
          ?`${Api}?name=${searchValue}`
          :selectValue
          ?`${Api}?status=${selectValue}`
          :Api
        )
        return data
    } catch (error) {
        console.error(error);
        
    }
});

export const DeleteAtom=atom(null,async(get,set,id)=>{
try {
    await axios.delete(`${Api}/${id}`)
    set(refreshAtom,!get(refreshAtom))
} catch (error) {
    console.error(error);
}
})

export const AddDataAtom=atom(null,async(get,set,newUser)=>{
try {
    await axios.post(Api,newUser)
    set(refreshAtom,!get(refreshAtom))
} catch (error) {
    console.error(error);
}
});

export const EditDataAtom=atom(null,async(get,set,newUser)=>{
try {
    await axios.put(`${Api}/${newUser.id}`,newUser)
    set(refreshAtom,!get(refreshAtom))
} catch (error) {
    console.error(error);
}
});

export const ChangeStatusAtom=atom(null,async(get,set,user)=>{
try {
    await axios.put(`${Api}/${user.id}`,{
        ...user,
        status:!user.status
    })
    set(refreshAtom,!get(refreshAtom))
} catch (error) {
    console.error(error);
}
});
export const loadableAtom =loadable(GetDataAtom)
 