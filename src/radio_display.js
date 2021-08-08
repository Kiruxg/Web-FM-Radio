import React, { useEffect, useState } from "react"
import AudioPlayer from "react-h5-audio-player"

export default function RadioDisplay({ volume, stationFreq, stationData = [] }) {
  const defaultRadioSrc = event => {
    event.target.src = "https://play-lh.googleusercontent.com/oV1AVbkOV2M7rqOAENeuNAnBL6ftRpECFDiiKU4w19tX_rTHTnwJRrPcJ2yy270taMU"
  }
  const [radioVolume, setRadioVolume] = useState(volume)

  useEffect(() => {
    if (stationData.length > 0) {
      console.log("INSIDE")
      // var audio = new Audio(stationData[0].urlResolved)
      // var audio = stationData[0].urlResolved
      // console.log(stationData[0])
      // console.log("audio:", audio)
      // console.log("audio volume:", audio.volume)
      // audio.volume = volume / 10

      // console.log("current boi:", audioElement.current)
      // audioElement.current.volume = volume / 10
      console.log("current volume:", volume)
      setRadioVolume(volume)
    }
  }, [volume])

  return (
    <div className="radio-display">
      <div>
        <h1>{stationFreq ? `${stationFreq} MHz` : `Tune FM Radio`}</h1>
      </div>
      {stationData.length > 0 &&
        stationData.map((station, index) => {
          return (
            <div key={index}>
              <div>
                <img src={station.favicon} alt="station logo" onError={defaultRadioSrc} />
              </div>
              <h2 className="stationName">{station.name}</h2>
              <div className="radio-display__buttons">
                <AudioPlayer className="player" src={station.urlResolved} volume={radioVolume} showJumpControls={false} customProgressBarSection={["CURRENT_TIME"]} customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]} />
              </div>
            </div>
          )
        })}
    </div>
  )
}
