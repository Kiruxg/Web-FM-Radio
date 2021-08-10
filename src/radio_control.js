import React from "react"
import { Knob } from "react-rotary-knob"
import Slider from "@material-ui/core/Slider"
import { Draggable } from "react-beautiful-dnd"

export default function RadioControl({ globalState, changeVolume, tuneStation, saveStation }) {
  function valuetext(value) {
    return `${value} MHz`
  }

  return (
    <Draggable draggableId="draggable-1" index={0} enableUserSelectHack={false} cancel=".just-name">
      {provided => (
        <div className="radio-control" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <section className="radio-control__buttons">
            <div className="radio-control__volume">
              <h4>Volume</h4>
              <span>
                {<label>{Math.floor(globalState.volumeValue)}</label>}
                <Knob min={0} max={10} step={1} onChange={changeVolume} value={globalState.volumeValue} />
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
                className="just-name"
              />
            </div>
            <div className="save__presets">
              <h4>Save Station</h4>
              {globalState.savePreset.map((channel, index) => {
                return (
                  <button className={`${channel}__preset`} key={index} onClick={() => saveStation(globalState.stationFreq, globalState.stationData, index)}>
                    {localStorage.key(index) || channel}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      )}
    </Draggable>
  )
}
