import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeStyles } from "tss-react/mui";


export default function CircularIndeterminate() {
  const { classes } = useStyles()
  return (
    <Box className={classes.loaderContainer}>
      <CircularProgress
      style={{
        color: '#bd185c'
      }}
      size={100} />
    </Box>
  );
}

export const useStyles = makeStyles()((theme) => {
  return { 
    loaderContainer: {
      position: 'fixed',
      left: '46.5%',
      top: '51.5%',
      // width: '100%',
      // height: '100%',
      zIndex: '9999',
      [theme.breakpoints.between('xs', 'sm')]: {
        top: '40%',
        left: '35%'
    },
    }
  }
}
)
