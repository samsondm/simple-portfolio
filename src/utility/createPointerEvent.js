const createPointerEvent = (type, params = {}) => {
  let pointerEvent;
  const {
    bubbles = false,
    cancelable = false,
    view = null,
    detail = 0,
    screenX = 0,
    screenY = 0,
    clientX = 0,
    clientY = 0,
    ctrlKey = false,
    altKey = false,
    shiftKey = false,
    metaKey = false,
    button = 0,
    relatedTarget = null,
    offsetXArg = 0,
    offsetY = 0,
    width = 1,
    height = 1,
    pressure = 0,
    twist = 0,
    tiltX = 0,
    tiltY = 0,
    pointerId = 0,
    pointerType = "",
    timeStamp = 0,
    isPrimary = false } = params;
  if (typeof window.PointerEvent === 'function') {
    pointerEvent = new window.PointerEvent(type, params);
  } else {
    // ie event creation
    // check for event type support
    if (window.MSPointerEvent) {
      pointerEvent = document.createEvent('MSPointerEvent');
    } else {
      pointerEvent = document.createEvent('PointerEvent');
    }
    pointerEvent.initPointerEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget, offsetXArg, offsetY, width, height, pressure, twist, tiltX, tiltY, pointerId, pointerType, timeStamp, isPrimary);
  }
  return pointerEvent;
};

export default createPointerEvent;
