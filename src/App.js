import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  // const [draggedItem, setDraggedItem] = useState("<div>{Hello World}</div>");
  // const [catPosition, setCatPosition] = useState(0);  Initial position of the cat
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0); // Initial rotation of the cat (in degrees)

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
    console.log("item in APP pased in handleDragStart : ", item);
    // setDraggedItem(item);
    // console.log(
    //   "setdraggedItem in APP while handledragstart : ",
    //   draggedItem
    // );
  };

 // Handle the drop event in MidArea (process the dropped item)
 const handleDrop = (event) => {
  event.preventDefault();
  const item = event.dataTransfer.getData("text/html");
  console.log("item fetch from event in APP : ", item);
  // setDraggedItem(item);
};

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  // Function to move the cat 10 steps to the right (along the x-axis)
  const moveCat = () => {
    setCatPosition((prev) => ({...prev, x: prev.x + 10}));
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
          /> 
          <MidArea onDrop={handleDrop} onDragOver={handleDragOver} />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea catPosition={catPosition} rotation={rotation} speechBubble={speechBubble}/>
        </div>
      </div>
    </div>
  );
}


