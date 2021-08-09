import React from "react"
import RadioControl from "./radio_control"
import RadioDisplay from "./radio_display"
import "./app.css"
import { RadioBrowserApi } from "radio-browser-api"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      volumeValue: 10.0,
      stationFreq: "87.9",
      savePreset: ["Ch1", "Ch2", "Ch3", "Ch4", "Ch5", "Ch6"],
      panelOrder: [
        { name: "control", id: 0 },
        { name: "display", id: 1 }
      ],
      reSize: false,
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
        94.9: "arabic",
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
    this.tuneStation(this.state.stationFreq)
    // document.cookie = "cookie1=value1; samesite=none; Secure"
  }

  tuneStation = async frequency => {
    const api = new RadioBrowserApi(fetch.bind(window, "FM Radio Player"))

    const station = await api.searchStations({
      language: "english",
      tag: this.state.stationsFilter[frequency],
      limit: 1
    })
    console.log("in here", station)
    this.setState({ stationFreq: frequency, stationData: station })
  }

  changeVolume = val => {
    if (this.state.stationData) {
      this.setState({ volumeValue: val })
    }
  }
  saveStation = (frequency, stationData, index) => {
    //get the freq
    if (!localStorage.key(index)) {
      //does not exist
      localStorage.setItem(frequency, JSON.stringify(stationData))
      this.setState({ stationFreq: frequency })
    } else {
      //retrieve
      this.setState({ stationData: JSON.parse(localStorage.getItem(localStorage.key(index))), stationFreq: localStorage.key(index) })
    }
  }
  onDragEnd = result => {
    console.log(result)
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    const items = Array.from(this.state.panelOrder)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    this.setState({ panelOrder: items }, () => console.log("Updated Panel Order:", this.state.panelOrder))
    console.log("the result", items)
  }
  componentDidMount() {
    // console.log("resize", window.addEventListener("resize"))
    // this.resize()
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.resize.bind(this))
  }
  // window.addEventListener("resize", () => return true)
  resize = () => {
    if (window.innerWidth <= 1400) {
      console.log('<1400')
    }
    this.setState({reSize: true})
  }
  render() {
    console.log(window.addEventListener("resize", this.resize))
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h1>Web FM Radio</h1>
        <Droppable droppableId="dropArea" direction={this.state.reSize && window.innerWidth <= 1400 ? "vertical" : "horizontal"}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="radio">
              {this.state.panelOrder[0].name === "control" ? (
                <>
                  <RadioControl globalState={this.state} changeVolume={this.changeVolume} tuneStation={this.tuneStation} saveStation={this.saveStation} />
                  <RadioDisplay volumeValue={this.state.volumeValue} stationFreq={this.state.stationFreq} stationData={this.state.stationData} />
                </>
              ) : (
                <>
                  <RadioDisplay volumeValue={this.state.volumeValue} stationFreq={this.state.stationFreq} stationData={this.state.stationData} />
                  <RadioControl globalState={this.state} changeVolume={this.changeVolume} tuneStation={this.tuneStation} saveStation={this.saveStation} />
                </>
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
export default App
