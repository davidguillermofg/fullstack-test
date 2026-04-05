import api from './api';
import type { PagedResponse, Supplier, SupplierRequest } from '../types/supplier';

export const suppliersApi = {
  getPage: (page: number, size: number) =>
    api
      .get<PagedResponse<Supplier>>('/suppliers', { params: { page, size } })
      .then((r) => r.data),
  create: (body: SupplierRequest) =>
    api.post<Supplier>('/suppliers', body).then((r) => r.data),
  remove: (id: number) => api.delete(`/suppliers/${id}`),
};
