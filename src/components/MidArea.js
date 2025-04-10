import React, { useState } from "react";

export default function MidArea({ onDrop, onDragOver }) {
  const [draggedItem, setDraggedItem] = useState(null);
  
  const handleDrop = (event) => {
    event.preventDefault();
    const itemHtml = event.dataTransfer.getData("text/html"); // Retrieve the HTML content
    onDrop(event); // Call the onDrop function passed from the parent component
    setDraggedItem(itemHtml); // Set the dragged item
  };

  return (
    <div
      className="flex-1 h-full overflow-auto bg-gray-100 p-4 border-dashed border-4 border-gray-300"
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      {draggedItem ? (
        <div
          className="dropped-item"
          dangerouslySetInnerHTML={{ __html: draggedItem }} // Render the HTML content
        />
      ) : (
        <p>Drag an item from the sidebar to this area.</p>
      )}
    </div>
  );
}
