import React from 'react';
import  {useEffect, useState} from 'react'
import moment from "moment-timezone"
import {getDataCovid19Statistic} from "../service"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 600,
    margin: 'auto',
    backgroundColor : "#505668",
    boxShadow: "0 4px 8px 0 rgba(0,0,2,0.2)"
  },
  textStyle : {
      fontSize:30,
      color:"#FFF",
      fontWeight : 900
  },
  textHead : {
      color: "#c05850",
      fontWeight : 900,
    //   marginTop:'50px',
      fontSize: '50px'
  },
  textHead1 : {
    color: "#c05850",
    fontWeight : 900,
    marginBottom: '50px',
    fontSize: '30px'
},
  textTotalConfirmed : {
    color : "yellow",
    fontWeight : 900,
    fontSize:30,
},
  textTotalDeaths : {
      color : "green",
      fontWeight : 900,
      fontSize:30,
  },
  textTotalRecovered : {
    color : "red",
    fontWeight : 900,
    fontSize:30,
},

}));

export default function GlobalReport() {

    const [Global,setGlobal] = useState({})
    const [Date,setDate] = useState(null)

    useEffect(() => {
        getDataCovid19Statistic().then(res => {
            // console.log(res.data)
            setGlobal(res.data.Global)
            setDate(res.data.Date)
        }).catch(error => {
            console.log(error)
        })

    }, [])


  const classes = useStyles();

  return (
    <div className={classes.root}>
        <h1 className={classes.textHead}>COVID-19 CORONAVIRUS PANDEMIC</h1>
        <br/>
        <h1 className={classes.textHead1}>Last Updated : {getDate(Date)}</h1>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <Paper className={classes.paper}>
                <span className={classes.textStyle}>Total confirmed </span>
                <br/>
                <span className={classes.textTotalConfirmed}>{formattedNumber(Global.TotalConfirmed)}</span>
                <br/>
                <span className={classes.textStyle}>Total Deaths </span>
                <br/>
                <span className={classes.textTotalDeaths}>{formattedNumber(Global.TotalDeaths) }</span>
                <br/>
                <span className={classes.textStyle}>Total Recovered </span>
                <br/>
                <span className={classes.textTotalRecovered}>{formattedNumber(Global.TotalRecovered)}</span>
            </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper className={classes.paper}>
                <span className={classes.textStyle}>New confirmed </span>
                <br/>
                <span className={classes.textTotalConfirmed}>+{formattedNumber(Global.NewConfirmed) }</span>
                <br/>
                <span className={classes.textStyle}>New Deaths </span>
                <br/>
                <span className={classes.textTotalDeaths}>+{formattedNumber(Global.NewDeaths) }</span>
                <br/>
                <span className={classes.textStyle}>New Recovered </span>
                <br/>
                <span className={classes.textTotalRecovered}>+{formattedNumber(Global.NewRecovered)}</span>
            </Paper>
            </Grid>  
        </Grid>
    </div>
  );
}

const formattedNumber = (number='')=> {
    return number.toLocaleString()
}

const getDate = (dateStr = '') => {
    return moment(dateStr).tz("GMT").format("MMMM Do YYYY, h:mm A z")
}