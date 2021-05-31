import axios from "axios"

export const getDataCovid19Statistic = async() => {
    const result = await axios.get("https://api.covid19api.com/summary")
    return result
}
export const getSortArray = async() => {
    const result = await axios.get("https://api.covid19api.com/summary")
    var ContryListFilter = []
    // console.log(result.data.Countries.sort(compare))
    result.data.Countries.sort(compare).map((item) => (
        ContryListFilter.push(item)
    ))
    // console.log(ContryListFilter)
    return ContryListFilter
}

function compare( a, b ) {
    if ( a.TotalConfirmed < b.TotalConfirmed ){
      return 1;
    }
    if ( a.TotalConfirmed > b.TotalConfirmed ){
      return -1;
    }
    if( a.TotalConfirmed === b.TotalConfirmed){
        if ( a.TotalDeaths < b.TotalDeaths ){
            return 1;
        }
        if ( a.TotalDeaths > b.TotalDeaths ){
            return -1;
        }
        if( a.TotalDeaths === b.TotalDeaths){
            if ( a.TotalRecovered < b.TotalRecovered ){
                return 1;
            }
            if ( a.TotalRecovered > b.TotalRecovered ){
                return -1;
            }
            
        }
    }
    return 0;
  }