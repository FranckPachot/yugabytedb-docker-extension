import { useState, useEffect } from 'react';
import { LinearProgress, Typography, Grid } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}


export function App() {
  const [ready, setReady] = useState<boolean>(false);
  const [logs, setLogs] = useState<string>("fetching logs...");
  const ddClient = useDockerDesktopClient();

useEffect(() => {
    
      const checkIfYugabyteDBIsReady = async () => {
         const result = String(await ddClient.extension.vm?.service?.get('http://localhost:7000'));
         // wait to find a leader
         const ready = result.includes(">LEADER<")
         //const ready = Boolean(result);
         if (ready) {
           clearInterval(timer);
         }
         setReady(ready);
    };

    let timer = setInterval(() => {
      checkIfYugabyteDBIsReady();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
              Waiting for YugabyteDB to start and have a master leader
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}
