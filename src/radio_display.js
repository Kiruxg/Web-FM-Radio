import React from "react"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import Replay10Icon from "@material-ui/icons/Replay10"
import Forward10Icon from "@material-ui/icons/Forward10"

export default function RadioDisplay(props) {
  return (
    <div className="radio-display">
      <div>
        <img src="https://play-lh.googleusercontent.com/oV1AVbkOV2M7rqOAENeuNAnBL6ftRpECFDiiKU4w19tX_rTHTnwJRrPcJ2yy270taMU" alt="Radio Graphic" />
      </div>
      <h2>Radio Display</h2>
      <div className="radio-display__buttons">
        <div className="radio-display__play-button">
          <PlayCircleFilledIcon />
        </div>
        <span>
          <Replay10Icon className="rewind__time" />
          <Forward10Icon className="forward__time" />
        </span>
      </div>
    </div>
  )
}
