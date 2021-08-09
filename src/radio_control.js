import React, { useState } from "react"
import { Knob } from "react-rotary-knob"
import Slider from "@material-ui/core/Slider"

export default function RadioControl({ globalState, changeVolume, tuneStation, saveStation }) {
  function valuetext(value) {
    return `${value} MHz`
  }

  return (
    <div className="radio-control">
      <h1>Web FM Radio</h1>
      <section className="radio-control__buttons">
        <div className="radio-control__volume">
          <h4>Volume</h4>
          <span>
            {<label id="volumeKnob">{Math.floor(globalState.volumeValue)}</label>}
            <Knob name="volumeKnob" min={0} max={10} step={1} onChange={changeVolume} value={globalState.volumeValue} />
          </span>
        </div>
        <div className="radio-control__tune">
          <h4>Tune Radio</h4>
          <Slider
            onChangeCommitted={(e, val) => {
              tuneStation(val)
            }}
            defaultValue={87.9}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-small-steps"
            valueLabelDisplay="auto"
            step={0.2}
            marks
            min={87.9}
            max={107.9}
          />
        </div>
        <div className="save__presets">
          <h4>Save Station</h4>
          {globalState.savePreset.map((channel, index) => {

            return (
              <button className={`${channel}__preset`} key={index} onClick={() => saveStation(globalState.station, globalState.stationData, index)}>
                {localStorage.key(index) || channel}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
