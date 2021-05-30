import React from 'react';
import  {useEffect, useState} from 'react'
import {getSortArray} from "../service"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from 'react-bootstrap/Table'
import Loading from "../component/loading"
import Pagination from "../component/pagination"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  inputSearch : {
    borderRadius : "10px",
    borderDecoration : "none",
    border : "2px solid #505668",
    width: "400px",
    height: "50px",
    marginTop: "60px",
    marginBottom: "60px",
    fontSize : 20,
    fontWeight : 600,
    color: "#505668",
    backgroundColor: 'rgba(0,0,0,0)'
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 1335,
    margin: 'auto',
    backgroundColor : "#505668",
    boxShadow: "0 4px 8px 0 rgba(0,0,2,0.2)"
  },
  tableHead : {
    fontWeight : 900,
    fontSize:20,
   
  }

}));

export default function GlobalReport() {
    const [country, setContry] = useState("")
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)
    const [resultSearch, setResultSearch] = useState("")
    useEffect(() => {
        getSortArray().then(res => {
            console.log(res)
            setContry(res)
            setResultSearch(res)
            // console.log(resultSearch)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }, [])




    //Get current post
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPostCountry = resultSearch.slice(indexOfFirstPost, indexOfLastPost)
    console.log(currentPostCountry)

    //search
    const onSearch = (e) => {
      console.log(e.target.value)
        const result= country.filter((item,index) => {
          console.log(item.Country.includes(e.target.value))
          if(item.Country.toLowerCase().includes(e.target.value.toLowerCase()) === true){
            return item.Country
          }
        })
          console.log(result)
          setResultSearch(result)
      }
      console.log(resultSearch)


    //change Page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const renderCountry = (country,index) => {
        return (
            <tr key={index}>
                <td>{country.Country}[{country.CountryCode}]</td>
                <td>{formattedNumber(country.TotalConfirmed)}</td>
                <td>{formattedNumber(country.TotalDeaths)}</td>
                <td>{(country.TotalRecovered === 0) ? "Unreported" :  formattedNumber(country.TotalRecovered)}</td>
            </tr>
        )
    }
  const classes = useStyles();

  if (loading) {
    return <Loading/>
    }

  return (
    <div className={classes.root}>
        <input type="search" placeholder="Search by country" className={classes.inputSearch} onChange={onSearch} ></input>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Table>
                <thead>
                    <tr style={{color:"#ffff"}}>
                        <th className={classes.tableHead}>Country</th>
                        <th className={classes.tableHead}>Total Confirmed</th>
                        <th className={classes.tableHead}>Total Deaths</th>
                        <th className={classes.tableHead}>Total Recovered</th>
                    </tr>
                </thead>
                <tbody style={{color:"#ffff"}}>
                    {     
                    currentPostCountry.map(renderCountry)
                    }
                </tbody>
            </Table>
            <Pagination postPerPage={postPerPage} totalPost={country.length} paginate={paginate} />
            </Paper>
            </Grid> 
        </Grid>
        
    </div>
  );
}

const formattedNumber = (number='')=> {
    return number.toLocaleString()
}