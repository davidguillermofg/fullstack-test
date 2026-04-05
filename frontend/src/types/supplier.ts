export interface Supplier {
  id: number;
  nombre: string;
  razonSocial: string;
  direccion: string;
}

export interface SupplierRequest {
  nombre: string;
  razonSocial: string;
  direccion: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
