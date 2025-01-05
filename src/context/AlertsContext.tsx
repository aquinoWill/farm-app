'use client';

import React, { ReactNode, useContext, createContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

interface AlertState {
  message: string;
  severity: AlertSeverity;
  open: boolean;
}

interface AlertsContextProps {
  showAlert: (message: string, severity: AlertSeverity) => void;
}

const AlertsContext = createContext<AlertsContextProps | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertState, setAlertState] = useState<AlertState>({
    message: '',
    severity: 'info',
    open: false,
  });

  const showAlert = (message: string, severity: AlertSeverity) => {
    setAlertState({ message, severity, open: true });
  };

  const handleClose = () => {
    setAlertState((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertsContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity={alertState.severity} sx={{ width: '100%' }}>
          {alertState.message}
        </Alert>
      </Snackbar>
    </AlertsContext.Provider>
  );
};

export const useAlerts = (): AlertsContextProps => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};
