import { useState, useEffect } from 'react';
import { LinearProgress, Typography, Grid } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}


export function App() {
  const [ready, setReady] = useState<boolean>(true);
  const [logs, setLogs] = useState<string>("fetching logs...");
  const ddClient = useDockerDesktopClient();

  useEffect(() => {
    if (ready) {
      window.location.href = 'http://localhost:7000';
    }
  }, [ready]);


  return (
    <Grid container flex={1} direction="column" spacing={4}>
      <Grid item justifyContent="center" textAlign="center" minHeight="80px">
        {!ready && (
          <>
            <LinearProgress />
            <Typography mt={2}>
              Waiting for OracleXE to be ready. It may take several seconds if
              it's the first time.
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}
