import React, { useEffect, useState } from "react";

export default function MidArea({
  onDrop,
  onDragOver,
  draggedItem,
  setDraggedItem,
}) {
  const handleDrop = (event) => {
    event.preventDefault();
    const itemHtml = event.dataTransfer.getData("text/html");
    // console.log("itemHtml on MidArea:", itemHtml);
    onDrop(event);
    setDraggedItem((prev) => [...prev, itemHtml]); // Store the dragged item
  };

  return (
    <>
      <div
        className="flex-1 h-full overflow-auto bg-gray-100 p-4 border-dashed border-4 border-gray-300"
        onDrop={handleDrop}
        onDragOver={onDragOver}
      >
        <h1>Dragged Item</h1>
        {draggedItem ? (
          draggedItem.map((item, index) => (
            <div
              className="dropped-item m-2 rounded shadow"
              key={index}
              dangerouslySetInnerHTML={{ __html: item }} // Render the HTML content
            />
          ))
        ) : (
          <p>Drag an item from the sidebar to this area.</p>
        )}
      </div>
    </>
  );
}
