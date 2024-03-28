import React, { useState, useRef, useEffect } from 'react'
import Cropper from 'react-easy-crop'

type Props = {
    path:string
}

export const Crop = (props:Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [showZoomHint, setShowZoomHint] = useState(false)
  const [showMultiTouchHint, setShowMultiTouchHint] = useState(false)
  const [removeTouchAction, setRemoveTouchAction] = useState(false)
  const zoomTimeoutRef = useRef()
  const touchTimeoutRef = useRef()

  useEffect(() => {
    clearTimeout(zoomTimeoutRef.current)
    clearTimeout(touchTimeoutRef.current)
  }, [])

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  const onWheelRequest = (e) => {
    // require the CTRL/⌘ key to be able to zoom with wheel
    if (e.ctrlKey || e.metaKey) {
      setShowZoomHint(false)
      return true
    }
    setShowZoomHint(true)
    clearTimeout(zoomTimeoutRef.current)
    zoomTimeoutRef.current = setTimeout(() => setShowZoomHint(false), 2000)
    return false
  }
  const onTouchRequest = (e) => {
    // require 2 fingers to be able to interact with the image
    if (e.touches.length > 1) {
      setShowMultiTouchHint(false)
      setRemoveTouchAction(true)
      return true
    }
    setShowMultiTouchHint(true)
    setRemoveTouchAction(false)
    clearTimeout(touchTimeoutRef.current)
    touchTimeoutRef.current = setTimeout(
      () => setShowMultiTouchHint(false),
      2000
    )
    return false
  }

  return (
    <div>
      <div className="crop-container">
        <Cropper
          image={props.path}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onWheelRequest={onWheelRequest}
          onTouchRequest={onTouchRequest}
          classes={
            removeTouchAction && { containerClassName: 'removeTouchAction' }
          }
        />
        {showZoomHint && (
          <div className="zoom-hint">
            <p>Use ⌘ + scroll (or ctrl + scroll) to zoom the image</p>
          </div>
        )}
        {showMultiTouchHint && (
          <div className="touch-hint">
            <p>Use 2 fingers to interact with the image</p>
          </div>
        )}
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
          className="zoom-range"
        />
      </div>
    </div>
  )
}
