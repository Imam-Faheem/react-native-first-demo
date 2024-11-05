// project-root/context/SnackbarContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const onDismissSnackbar = () => setVisible(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackbar}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {
            onDismissSnackbar();
          },
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
