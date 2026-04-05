import type { Supplier } from '../types/supplier';

function escapeCsvField(value: string): string {
  const v = String(value);
  if (/[",\r\n]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

/** Descarga un único proveedor como CSV (UTF-8 con BOM para Excel). */
export function downloadSupplierCsv(s: Supplier): void {
  const headers = ['id', 'nombre', 'razonSocial', 'direccion'];
  const cells = [s.id, s.nombre, s.razonSocial, s.direccion].map((c) => escapeCsvField(String(c)));
  const csv = '\uFEFF' + [headers.join(','), cells.join(',')].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = s.nombre.replace(/[^\w\u00C0-\u024f\s-]/gi, '').trim().slice(0, 40) || 'proveedor';
  a.download = `${safeName}-${s.id}.csv`;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
