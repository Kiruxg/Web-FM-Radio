import React, { useEffect, useState, useRef } from "react"
import ReactAudioPlayer from "react-h5-audio-player"
import { Draggable } from "react-beautiful-dnd"

export default function RadioDisplay({ volumeValue, stationFreq, stationData = [] }) {
  const defaultRadioSrc = event => {
    event.target.src = "https://play-lh.googleusercontent.com/oV1AVbkOV2M7rqOAENeuNAnBL6ftRpECFDiiKU4w19tX_rTHTnwJRrPcJ2yy270taMU"
  }
  const [radioPlaying, setRadioPlaying] = useState(false)
  const audioRef = useRef()
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.audio.current.volume = volumeValue / 10
    }
  }, [volumeValue])

  return (
    <Draggable draggableId="draggable-2" index={1}>
      {provided => (
        <div className="radio-display" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div>
            <h2>{stationFreq ? `${stationFreq} MHz` : `Tune FM Radio`}</h2>
          </div>
          {stationData.map((station, index) => {
            return (
              <div key={index}>
                <div>
                  <img className={`${radioPlaying && "radio--playing"}`} src={station.favicon} alt="station logo" onError={defaultRadioSrc} />
                </div>
                <h2 className="stationName">{station.name}</h2>
                <div className="radio-display__controls">
                  <ReactAudioPlayer ref={audioRef} className="player" src={station.urlResolved} showJumpControls={false} customProgressBarSection={["CURRENT_TIME"]} customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]} onPlay={e => setRadioPlaying(!radioPlaying)} onPause={e => setRadioPlaying(!radioPlaying)} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Draggable>
  )
}
