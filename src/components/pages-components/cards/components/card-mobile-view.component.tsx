import type React from 'react';
import { ICard } from '@apis/card/card.type';
import { useCards } from '@contexts/cards.context';
import useTranslation from 'next-translate/useTranslation';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import {
  Box,
  Chip,
  Card,
  Grid,
  Alert,
  Stack,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

// ----------------------------------------------------------------------

function CardsMobileView() {
  const { t } = useTranslation('common');

  const {
    paginatedCards,
    dispatchEditing,
    dispatchDeleting,
    setActivateDialog,
    setDeactivateDialog,
  } = useCards();

  const handleStatusToggle = (card: ICard) => {
    if (card.status === 'Active') {
      setDeactivateDialog(card.id);
    } else {
      setActivateDialog(card.id);
    }
  };

  return (
    <Grid container spacing={2}>
      {paginatedCards.length > 0 ? (
        paginatedCards.map(card => (
          <Grid
            key={card.id}
            size={{
              xs: 12,
            }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    {card.cardholderName}
                  </Typography>
                  <Chip
                    label={t(card.status)}
                    color={card.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                <Typography variant="body1">•••• {card.last4Digits}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton
                      size="small"
                      onClick={() => dispatchEditing(card)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => dispatchDeleting(card.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleStatusToggle(card)}
                      aria-label="toggle status"
                      color={card.status === 'Active' ? 'success' : 'default'}
                    >
                      {card.status === 'Active' ? (
                        <ToggleOffIcon />
                      ) : (
                        <ToggleOnIcon />
                      )}
                    </IconButton>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid
          size={{
            xs: 12,
          }}
        >
          <Alert severity="info">{t('noData')}</Alert>
        </Grid>
      )}
    </Grid>
  );
}

// ----------------------------------------------------------------------

export default CardsMobileView;
