import axios from "axios";
import { create } from "zustand";

const api = "https://6966d79ebbe157c088b05041.mockapi.io/pro";

export type User = {
  id: number;
  name: string;
  age: number;
  location: string;
  status: boolean;
};

export type Store = {
  data: User[];
  getData: () => void;
  addData: (newUser: User) => void;
  editData: (newUser: User) => void;
  deleteData: (id: number) => void;
  changeStatus: (user: User) => void;
};

export const useToDo = create<Store>((set, get) => ({
  data: [],

  getData: async () => {
    try {
      const { data } = await axios.get(api);
      set({ data: data });
    } catch (error) {
      console.error(error);
    }
  },

  addData: async (newUser: User) => {
    try {
      await axios.post(api, newUser);
      get().getData();
    } catch (error) {
      console.error(error);
    }
  },

  editData: async (newUser: User) => {
    try {
      await axios.put(`${api}/${newUser.id}`, newUser);
      get().getData();
    } catch (error) {
      console.error(error);
    }
  },

  deleteData: async (id: number) => {
    try {
      await axios.delete(`${api}/${id}`);
      get().getData();
    } catch (error) {
      console.error(error);
    }
  },

  changeStatus: async (user: User) => {
    try {
      await axios.put(`${api}/${user.id}`, {
        ...user,
        status: !user.status,
      });
      get().getData();
    } catch (error) {
      console.error(error);
    }
  },
}));