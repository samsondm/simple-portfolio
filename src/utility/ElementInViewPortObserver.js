//  Observe if part of the element is inside a ViewPort
//  Currently can observe only 1 target and element height

const ElementInViewPortObserver = (callback, heightPercent) => {

  let element = null;

  const THROTTLE_TIMEOUT = 100;

  // throttle function execution
  function throttle(func, timeout) {
    let isWaiting = false;
    return () => {
      if (!isWaiting) {
        isWaiting = true;
        func();
        setTimeout(() => {
          isWaiting = false;
        }, timeout);
      }
    };
  }

  const monitorVisibility = throttle(isElementVisible, THROTTLE_TIMEOUT);

  function isElementVisible() {
    // check if element is displayed
    if (window.getComputedStyle(element).display === 'none') return false;

    const scrollingElement = document.scrollingElement || document.documentElement,
      elementRect = element.getBoundingClientRect(),
      elementHeight = elementRect.height;
    // get top and bottom of intersection rectangle of element and viewport
    let visibleTop = Math.max(elementRect.top, 0),
      visibleBottom = Math.min(elementRect.bottom, scrollingElement.clientHeight),
      visibleHeightPercent = (visibleBottom - visibleTop) / elementHeight * 100;
    // if visible height doesn't meet the criterion then skip parent check
    if (visibleHeightPercent < heightPercent) {
      return false;
    }
    let parent = element;
    while (parent !== scrollingElement && (parent = parent.parentNode) !== null) {
      const parentComputedStyle = window.getComputedStyle(parent);

      // check if parent is displayed
      if (parentComputedStyle.display === 'none') return false;

      // skip unscrollable parents or if it has overflow visible
      if (parent.clientHeight <= parent.scrollHeight ||
        parent === scrollingElement ||
        parentComputedStyle.overflow === 'visible') {
        continue;
      }
      visibleTop = Math.max(visibleTop, parent.top);
      visibleBottom = Math.min(visibleBottom, parent.bottom);
      visibleHeightPercent = (visibleBottom - visibleTop) / elementHeight * 100;
      if (visibleHeightPercent < heightPercent) {
        return false;
      }
    }
    callback();
    return true;
  }

  // exposed properties

  function observe(target) {
    element = target;
    window.addEventListener('resize', monitorVisibility, true);
    document.addEventListener('scroll', monitorVisibility, true);
  }

  function disconnect() {
    element = null;
    window.removeEventListener('resize', monitorVisibility, true);
    document.removeEventListener('scroll', monitorVisibility, true);
  }


  return Object.freeze({
    observe,
    disconnect
  });
};

export default ElementInViewPortObserver;