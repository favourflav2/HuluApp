import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { save_Tv_Or_Movie,Save, get_All_Stuff } from "../api/authApi";

interface SelectedItem {
  genre: string;
  tvName: string;
  movieName: string;
  tvId: number;
  movieId: number;
  viewAllData: number;
}



interface HuluState {
  selectedGenre: SelectedItem | null;
  openGenreModal: boolean;
  movieItemDetailsModal:boolean
  tvItemDetailsModal:boolean;
  location: string | null;
  saveLoading:boolean
  savedData: Array<any>;
  savedError:any;
 
}

const initialState: HuluState = {
  selectedGenre: null,
  openGenreModal: false,
  movieItemDetailsModal:false,
  tvItemDetailsModal:false,
  location:null,
  saveLoading:false,
  savedData: [],
  savedError:"",

};

export const saveTvOrMovie = createAsyncThunk('save', async (itemData:Save , { rejectWithValue } ) => {
  try{
    const res = await save_Tv_Or_Movie(itemData)
    return res.data

  }catch(e:any){
    return rejectWithValue(e.response.data.msg);
  }
})

export const getAllStuff  =createAsyncThunk("getAllStuff", async (_, { rejectWithValue } )=>{
  try{
    const res = await get_All_Stuff()
    return res.data

  }catch(e:any){
    return rejectWithValue(e.response.data.msg);
  }
})

const huluSlice = createSlice({
  name: "huluSlice",
  initialState,
  reducers: {
    setSelectedGenre: (state) => {
      state.selectedGenre = null;
    },
    selectGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    openGenreModalFunc: (state) => {
      state.openGenreModal = true;
    },
    closeGenreModal: (state) => {
      state.openGenreModal = false;
    },
    openMovieItemDetials: (state,action) => {
      state.movieItemDetailsModal = true
      state.location = action.payload
    },
    closeMovieItemDetails: (state) => {
      state.movieItemDetailsModal = false
      state.location = null
    },
    openTvItemDetails: (state,action) => {
      state.tvItemDetailsModal = true
      state.location = action.payload
    },
    closeTvItemDetails: (state) => {
      state.tvItemDetailsModal = false
      state.location = null
    },
    setHuluError: (state) => {
      state.savedError = ''
    },
    setHuluLogout: (state) => {
      state.savedData = []
      state.savedError = ''
    },
    
  },
  extraReducers(builder) {
      builder

      // Save Tv or Movie
      .addCase(saveTvOrMovie.pending, (state) => {
        state.saveLoading = true;
      })
      .addCase(saveTvOrMovie.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.savedData = action.payload
      })
      .addCase(saveTvOrMovie.rejected, (state, action) => {
        state.saveLoading = false;
        state.savedError = action.payload;
      })


      // Get All My Stuff Data
      .addCase(getAllStuff.pending, (state) => {
        state.saveLoading = true;
      })
      .addCase(getAllStuff.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.savedData = action.payload
      })
      .addCase(getAllStuff.rejected, (state, action) => {
        state.saveLoading = false;
        state.savedError = action.payload;
      })
  },
});

export default huluSlice.reducer;
export const { setSelectedGenre, selectGenre, openGenreModalFunc, closeGenreModal,openMovieItemDetials, closeMovieItemDetails,openTvItemDetails,closeTvItemDetails, setHuluError,setHuluLogout } = huluSlice.actions;
