import { Howl, Howler } from "howler"

var sound = new Howl({
  src: ["stream.mp3"],
  html5: true
})
sound.play()
