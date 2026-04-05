import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Supplier } from '../types/supplier';

type Props = {
  supplier: Supplier | null;
  onClose: () => void;
};

export function ViewSupplierModal({ supplier, onClose }: Props) {
  return (
    <Dialog open={supplier != null} onClose={onClose} fullWidth maxWidth="sm">
      {supplier && (
        <>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
            Detalle proveedor
            <IconButton aria-label="Cerrar" onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <div>
                <Typography variant="caption" color="text.secondary" display="block">
                  Nombre
                </Typography>
                <Typography>{supplier.nombre}</Typography>
              </div>
              <div>
                <Typography variant="caption" color="text.secondary" display="block">
                  Razón social
                </Typography>
                <Typography>{supplier.razonSocial}</Typography>
              </div>
              <div>
                <Typography variant="caption" color="text.secondary" display="block">
                  Dirección
                </Typography>
                <Typography>{supplier.direccion}</Typography>
              </div>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button variant="contained" onClick={onClose}>
              Cerrar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
