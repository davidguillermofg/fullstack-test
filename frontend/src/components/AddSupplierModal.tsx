import { useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type SupplierFormValues = {
  nombre: string;
  razonSocial: string;
  direccion: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  onSubmit: (values: SupplierFormValues) => void;
  submitting: boolean;
  error: string | null;
};

const empty: SupplierFormValues = { nombre: '', razonSocial: '', direccion: '' };

export function AddSupplierModal({ show, onClose, onSubmit, submitting, error }: Props) {
  const [values, setValues] = useState<SupplierFormValues>(empty);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const n = values.nombre.trim();
    const r = values.razonSocial.trim();
    const d = values.direccion.trim();
    if (!n || !r || !d) {
      setLocalError('Complete todos los campos.');
      return;
    }
    onSubmit({ nombre: n, razonSocial: r, direccion: d });
  };

  const handleClose = () => {
    setValues(empty);
    setLocalError(null);
    onClose();
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        Agregar proveedor
        <IconButton aria-label="Cerrar" onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {(error || localError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {localError ?? error}
            </Alert>
          )}
          <TextField
            id="sup-nombre"
            label="Nombre"
            value={values.nombre}
            onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 200 }}
            autoComplete="off"
          />
          <TextField
            id="sup-razon"
            label="Razón social"
            value={values.razonSocial}
            onChange={(e) => setValues((v) => ({ ...v, razonSocial: e.target.value }))}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 300 }}
          />
          <TextField
            id="sup-dir"
            label="Dirección"
            value={values.direccion}
            onChange={(e) => setValues((v) => ({ ...v, direccion: e.target.value }))}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
            inputProps={{ maxLength: 500 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button type="button" onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={submitting} sx={{ minWidth: 100 }}>
            {submitting ? <CircularProgress size={22} color="inherit" /> : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
