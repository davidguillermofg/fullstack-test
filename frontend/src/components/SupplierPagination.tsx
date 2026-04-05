import { Box, Pagination, Stack, Typography } from '@mui/material';
import { PAGE_SIZE } from '../store/slices/suppliersSlice';

type Props = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  loading: boolean;
  onPageChange: (page: number) => void;
};

export function SupplierPagination({
  currentPage,
  totalPages,
  totalElements,
  loading,
  onPageChange,
}: Props) {
  if (totalPages <= 1 && totalElements === 0) {
    return null;
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      sx={{ mt: 2 }}
      className="print-hidden"
    >
      <Typography variant="body2" color="text.secondary">
        Mostrando{' '}
        {totalElements === 0
          ? '0'
          : `${currentPage * PAGE_SIZE + 1}–${Math.min((currentPage + 1) * PAGE_SIZE, totalElements)}`}{' '}
        de {totalElements} registro(s) · {PAGE_SIZE} por página
      </Typography>
      {totalPages > 0 && (
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(_, p) => onPageChange(p - 1)}
            disabled={loading}
            color="primary"
            showFirstButton
            showLastButton
            siblingCount={2}
            boundaryCount={1}
            size="small"
          />
        </Box>
      )}
    </Stack>
  );
}
