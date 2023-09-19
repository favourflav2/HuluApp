import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { change_Email, change_Name, log_In, sign_Up } from "../api/authApi";

interface User {
  id: number | string;
  [key: string]: any;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
};

export const signUp = createAsyncThunk("signup", async ({ formData, navigate }: any, { rejectWithValue }) => {
  try {
    const res = await sign_Up(formData);
    navigate("/Home");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const logIn = createAsyncThunk("login", async ({ formData, navigate }: any, { rejectWithValue }) => {
  try {
    const res = await log_In(formData);
    navigate("/Home");
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});

export const changeName = createAsyncThunk("change", async ({ formData }: any, { rejectWithValue }) => {
  try {
    const res = await change_Name(formData);
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});


export const changeEmail = createAsyncThunk("changeEmail", async ({ formData }: any, { rejectWithValue }) => {
  try {
    const res = await change_Email(formData);
    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.response.data.msg);
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("profile");
      state.user = null;
    },
    setError: (state) => {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Log In
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change User Name
      .addCase(changeName.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeName.fulfilled, (state, action) => {
        let { token } = JSON.parse(localStorage.getItem("profile") || "{}");
        localStorage.setItem("profile", JSON.stringify({ user: { ...action.payload }, token: token }));
        //@ts-ignore
        state.user = { user: { ...action.payload }, token: token };
        state.loading = false;
      })
      .addCase(changeName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Email
      .addCase(changeEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        let { token } = JSON.parse(localStorage.getItem("profile") || "{}");
        localStorage.setItem("profile", JSON.stringify({ user: { ...action.payload }, token: token }));
        //@ts-ignore
        state.user = { user: { ...action.payload }, token: token };
        state.loading = false;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { setUser, setLogout, setError } = authSlice.actions;
