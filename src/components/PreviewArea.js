import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({catPosition, rotation, speechBubble }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        border: "2px dashed #ccc",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${catPosition.x}px), calc(-50% + ${catPosition.y}px)) rotate(${rotation}deg)`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease",
          pointerEvents: "none",
        }}
      >
              {speechBubble && (
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-xl px-3 py-1 shadow-md text-sm text-black ${
              speechBubble.type === "think" ? "italic" : ""
            }`}
          >
            {speechBubble.text}
          </div>
        )}
  
        <CatSprite />
       
      </div>
      
    </div>
  );
}

