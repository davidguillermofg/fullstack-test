import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { appInfoApi } from '../../services/appInfoApi';

export const fetchWelcomeInfo = createAsyncThunk(
  'appInfo/fetchWelcomeInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await appInfoApi.getAppInfo();
      return { welcomeMessage: data.message, version: data.version };
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { detail?: string } }; message?: string };
      return rejectWithValue(ax.response?.data?.detail ?? ax.message ?? 'No se pudo cargar la información');
    }
  }
);

interface AppInfoState {
  welcomeMessage: string | null;
  version: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppInfoState = {
  welcomeMessage: null,
  version: null,
  loading: false,
  error: null,
};

const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWelcomeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWelcomeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.welcomeMessage = action.payload.welcomeMessage;
        state.version = action.payload.version;
      })
      .addCase(fetchWelcomeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? 'Error';
      });
  },
});

export const { clearError } = appInfoSlice.actions;
export default appInfoSlice.reducer;
