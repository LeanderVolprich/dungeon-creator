import React from "react";

const Cell = ({ type, onClick, style }) => {
  const allMaterials = [
    { name: "Empty", value: 0, color: "transparent" }, // Consider empty as transparent
    { name: "Grass", value: 1, color: "green" },
    { name: "Water", value: 2, color: "blue" },
    { name: "Tree", value: 3, color: "darkgreen" },
    { name: "Rock", value: 4, color: "gray" },
    { name: "Treasure", value: 5, color: "yellow" },
    { name: "Enemy", value: 6, color: "red" },
    // Add other materials as needed
  ];

  // Find the material object that matches the cell's type (value)
  const material = allMaterials.find((material) => material.value === type);

  // Determine the cell's background color based on the material's color
  const backgroundColor = material ? material.color : "transparent";

  return (
    <div
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: backgroundColor, // Use the found color
        width: "40px",
        height: "40px",
        border: "1px solid #ddd",
      }}
    />
  );
};

export default Cell;
