  import { atom } from "jotai";

export type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  status: boolean;
};
export const atomData=atom([
 { id: 1, name: "Kawsar", surname: "Tarakhil", age: 16, status: true },
    { id: 2, name: "Mursal", surname: "Qadir", age: 19, status: false },
    { id: 3, name: "Asra", surname: "Tarakhil", age: 20, status: true },
    { id: 4, name: "Muska", surname: "Zaher", age: 17, status: false },
    { id: 5, name: "Bushra", surname: "Tarakhil", age: 23, status: true },
    { id: 6, name: "Roya", surname: "Qadir", age: 28, status: false },
    { id: 7, name: "Lemarzala", surname: "Tarakhil", age: 24, status: true },
    { id: 8, name: "Maryam", surname: "Zaher", age: 22, status: false },
]);
export const deleteAtom=atom(null,(get,set,id)=>{
    set(
       atomData,
       get(atomData).filter((e)=>e.id !==id) ,
    );
});
export const addAtom=atom(null,(get,set,user:User)=>{
    set(atomData,[...get(atomData),user]);
});
   
export const editAtom=atom(null,(get,set,user:User)=>{
    set(atomData, get(atomData).map((u) => 
        u.id === user.id ? user : u

    ));
});
export const changeStatusAtom=atom(null,(get,set,id)=>{
    set(atomData,get(atomData).map((u)=>
     u.id===id?{...u,status:!u.status}:u
    ));
})