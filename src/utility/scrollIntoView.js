const scrollIntoView = (element, params = { behavior: "smooth", block: "start", inline: "nearest" }) => {
  // test for native scrollIntoView options support
  let optionsSupport = false;
  // test for smothscroll behavior support
  optionsSupport = 'scrollBehavior' in document.documentElement.style;
  const scrollingElement = document.scrollingElement || document.documentElement; // top level scrolling element
  //   [scrollY, scrollX] = [scrollingElement.scrollTop, scrollingElement.scrollLeft], // top level scroll position
  //   testElement = document.createElement('div'),
  //   style = {
  //     position: 'absolute',
  //     visibility: 'hidden',
  //     width: '0',
  //     height: '0',
  //     top: `${scrollY}px`,
  //     left: `${scrollX}px`
  //   };
  // Object.assign(testElement.style, style);
  // document.body.appendChild(testElement);

  // try {
  //   const options = Object.defineProperties({}, {
  //     behavior: {
  //       get() {
  //         optionsSupport = true;
  //       }
  //     },
  //     block: { value: "start" },
  //     inline: { value: "nearest" }
  //   });
  //   testElement.scrollIntoView(options);
  //   document.body.removeChild(testElement);
  // } catch (err) {
  //   console.error('error', err);
  //   optionsSupport = false;
  // }

  // use native when options are supported
  if (optionsSupport) {
    element.scrollIntoView(params);
    return;
  }
  let scrollableParents = []; // array of all scrollable parents of element
  let parent = element,
    child = element,
    delta = 0; // propagate the distance between parent and child if a child can't be scrolled to the top of a parent
  while (parent !== scrollingElement && (parent = parent.parentNode) !== null) {
    // find 1st scrollable parent of a child
    // check if scrollingElement is body because clientHeight === scrollHeight for body
    if (parent.scrollHeight <= parent.clientHeight &&
      !(scrollingElement === parent && scrollingElement === document.body)) {
      continue;
    }
    const parentTop = parent.getBoundingClientRect().top,
      parentBorderTop = parent.clientTop,
      elementTop = child.getBoundingClientRect().top,
      scrollDistance = parent === scrollingElement ? elementTop + delta : elementTop - (parentTop + parentBorderTop) + delta,
      parentScrollBottom = parent.scrollHeight - (parent.scrollTop + parent.clientHeight);
    // store scrollable parent
    scrollableParents.push({
      node: parent,
      initScrollPosition: parent.scrollTop,
      scrollDistance
    });
    delta = parentScrollBottom < scrollDistance ? scrollDistance - parentScrollBottom : 0;
    child = parent;
  }
  const duration = 500,
    startTime = performance.now(),
    easeOutQuad = (t) => t * (2 - t); // timing function

  const animate = (now) => {
    const passedTime = (now - startTime) / duration;
    scrollableParents.forEach(elem => {
      const passedDistance = easeOutQuad(passedTime) * elem.scrollDistance;
      if (passedTime < 1) {
        elem.node.scrollTop = elem.initScrollPosition + passedDistance;
      } else {
        elem.node.scrollTop = elem.initScrollPosition + elem.scrollDistance;
      }
    });
    if (passedTime < 1) {
      window.requestAnimationFrame(animate);
    }
  };
  window.requestAnimationFrame(animate);

};

export default scrollIntoView;