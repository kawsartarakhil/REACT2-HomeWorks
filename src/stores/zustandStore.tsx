import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  status: boolean;
};
export type TodoStore = {
  data: User[]
  addUser: (user: User) => void
  editUser: (user: User) => void
  deleteUser: (id: number) => void
  changeStatus: (id: number) => void
}
export const useTodo = create<TodoStore>((set) => ({
  data: [
    { id: 1, name: "Kawsar", surname: "Tarakhil", age: 16, status: true },
    { id: 2, name: "Mursal", surname: "Qadir", age: 19, status: false },
    { id: 3, name: "Asra", surname: "Tarakhil", age: 20, status: true },
    { id: 4, name: "Muska", surname: "Zaher", age: 17, status: false },
    { id: 5, name: "Bushra", surname: "Tarakhil", age: 23, status: true },
    { id: 6, name: "Roya", surname: "Qadir", age: 28, status: false },
    { id: 7, name: "Lemarzala", surname: "Tarakhil", age: 24, status: true },
    { id: 8, name: "Maryam", surname: "Zaher", age: 22, status: false },
  ],

  addUser:(user)=>
    set((state)=>({
        data:[...state.data,user],
    })),
  editUser:(user)=>
    set((state)=>({
        data:state.data.map((u)=>
        user.id===u.id?user:u
        )
    })),
    deleteUser:(id)=>
    set((state)=>({
        data:state.data.filter((u)=>u.id!==id)
    })),
    changeStatus:(id)=>
        set((state)=>({
            data:state.data.map((u)=>
            u.id===id?{...u,status:!u.status}:u
            )
        }))
}))