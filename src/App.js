import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [draggedItem, setDraggedItem] = useState([]);
  const [speechBubble, setSpeechBubble] = useState(null);

  const handleSay = (text, duration = 0) => {
    setSpeechBubble({ type: "say", text });
    if (duration > 0) {
      setTimeout(() => setSpeechBubble(null), duration * 1000);
    }
  };

  const handleThink = (text, duration = 0) => {
    setSpeechBubble({ type: "think", text });
    if (duration > 0) {
      setTimeout(() => setSpeechBubble(null), duration * 1000);
    }
  };

  // Handle the start of the drag (save the dragged item)
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/html", item);
  };

  // Handle the drop event in MidArea (process the dropped item)
  const handleDrop = (event) => {
    event.preventDefault();
    // console.log("Dropped item on APP");
    // const item = event.dataTransfer.getData("text/html");
    // setDraggedItem((prev) => [...prev, item]); // Store the dragged item
    // console.log("Dragged items:", draggedItem);
    // if (itemHtml.includes("Repeat 10 times")) {
    //   handleRepeat(10); // You might pass this via props from App
    // } else {
    //   onDrop(event);
    // }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to move the cat 10 steps to the right (along the x-axis)
  const moveCat = () => {
    setCatPosition((prev) => ({ ...prev, x: prev.x + 10 }));
  };

  // Go to a specific location
  const goToXY = (x, y) => {
    setCatPosition({ x, y });
  };

  // Turn the cat 15 degrees clockwise
  const turnClockwise = () => {
    setRotation((prevRotation) => prevRotation + 15);
  };

  // Turn the cat 15 degrees counterclockwise
  const turnCounterClockwise = () => {
    setRotation((prevRotation) => prevRotation - 15);
  };

  // Function to repeat the moveCat function a specified number of times
  const handleRepeat = (times = 10, action, delay = 300) => {
    let count = 0;
    const interval = setInterval(() => {
      // moveCat(); // Call your existing move function
      action();

      count++;
      if (count >= times) clearInterval(interval);
    }, delay);
  };

  // Function to find events in the draggedItem array
  const findEvents = (item) => {
    // Logic to find events in the draggedItem array
    // This can be a regex or string matching logic
    console.log("Finding events in item:", item);
    if (item.includes("Move 10 steps")) {
      console.log("next action : Moving cat");
      return moveCat;
    } else if (item.includes("Turn clockwise")) {
      console.log("next action : Turning clockwise");
      return turnClockwise;
    } else if (item.includes("Turn counterclockwise")) {
      console.log("next action : Turning counterclockwise");
      return turnCounterClockwise;
    }
  };

  // Function to handle play button click 
  const onPlay = () => {
    // Logic to execute when the play button is clicked
    console.log("Play button clicked");
    // Example: Move the cat 10 steps
    // fetch items present in the draggedItem array

    for (let i = 0; i < draggedItem.length; i++) {
      console.log(`Processing item: ${draggedItem[i]}`);
      // Check if the item contains "Move 10 steps"
      if (draggedItem[i].includes("Move 10 steps")) {
        console.log("Moving cat");
        moveCat();
      } else if (draggedItem[i].includes("Turn clockwise")) {
        console.log("Turning clockwise");
        turnClockwise();
      } else if (draggedItem[i].includes("Turn counterclockwise")) {
        console.log("Turning counterclockwise");
        turnCounterClockwise();
      } else if (draggedItem[i].includes("Say")) {
        const text = draggedItem[i].split("Say ")[1].split("<")[0];
        handleSay(text);
      } else if (draggedItem[i].includes("Think")) {
        const text = draggedItem[i].split("Think ")[1].split("<")[0];
        handleThink(text);
      }
      else if (draggedItem[i].includes("repeat 10 times")) {
        console.log("Repeating action");
        const nextAction = findEvents(draggedItem[i+1]);
        i++;
        console.log("Repeating action with next action ", nextAction);
        handleRepeat(10,nextAction);

      }
    };
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            onDragStart={handleDragStart}
            moveCat={moveCat}
            turnClockwise={turnClockwise}
            turnCounterClockwise={turnCounterClockwise}
            goToXY={goToXY}
            handleSay={handleSay}
            handleThink={handleThink}
            onPlay={onPlay}
          />
          <MidArea onDrop={handleDrop} onDragOver={handleDragOver} draggedItem={draggedItem} setDraggedItem={setDraggedItem} />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            catPosition={catPosition}
            rotation={rotation}
            speechBubble={speechBubble}
          />
        </div>
      </div>
    </div>
  );
}
