import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export let api = "http://37.27.29.18:8001/api/to-dos";
export let apiImages = "http://37.27.29.18:8001/images/";
export let apiStatus = "http://37.27.29.18:8001/completed"
export const GetUsers = createAsyncThunk(
  "user/get",
  async () => {
    let res = await axios.get(api);
    return res.data; 
  }
);

export const AddUser = createAsyncThunk(
  "user/add",
  async (formData) => {
    let res = await axios.post(api, formData);
    return res.data;
  }
);

export const AddUserImage = createAsyncThunk(
  "user/addImage",
  async ({ id, image }) => {
    let res = await axios.post(`${api}/${id}/images`, image, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  }
);

export const EditUser = createAsyncThunk(
  "user/edit",
  async ({ id, name, description }) => {
    const res = await axios.put(api, {
      id,
      name,
      description
    });
    return res.data;
  }
);

export const DeleteUser = createAsyncThunk(
  "user/delete",
  async (id) => {
    await axios.delete(api, { params: { id } });
    return id;
  }
);

export const DeleteUserImage = createAsyncThunk(
  "user/deleteImage",
  async ({ imageId }) => {
    await axios.delete(`${api}/images/${imageId}`);
    return { imageId };
  }
);

export const ToggleUserStatus = createAsyncThunk(
  "user/toggleStatus",
  async (id) => {
    try {
      await axios.put(`${apiStatus}`, null, { params: { id } });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: []
  },
  extraReducers: (builder) => {
    builder.addCase(GetUsers.fulfilled, (state, action) => {
      state.data = action.payload.data; 
    });

    builder.addCase(AddUser.fulfilled, (state, action) => {
      state.data.push(action.payload.data);
    });

    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter(e => e.id !== action.payload);
    });

    builder.addCase(AddUserImage.fulfilled, (state, action) => {
      let u = state.data.find(x => x.id === action.payload.id);
      if (u) u.images = action.payload.images;
    });

    builder.addCase(DeleteUserImage.fulfilled, (state, action) => {
  state.data.forEach(u => {
    if (u.images) {
      u.images = u.images.filter(i => i.id !== action.payload.imageId);
    }
  });
});
builder.addCase(EditUser.fulfilled, (state, action) => {
  const index = state.data.findIndex(u => u.id === action.payload.data.id);
  if (index !== -1) {
    state.data[index] = action.payload.data;
  }
});
builder.addCase(ToggleUserStatus.fulfilled, (state, action) => {
  const userId = action.payload; 
  const user = state.data.find(u => u.id === userId);
  if (user) {
    user.isCompleted = !user.isCompleted; 
  }
});
  }
});

export default userSlice.reducer;