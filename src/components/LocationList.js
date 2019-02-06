import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class LocationList extends Component {
  constructor(props) {
    super(props);
     this.state = {
    //   result: {
    //     data: {
    //       city: "Huai Khwang",
    //       state: "Bangkok",
    //       country: "Thailand",
    //       location: {
    //         type: "Point",
    //         coordinates: [100.56892844813, 13.775373291477]
    //       },
    //       current: {
    //         weather: {
    //           ts: "2019-02-04T07:00:00.000Z",
    //           hu: 52,
    //           ic: "02d",
    //           pr: 1012,
    //           tp: 34,
    //           wd: 0,
    //           ws: 1
    //         },
    //         pollution: {
    //           ts: "2019-02-04T06:00:00.000Z",
    //           aqius: 72,
    //           mainus: "p2",
    //           aqicn: 31,
    //           maincn: "p2"
    //         }
    //       }
    //     }
    //   }
      result: []
    };
  }


  
   componentDidMount() {
      axios
        .get(
          `https://api.airvisual.com/v2/nearest_city?key=KjHRDewsqJveYuPu8&lat=13.829&lon=100.568`
        )
        .then(res => {
           console.log('a initial')
           this.setState({result : res.data })  
        })

     setInterval(()=>{
        axios
        .get(
          `https://api.airvisual.com/v2/nearest_city?key=KjHRDewsqJveYuPu8&lat=13.829&lon=100.568`
        )
        .then(res => {
            console.log('b initial')
           this.setState({result : res.data })    
        });

    }, 3600000 )
    
    
    
  }

   render() {
    console.log("d");
    const datalist = this.state.result.data;
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    console.log("datalist : ", this.state.result.data, date, time);
    if (!datalist){
        return <div>Loading...</div>
    }
    return (
      <Card>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Typography component="h2" variant="h5" gutterBottom>
                วัดค่ามลพิษทางอากาศจากสถานีวัดค่าที่ใกล้เคียง
              </Typography>
              <Typography variant="h5" component="h2">
                {datalist.city}, {datalist.state}  {datalist.country}
              </Typography>
              <br />
              <Typography color="textSecondary">
                {date} {time} 
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{ textAlign: "center" }}
                variant="h1"
                component="h1"
              >
                {datalist.current.pollution.aqicn} 
              </Typography>
              <Typography
                align="center"
                variant="h6"
                component="h6"
                color="textSecondary"
              >
                CN AQI
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

 
export default LocationList;
