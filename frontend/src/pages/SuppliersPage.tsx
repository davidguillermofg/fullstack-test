import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import PrintIcon from '@mui/icons-material/Print';
import { AppHeader } from '../components/AppHeader';
import { AddSupplierModal } from '../components/AddSupplierModal';
import { SupplierPagination } from '../components/SupplierPagination';
import { SupplierTableVirtual } from '../components/SupplierTableVirtual';
import { ViewSupplierModal } from '../components/ViewSupplierModal';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  clearMutationError,
  createSupplier,
  deleteSupplier,
  fetchSuppliersPage,
  resetList,
} from '../store/slices/suppliersSlice';
import type { Supplier } from '../types/supplier';
import { downloadSupplierCsv } from '../utils/csv';

export function SuppliersPage() {
  const dispatch = useAppDispatch();
  const {
    items,
    totalPages,
    totalElements,
    currentPage,
    loading,
    error,
    mutationError,
  } = useAppSelector((s) => s.suppliers);

  const [showAdd, setShowAdd] = useState(false);
  const [viewing, setViewing] = useState<Supplier | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(resetList());
    dispatch(fetchSuppliersPage({ page: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (!loading && items.length === 0 && totalElements > 0 && currentPage > 0) {
      dispatch(fetchSuppliersPage({ page: currentPage - 1 }));
    }
  }, [loading, items.length, totalElements, currentPage, dispatch]);

  const goToPage = useCallback(
    (page: number) => {
      const p = Math.max(0, Math.min(page, Math.max(0, totalPages - 1)));
      dispatch(fetchSuppliersPage({ page: p }));
    },
    [dispatch, totalPages]
  );

  const handleAddSubmit = async (values: {
    nombre: string;
    razonSocial: string;
    direccion: string;
  }) => {
    setSubmitting(true);
    dispatch(clearMutationError());
    try {
      await dispatch(createSupplier(values)).unwrap();
      setShowAdd(false);
      dispatch(fetchSuppliersPage({ page: 0 }));
    } catch {
      /* mutationError en Redux */
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (s: Supplier) => {
    if (!window.confirm(`¿Eliminar al proveedor "${s.nombre}"?`)) {
      return;
    }
    dispatch(clearMutationError());
    try {
      await dispatch(deleteSupplier(s.id)).unwrap();
      await dispatch(fetchSuppliersPage({ page: currentPage })).unwrap();
    } catch {
      /* error en slice */
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const showInitialSpinner = loading && totalElements === 0;
  const showTable = totalElements > 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Box className="print-hidden">
        <AppHeader />
      </Box>
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Box className="print-hidden">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" spacing={1} alignItems="center" color="primary.main">
              <GroupsIcon sx={{ fontSize: 32 }} />
              <Typography component="h1" variant="h6" fontWeight={600}>
                Administración de proveedores
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-end' }}>
              <Stack alignItems="center" spacing={0.5}>
                <IconButton
                  color="primary"
                  aria-label="Agregar elemento"
                  onClick={() => {
                    dispatch(clearMutationError());
                    setShowAdd(true);
                  }}
                  sx={{
                    border: 2,
                    borderColor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.light', borderColor: 'primary.dark' },
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography variant="caption" color="primary" sx={{ whiteSpace: 'nowrap' }}>
                  Agregar elemento
                </Typography>
              </Stack>
              <Stack alignItems="center" spacing={0.5}>
                <IconButton
                  color="error"
                  aria-label="Imprimir elemento"
                  onClick={handlePrint}
                  sx={{
                    border: 2,
                    borderColor: 'error.main',
                    '&:hover': { bgcolor: 'error.light', borderColor: 'error.dark' },
                  }}
                >
                  <PrintIcon />
                </IconButton>
                <Typography variant="caption" color="error" sx={{ whiteSpace: 'nowrap' }}>
                  Imprimir elemento
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'none',
            '@media print': { display: 'block', mb: 2 },
          }}
        >
          <Typography variant="h6" component="h1" gutterBottom>
            Administración de proveedores
          </Typography>
          {totalPages > 0 && (
            <Typography variant="body2" color="text.secondary">
              Página {currentPage + 1} de {totalPages} · {items.length} elemento(s) en esta hoja
            </Typography>
          )}
        </Box>

        {mutationError && (
          <Alert severity="warning" className="print-hidden" sx={{ mb: 2 }}>
            {mutationError}
          </Alert>
        )}
        {error && (
          <Alert severity="error" className="print-hidden" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {showInitialSpinner && (
          <Box className="print-hidden" sx={{ py: 5, textAlign: 'center' }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {!loading && totalElements === 0 && !error && (
          <Typography color="text.secondary" className="print-hidden">
            No hay proveedores registrados.
          </Typography>
        )}

        {showTable && (
          <>
            <Box sx={{ position: 'relative' }}>
              {loading && (
                <Box
                  className="print-hidden"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    minHeight: 120,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    pt: 5,
                    bgcolor: 'rgba(255,255,255,0.85)',
                    zIndex: 1,
                    borderRadius: 1,
                  }}
                >
                  <CircularProgress color="primary" />
                </Box>
              )}
              <SupplierTableVirtual
                items={items}
                onView={setViewing}
                onDelete={handleDelete}
                onDownload={downloadSupplierCsv}
              />
            </Box>
            <Box className="print-hidden">
              <SupplierPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                loading={loading}
                onPageChange={goToPage}
              />
            </Box>
          </>
        )}
      </Container>

      <AddSupplierModal
        show={showAdd}
        onClose={() => {
          setShowAdd(false);
          dispatch(clearMutationError());
        }}
        onSubmit={handleAddSubmit}
        submitting={submitting}
        error={mutationError}
      />
      <ViewSupplierModal supplier={viewing} onClose={() => setViewing(null)} />
    </Box>
  );
}
