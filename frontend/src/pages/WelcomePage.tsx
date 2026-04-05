import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GAPSI_LOGO_PNG } from '../constants/branding';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWelcomeInfo } from '../store/slices/appInfoSlice';

export function WelcomePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { welcomeMessage, version, loading, error } = useAppSelector((s) => s.appInfo);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(fetchWelcomeInfo());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.100',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Card
          className="welcome-card"
          elevation={3}
          sx={{ maxWidth: 420, width: '100%', borderRadius: 2, overflow: 'visible' }}
        >
          <CardHeader
            sx={{ bgcolor: 'grey.200', py: 1.5 }}
            title={
              <Typography component="span" variant="subtitle1" fontWeight={600} color="text.secondary">
                e-Commerce Gapsi
              </Typography>
            }
            action={
              <>
                <IconButton
                  aria-label="Menú"
                  size="small"
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem
                    onClick={() => {
                      setMenuAnchor(null);
                      navigate('/proveedores');
                    }}
                  >
                    Ir a proveedores
                  </MenuItem>
                </Menu>
              </>
            }
          />
          <CardContent sx={{ textAlign: 'center', py: 5, px: 3 }}>
            {loading && (
              <Box sx={{ py: 5 }}>
                <CircularProgress color="primary" aria-label="Cargando" />
              </Box>
            )}
            {error && !loading && (
              <Alert severity="error" sx={{ textAlign: 'left' }}>
                {error}
              </Alert>
            )}
            {!loading && !error && (
              <>
                <Box className="welcome-avatar-circle" sx={{ mb: 3 }}>
                  <img src={GAPSI_LOGO_PNG} alt="Gapsi — avatar de bienvenida" />
                </Box>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                  {welcomeMessage ?? '—'}
                </Typography>
                <Button variant="contained" size="large" sx={{ px: 5, py: 1.5 }} onClick={() => navigate('/proveedores')}>
                  Continuar
                </Button>
              </>
            )}
          </CardContent>
          <Box
            sx={{
              px: 2,
              py: 1,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              versión {version ?? '—'}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
