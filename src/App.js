import React from "react"
import RadioControl from "./radio_control"
import RadioDisplay from "./radio_display"
import "./app.css"
import { RadioBrowserApi } from "radio-browser-api"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      volumeValue: 1.0,
      station: "87.9"
    }
  }
  // function componentWillMount(){

  // }
  // document.cookie = "cookie1=value1; samesite=none; Secure"

  changeStation = async frequency => {
    const api = new RadioBrowserApi(fetch.bind(window, "FM Radio Player"))
    const stationFilter = ["all", "classical", "country", "dance", "disco", "house", "jazz", "pop", "rap", "retro", "rock"]
    await new Promise(resolve => {
      setTimeout(resolve, 300)
    })
    const station = await api.searchStations({
      language: "english",
      tag: stationFilter[Math.floor(Math.random() * stationFilter.length)],
      limit: 1
    })

    this.setState({ stationData: station, station: frequency })
    return station
  }

  changeVolume = val => {
    if (this.state.stationData) {
      // var audio = new Audio(this.state.stationData[0].urlResolved)
      // // audio.volume = val / 10
      // audio.volume = 0
      console.log("volume val:", val)
      this.setState({ volumeValue: val }, () => console.log("volume set inside:", this.state.volumeValue))
    }
  }
  // tuneValue = frequency => {
  //   console.log("INSIDE TUNER!")
  //   this.setState({ station: frequency }, console.log("Station test1:", this.state.station))
  //   console.log("Station test2:", this.state.station)
  //   return this.state.station
  // }
  render() {
    return (
      <div className="radio">
        <RadioControl globalState={this.state} changeVolume={this.changeVolume} changeStation={this.changeStation} />
        <RadioDisplay volume={this.state.volumeValue} stationFreq={this.state.station} stationData={this.state.stationData} />
      </div>
    )
  }
}
export default App
