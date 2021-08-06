import React from "react"
import ReactDOM from "react-dom"
import RadioControl from "./radio_control"
import RadioDisplay from "./radio_display"
import "./app.css"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      volumeValue: 0
    }
    this.changeValue = this.changeValue.bind(this)
  }
  changeValue(val) {
    this.setState({ volumeValue: val })
  }
  render() {
    return (
      <div className="radio">
        <RadioControl globalState={this.state} onChange={this.changeValue} />
        <RadioDisplay />
      </div>
    )
  }
}
export default App
