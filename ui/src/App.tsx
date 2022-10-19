import { useState, useEffect } from 'react';
import { LinearProgress, Typography, Grid, Box } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}


export function App() {
  const [ready, setReady] = useState<boolean>(false);
  const ddClient = useDockerDesktopClient();

  useEffect(() => {
    
      const checkIfYugabyteDBIsReady = async () => {
         console.log('Checking if ready...')
         // waiting to see a leader in the yb-master UI
         const result = String(await ddClient.extension.vm?.service?.get('http://localhost:7000'));
         // wait to find a leader
         console.log(result)
         const ready = result.includes(">LEADER<")
         //TODO: add ysqlsh test
         if (ready) {
           console.log('ready.')
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

 // useEffect(() => {
 //   if (ready) {
 //     window.location.href = 'http://localhost:7000';
 //   }
 // }, [ready]);

return (
    <>
      {!ready && (
        <Grid container flex={1} direction="column" padding="16px 32px" height="100%" justifyContent="center" alignItems="center">
          <Grid item>
            <LinearProgress/>
            <Typography mt={2}>
              Waiting for YugabyteDB to be ready (GUI on http://localhost:7000)
            </Typography>
          </Grid>
        </Grid>
      )}
      { (
        <Box display="flex" flex={1} width="100%" height="100%">
          <iframe src='http://yb0:7000/' width="100%" height="100%" />
        </Box>
      )}
    </>
  );

}
