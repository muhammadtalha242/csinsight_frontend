// ChartDescriptionDialog.tsx
'use client';

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ChartDescriptionDialogProps {
  open: boolean;
  onClose: () => void;
  description: string;
}

export const infoIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 22 22" width="18"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/></svg>';

const ChartDescriptionDialog: React.FC<ChartDescriptionDialogProps> = ({ open, onClose, description }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="chart-description-title">
      <DialogTitle id="chart-description-title">Chart Description</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChartDescriptionDialog;
