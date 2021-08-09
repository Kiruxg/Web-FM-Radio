import React from "react"
import RadioControl from "./radio_control"
import RadioDisplay from "./radio_display"
import "./app.css"
import { RadioBrowserApi } from "radio-browser-api"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      volumeValue: 10.0,
      station: "87.9",
      savePreset: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "Ch6"],
      stationsFilter: {
        87.9: "hiphop",
        88.1: "classical",
        88.3: "country",
        88.5: "dance",
        88.7: "disco",
        88.9: "house",
        89.1: "jazz",
        89.3: "pop",
        89.5: "rap",
        89.7: "retro",
        89.9: "rock",
        90.1: "klavier",
        90.3: "hits",
        90.5: "piano",
        90.7: "charts",
        90.9: "dj",
        91.1: "edm",
        91.3: "trap",
        91.5: "oldschool",
        91.7: "retro",
        91.9: "goldies",
        92.1: "eurodance",
        92.3: "90's",
        92.5: "80's",
        92.7: "70s",
        92.9: "60s",
        93.1: "oldies",
        93.3: "70s disco",
        93.5: "schlager",
        93.7: "discofox",
        93.9: "best",
        94.1: "mallorca",
        94.3: "feiern",
        94.5: "community",
        94.7: "synth",
        95.1: "partyhits",
        95.3: "party",
        95.5: "hot hits",
        95.7: "new",
        95.9: "live",
        96.1: "klassik",
        96.3: "greek",
        96.5: "english",
        96.9: "dubstep",
        97.1: "reggae",
        97.3: "soul",
        97.5: "funk",
        97.7: "dashradio",
        97.9: "chillout",
        98.1: "toronto",
        98.3: "gospel",
        98.5: "miami",
        98.7: "explicit",
        98.9: "christian",
        99.1: "ohsweken",
        99.3: "reggaeton",
        99.5: "latin",
        99.7: "teens",
        99.9: "smooth",
        100.1: "rapcore",
        100.3: "nu metal",
        100.5: "americana",
        100.7: "spanish",
        100.9: "kpop",
        101.1: "top 40",
        101.3: "r&b/urban",
        101.5: "trance",
        101.7: "slow jamz",
        101.9: "hamilton",
        102.1: "disco",
        102.3: "baroque",
        102.5: "npr",
        102.7: "arts",
        102.9: "anime",
        103.1: "organ",
        103.3: "cinematic",
        103.5: "wave",
        103.7: "bass",
        103.9: "top 100",
        104.1: "latin pop",
        104.3: "remix",
        104.5: "mashup",
        104.7: "dj sets",
        104.9: "hardstyle",
        105.1: "punk",
        105.3: "garage",
        105.5: "2000er",
        105.7: "kingstown",
        105.9: "atlanta",
        106.1: "various",
        106.3: "savannah",
        106.5: "baltimore",
        106.7: "trenton",
        106.9: "portland",
        107.1: "fairfield",
        107.3: "pensacola",
        107.5: "symphony",
        107.7: "seasonal",
        107.9: "relax"
      }
    }
    this.tuneStation(this.state.station)
    document.cookie = "cookie1=value1; samesite=none; Secure"
  }
 
  tuneStation = async frequency => {
    const api = new RadioBrowserApi(fetch.bind(window, "FM Radio Player"))

    const station = await api.searchStations({
      language: "english",
      tag: this.state.stationsFilter[frequency],
      limit: 1
    })

    this.setState({ stationData: station, station: frequency })
  }

  changeVolume = val => {
    if (this.state.stationData) {
      this.setState({ volumeValue: val }, () => console.log("volume set inside:", this.state.volumeValue))
    }
  }
  saveStation = (frequency, stationData, index) => {
    //get the freq
    console.log("save called")
    if (!localStorage.key(index)) {
      //does not exist
      localStorage.setItem(frequency, JSON.stringify(stationData))
      this.setState({ station: frequency })
    } else {
      //retrieve
      this.setState({ stationData: JSON.parse(localStorage.getItem(localStorage.key(index))), station: localStorage.key(index) })
    }
  }
  render() {
    return (
      <div className="radio">
        <RadioControl globalState={this.state} changeVolume={this.changeVolume} tuneStation={this.tuneStation} saveStation={this.saveStation} />
        <RadioDisplay volume={this.state.volumeValue} stationFreq={this.state.station} stationData={this.state.stationData} />
      </div>
    )
  }
}
export default App
