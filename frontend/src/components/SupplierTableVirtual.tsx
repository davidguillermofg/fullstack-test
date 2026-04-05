import { useMemo } from 'react';
import { Box, IconButton, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { TableVirtuoso } from 'react-virtuoso';
import type { Supplier } from '../types/supplier';

const HEADER_ROW_PX = 48;
const DATA_ROW_PX = 50;
const TABLE_PADDING_PX = 8;

function statusColor(id: number): 'success.main' | 'error.main' | 'warning.main' {
  const m = id % 3;
  if (m === 0) return 'success.main';
  if (m === 1) return 'error.main';
  return 'warning.main';
}

type Props = {
  items: Supplier[];
  onView: (s: Supplier) => void;
  onDelete: (s: Supplier) => void;
  onDownload: (s: Supplier) => void;
};

export function SupplierTableVirtual({ items, onView, onDelete, onDownload }: Props) {
  const tableHeightPx = useMemo(() => {
    const rowCount = Math.max(items.length, 1);
    const contentHeight = HEADER_ROW_PX + rowCount * DATA_ROW_PX + TABLE_PADDING_PX;
    const maxCap =
      typeof window !== 'undefined'
        ? Math.min(520, Math.round(window.innerHeight * 0.55))
        : 400;
    return Math.min(maxCap, contentHeight);
  }, [items.length]);

  return (
    <Box
      className="suppliers-print-table"
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <TableVirtuoso
        style={{ height: tableHeightPx }}
        data={items}
        fixedItemHeight={DATA_ROW_PX}
        computeItemKey={(_index, row) => String(row.id)}
        components={{
          Table: ({ style, ...props }) => (
            <Table
              {...props}
              size="small"
              style={style}
              sx={{ borderCollapse: 'separate' }}
            />
          ),
          TableHead: ({ style, ...props }) => <TableHead {...props} style={style} />,
        }}
        fixedHeaderContent={() => (
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 600, width: 72, bgcolor: 'grey.100' }}>
              ID
            </TableCell>
            <TableCell sx={{ width: 56, bgcolor: 'grey.100' }} />
            <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.100' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.100' }}>Razón social</TableCell>
            <TableCell sx={{ minWidth: 200, fontWeight: 600, bgcolor: 'grey.100' }}>Dirección</TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: 600,
                minWidth: 140,
                bgcolor: 'grey.100',
                displayPrint: 'none',
              }}
            >
              Acciones
            </TableCell>
          </TableRow>
        )}
        itemContent={(_i, row) => (
          <>
            <TableCell align="center">
              <Typography variant="body2" color="text.secondary">
                {row.id}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Box
                component="span"
                title="Estado"
                sx={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: statusColor(row.id),
                }}
              />
            </TableCell>
            <TableCell>{row.nombre}</TableCell>
            <TableCell>{row.razonSocial}</TableCell>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                {row.direccion}
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ whiteSpace: 'nowrap', displayPrint: 'none' }}>
              <IconButton size="small" color="inherit" aria-label="Ver" onClick={() => onView(row)}>
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="Descargar CSV" onClick={() => onDownload(row)}>
                <DownloadIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" aria-label="Eliminar" onClick={() => onDelete(row)}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </>
        )}
      />
    </Box>
  );
}
