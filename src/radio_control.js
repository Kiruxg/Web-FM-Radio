import React from "react"
import { Knob } from "react-rotary-knob"
import Slider from "@material-ui/core/Slider"

export default function RadioControl(props) {
  function valuetext(value) {
    return `${value} MHz`
  }
  return (
    <div className="radio-control">
      <h1>Radio Control</h1>
      <section className="radio-control__buttons">
        <div className="radio-control__volume">
          <h4>Volume</h4>
          <span>
            <p>{parseFloat(props.globalState.volumeValue.toFixed(1))}</p>
            <Knob min={0} max={10} step={1} onChange={props.onChange.bind(this)} value={props.globalState.volumeValue} />
          </span>
        </div>
        <div className="radio-control__tune">
          <h4>Tune Radio</h4>
          <Slider defaultValue={87.9} getAriaValueText={valuetext} aria-labelledby="discrete-slider" valueLabelDisplay="auto" step={0.2} marks min={87.9} max={107.9} />
        </div>
        <div className="save__presets">
          <h4>Save Channels</h4>
          <button className="ch1__preset">Ch1</button>
          <button className="ch2__preset">Ch2</button>
          <button className="ch3__preset">Ch3</button>
          <button className="ch4__preset">Ch4</button>
          <button className="ch5__preset">Ch5</button>
          <button className="ch6__preset">Ch6</button>
        </div>
      </section>
    </div>
  )
}