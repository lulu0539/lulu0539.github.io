// Counting clicking times
let clickCount = 0;
let currentCase = 0; // o as curretn condition, 1:first condition, 2:second condition, 3:thrid condition

// Use feedbackdelay
const effect = new Tone.FeedbackDelay({
  delayTime: 0.2,
  feedback: 0.8,
  wet: 0.4, //
}).toDestination();

// Creating a click sound synthesizer
const synth = new Tone.Synth({
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.1,
    release: 0.5,
  }, //
  volume: -15, // Lower volume attenuation (changeable)
}).connect(effect);


// Click Event Handler
function handleClick() {
  
  clickCount++;

  // Use Tone,js
  if (clickCount === 4 || clickCount % 4 === 0) {
    // Produces a slightly varying sound when the number of clicks is 4 and multiples of 4
    synth.triggerAttackRelease("D4", "8n"); // 
  } else {
    synth.triggerAttackRelease("C4", "8n"); // 
  }

  // Logic for handling changes in bounce board width
  if (clickCount === 4) {
    if (currentCase === 0) {
      // first condition, middle is the narrowest
      let middleIndex = Math.floor(numBoards / 2);
      let minWidth = 60; // middlewidth
      let incrementStep = 30; // increment step

      for (let i = 0; i <= middleIndex; i++) {
        let bounceBoardLeft = bounceBoardsLeft[middleIndex - i];
        let bounceBoardRight = bounceBoardsRight[middleIndex - i];
        
        // width increase from middle to top
        let currentWidth = minWidth + incrementStep * i;
        bounceBoardLeft.setAttribute("width", currentWidth);
        bounceBoardRight.setAttribute("width", currentWidth);
        bounceBoardRight.setAttribute("x", window.innerWidth - currentWidth);

        // width increase from middle to bottom
        if (i !== 0) {
          bounceBoardLeft = bounceBoardsLeft[middleIndex + i];
          bounceBoardRight = bounceBoardsRight[middleIndex + i];

          currentWidth = minWidth + incrementStep * i;
          bounceBoardLeft.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("x", window.innerWidth - currentWidth);
        }
      }
      // updatecurrentCase
      currentCase = 1;
    } else if (currentCase === 1) {
      // first condition, middle is the longest
      let middleIndex = Math.floor(numBoards / 2);
      let maxWidth = 200; // ）
      let decrementStep = 30; // 

      for (let i = 0; i <= middleIndex; i++) {
        let bounceBoardLeft = bounceBoardsLeft[middleIndex - i];
        let bounceBoardRight = bounceBoardsRight[middleIndex - i];
        
        // width decrease from middle to top
        let currentWidth = maxWidth - decrementStep * i;
        bounceBoardLeft.setAttribute("width", currentWidth);
        bounceBoardRight.setAttribute("width", currentWidth);
        bounceBoardRight.setAttribute("x", window.innerWidth - currentWidth);

        // width decrease from middle to bottom
        if (i !== 0) {
          bounceBoardLeft = bounceBoardsLeft[middleIndex + i];
          bounceBoardRight = bounceBoardsRight[middleIndex + i];

          currentWidth = maxWidth - decrementStep * i;
          bounceBoardLeft.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("x", window.innerWidth - currentWidth);
        }
      }
      // update currentCase
      currentCase = 2;
    } else if (currentCase === 2) {
      // hird condotion: Alternating decreasing and increasing
      let startIndex = Math.floor(numBoards / 2);
      let decrementStep = 30; // 
      let incrementStep = 30; // 

      for (let i = 0; i < numBoards; i++) {
        let bounceBoardLeft = bounceBoardsLeft[i];
        let bounceBoardRight = bounceBoardsRight[i];

        let boardWidth = 200; //

        if (i % 2 === 0) {
          // in even bit, increase width
          let currentWidth = boardWidth + incrementStep * Math.floor(i / 2);
          bounceBoardLeft.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("x", window.innerWidth - currentWidth);
        } else {
          // in odd bit, decrease width
          let currentWidth = boardWidth - decrementStep * Math.floor(i / 2);
          bounceBoardLeft.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("width", currentWidth);
          bounceBoardRight.setAttribute("x", window.innerWidth - currentWidth);
        }
      }
      // update currentCase
      currentCase = 3;
    } else if (currentCase === 3) {
      // original condition, width are the same
      let defaultWidth = 200; //

      for (let i = 0; i < numBoards; i++) {
        let bounceBoardLeft = bounceBoardsLeft[i];
        let bounceBoardRight = bounceBoardsRight[i];
        bounceBoardLeft.setAttribute("width", defaultWidth);
        bounceBoardRight.setAttribute("width", defaultWidth);
        bounceBoardRight.setAttribute("x", window.innerWidth - defaultWidth);
      }

      currentCase = 0;
    }

    // update
    if (clickCount >= 4) {
    clickCount = 0;
    }
  }
}


document.addEventListener("click", handleClick);