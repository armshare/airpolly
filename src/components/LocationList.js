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
      result: []
    };
  }

  async componentDidMount() {
    let dataAPI = await getDataWeather();

    setInterval(async () => {
      let dataUpdate = await getDataWeather();
      this.setState({ result: dataUpdate });
    }, 3600000);

    this.setState({ result: dataAPI });
  }

  render() {
    const datalist = this.state.result.data;
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    console.log("datalist : ", datalist);
    if (!datalist) {
      return <div>Loading...</div>;
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
                {datalist.city}, {datalist.state} {datalist.country}
              </Typography>
              <br />
              <Typography color="textSecondary">
                Last update {date} {time}
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

const getDataWeather = () => {
  return axios
    .get(
      `https://api.airvisual.com/v2/nearest_city?key=${
        process.env.REACT_APP_API_KEY
      }&lat=13.829&lon=100.568`
    )
    .then(res => {
      return res.data;
    });
};
export default LocationList;
