import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { common } from "../css/CommonCss";

export default function RenderEmpty() {
    const { classes} = useStyles()
    return (
        <Typography className={classes.mainH2}>No Record Found</Typography>
    )
}

export const useStyles = makeStyles()((theme) => {
    return { 
        mainH2:{
            ...common.fonts,
            color: '#8c8c8c',
            fontSize: '22px',
            padding: '20px',
            fontWeight: '600',
            position: 'absolute',
            [theme.breakpoints.between('xs', 'sm')]: {
                top: '35%',
                left: '20%'
            },
            top: '35%',
            left: '40%'
        }
    }
})