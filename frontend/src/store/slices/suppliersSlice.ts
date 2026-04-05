import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { suppliersApi } from '../../services/suppliersApi';
import type { Supplier, SupplierRequest } from '../../types/supplier';

const PAGE_SIZE = 5;

export const fetchSuppliersPage = createAsyncThunk(
  'suppliers/fetchPage',
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const data = await suppliersApi.getPage(page, PAGE_SIZE);
      return data;
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { detail?: string } }; message?: string };
      return rejectWithValue(ax.response?.data?.detail ?? ax.message ?? 'Error al cargar proveedores');
    }
  }
);

export const createSupplier = createAsyncThunk(
  'suppliers/create',
  async (body: SupplierRequest, { rejectWithValue }) => {
    try {
      return await suppliersApi.create(body);
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { detail?: string } }; message?: string };
      return rejectWithValue(ax.response?.data?.detail ?? ax.message ?? 'No se pudo crear el proveedor');
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  'suppliers/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await suppliersApi.remove(id);
      return id;
    } catch (err: unknown) {
      const ax = err as { response?: { data?: { detail?: string } }; message?: string };
      return rejectWithValue(ax.response?.data?.detail ?? ax.message ?? 'No se pudo eliminar');
    }
  }
);

interface SuppliersState {
  items: Supplier[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  mutationError: string | null;
}

const initialState: SuppliersState = {
  items: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  loading: false,
  error: null,
  mutationError: null,
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    resetList: (state) => {
      state.items = [];
      state.currentPage = 0;
      state.totalPages = 0;
      state.totalElements = 0;
    },
    clearMutationError: (state) => {
      state.mutationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliersPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliersPage.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, page } = action.payload;
        state.loading = false;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        state.currentPage = page;
        state.items = content;
      })
      .addCase(fetchSuppliersPage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? 'Error';
      })
      .addCase(createSupplier.pending, (state) => {
        state.mutationError = null;
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.mutationError = (action.payload as string) ?? 'Error';
      })
      .addCase(deleteSupplier.fulfilled, (state) => {
        state.mutationError = null;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.mutationError = (action.payload as string) ?? 'Error';
      });
  },
});

export const { resetList, clearMutationError } = suppliersSlice.actions;
export { PAGE_SIZE };
export default suppliersSlice.reducer;
