import { useMemo, useState } from 'react'
import { musicSettings } from '../constants/common'

export const UseMusic = () => {
  const [playMusic, setPlayMusic] = useState(false)
  const [volume, setVolume] = useState(musicSettings.MUSIC_INIT_VOLUME / 100)

  const audioContext = useMemo(() => {
    return new AudioContext()
  }, [])

  const [source, setSource] = useState(audioContext.createBufferSource())
  const gainNode = useMemo(() => audioContext.createGain(), [])

  const startMusic = async () => {
    const newSource = audioContext.createBufferSource()
    newSource.buffer = await fetch(`../../assets/sounds/background.mp3`)
      .then(res => res.arrayBuffer())
      .then(ArrayBuffer => audioContext.decodeAudioData(ArrayBuffer))
    newSource.connect(gainNode)
    gainNode.connect(audioContext.destination)

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime)

    newSource.start()
    setSource(newSource)
  }

  const stopMusic = () => {
    source.stop()
    source.disconnect()
  }

  const setMusicVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume / 100))
    setVolume(clampedVolume)
    gainNode.gain.setValueAtTime(clampedVolume, audioContext.currentTime)
  }
  return {
    playMusic,
    setPlayMusic,
    startMusic,
    stopMusic,
    setMusicVolume,
  }
}
