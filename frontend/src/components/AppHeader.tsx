import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { GAPSI_LOGO_PNG } from '../constants/branding';

export function AppHeader() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', mb: 3 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, justifyContent: 'space-between', minHeight: 64 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'text.primary',
            }}
          >
            <Box
              component="img"
              src={GAPSI_LOGO_PNG}
              alt="Gapsi"
              sx={{ height: 40, width: 'auto', maxWidth: { xs: '50vw', sm: 220 } }}
            />
            <Typography component="span" variant="h6" fontWeight={600} sx={{ display: { xs: 'none', sm: 'inline' } }}>
              e-Commerce Gapsi
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/proveedores"
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<LocalShippingIcon />}
          >
            Proveedores
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
