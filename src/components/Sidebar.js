  import React, { useState } from "react";
  import Icon from "./Icon";

  export default function Sidebar({
    onDragStart,
    moveCat,
    turnClockwise,
    turnCounterClockwise,
    goToXY,
    handleSay,
    handleThink,
  }) {
    const [X, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleDragStart = (event, itemHtml) => {
      // Store the item's HTML content in the drag data
      console.log("itemHtml in sidebar : ", itemHtml);
      event.dataTransfer.setData("text/html", itemHtml); // Store HTML structure of the element
      onDragStart(event, itemHtml); // Optionally pass the item to a parent component (optional)
    };

    const createItemHtml = (text, icon) => {
      return `
        <div class="flex flex-row items-center bg-yellow-500 text-white px-2 py-1 text-sm cursor-pointer rounded-lg">
          ${text} 
          ${icon}
        </div>
      `;
    };
    return (
      <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
        <div className="font-bold"> {"Events"} </div>
        {/* <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
              {"When "}
              <Icon name="flag" size={15} className="text-green-600 mx-2" />
              {"clicked"}
            </div> */}
        <div
          className="flex flex-row items-center bg-yellow-500 text-white px-2 py-1 text-sm cursor-pointer rounded-lg"
          draggable
          onDragStart={(e) =>
            handleDragStart(
              e,
              createItemHtml(
                "When clicked",
                "<Icon name='flag' size={15} className='text-green-600 mx-2' />"
              )
            )
          }
        >
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </div>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"When this sprite clicked"}
        </div>
        <div className="font-bold"> {"Motion"} </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={moveCat} // Call moveCat when clicked
        >
          {"Move 10 steps"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={turnCounterClockwise} // Call turnClockwise when clicked
        >
          {"Turn "}
          <Icon name="undo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
        <div
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={turnClockwise}
        >
          {"Turn "}
          <Icon name="redo" size={15} className="text-white mx-2" />
          {"15 degrees"}
        </div>
        <div
          className="flex items-center bg-blue-500 text-white px-2 py-2 my-2 text-sm rounded-xl shadow-md gap-2 w-fit cursor-pointer"
          onClick={() => goToXY(X, y)}
        >
          <span>go to x:</span>
          <input
            type="text"
            value={X}
            onChange={(e) => setX(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-8 px-1 text-black text-center bg-white rounded-xl shadow-inner outline-none"
          />
          <span>y:</span>
          <input
            type="text"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-8 px-1 text-black text-center bg-white rounded-xl shadow-inner outline-none"
          />
        </div>

        <div className="font-bold mt-4"> {"Looks"} </div>

  {/* Say for 2 seconds */}
  <div
  className="flex items-center bg-purple-500 text-white px-1.5 py-1 my-1 text-xs rounded-lg shadow-md gap-1.5 w-fit cursor-pointer"
  onClick={() => handleSay("Hello!", 2)}
>
  <span>say</span>
  <input
    type="text"
    value="Hello!"
    readOnly
    className="w-16 px-1 py-0.5 text-black bg-white rounded-lg text-center text-xs"
  />
  <span>for</span>
  <input
    type="number"
    value="2"
    readOnly
    className="w-8 px-1 py-0.5 text-black bg-white rounded-lg text-center text-xs"
  />
  <span>seconds</span>
</div>


  {/* Say without duration */}
  <div
    className="flex items-center bg-purple-500 text-white px-2 py-2 my-2 text-sm rounded-xl shadow-md gap-2 w-fit cursor-pointer"
    onClick={() => handleSay("Hello!")}
  >
    <span>say</span>
    <input
      type="text"
      value="Hello!"
      readOnly
      className="w-20 px-2 py-1 text-black bg-white rounded-xl text-center"
    />
  </div>

  {/* Think for 2 seconds */}
  <div
  className="flex items-center bg-purple-500 text-white px-1.5 py-1 my-1 text-xs rounded-lg shadow-md gap-1.5 w-fit cursor-pointer"
  onClick={() => handleThink("Hmm...", 2)}
>
  <span>think</span>
  <input
    type="text"
    value="Hmm..."
    readOnly
    className="w-16 px-1 py-0.5 text-black bg-white rounded-lg text-center text-xs"
  />
  <span>for</span>
  <input
    type="number"
    value="2"
    readOnly
    className="w-8 px-1 py-0.5 text-black bg-white rounded-lg text-center text-xs"
  />
  <span>seconds</span>
</div>


  {/* Think without duration */}
  <div
    className="flex items-center bg-purple-500 text-white px-2 py-2 my-2 text-sm rounded-xl shadow-md gap-2 w-fit cursor-pointer"
    onClick={() => handleThink("Hmm...")}
  >
    <span>think</span>
    <input
      type="text"
      value="Hmm..."
      readOnly
      className="w-20 px-2 py-1 text-black bg-white rounded-xl text-center"
    />
  </div>

      </div>
    );
  }
