import type React from 'react';
import { ICard } from '@apis/card/card.type';
import { useCards } from '@contexts/cards.context';
import useTranslation from 'next-translate/useTranslation';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import {
  Chip,
  Paper,
  Table,
  Stack,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableContainer,
} from '@mui/material';

// ----------------------------------------------------------------------

function CardsDesktopView() {
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('cardholderName')}</TableCell>
            <TableCell>{t('last4Digits')}</TableCell>
            <TableCell>{t('status')}</TableCell>
            <TableCell align="right">{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCards.length > 0 ? (
            paginatedCards.map(card => (
              <TableRow key={card.id} data-cy="card-item">
                <TableCell>{card.cardholderName}</TableCell>
                <TableCell>•••• {card.last4Digits}</TableCell>
                <TableCell>
                  <Chip
                    label={t(card.status)}
                    color={card.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title={t('edit')}>
                      <IconButton
                        size="small"
                        onClick={() => dispatchEditing(card)}
                        aria-label="edit"
                        data-cy="edit-card"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('delete')}>
                      <IconButton
                        size="small"
                        onClick={() => dispatchDeleting(card.id)}
                        aria-label="delete"
                        data-cy="delete-card"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        card.status === 'Active'
                          ? t('deactivate')
                          : t('activate')
                      }
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleStatusToggle(card)}
                        aria-label="toggle status"
                        color={card.status === 'Active' ? 'success' : 'default'}
                        data-cy={
                          card.status === 'Active'
                            ? 'deactivate-card'
                            : 'activate-card'
                        }
                      >
                        {card.status === 'Active' ? (
                          <ToggleOffIcon />
                        ) : (
                          <ToggleOnIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                {t('noData')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

export default CardsDesktopView;
