import React from "react";
import goblinImage from '../Images/Goblin.png';

const Cell = ({ type, onClick, style }) => {
  const allMaterials = [
    { name: "Empty", value: 0, color: "transparent" }, // Consider empty as transparent
    { name: "Grass", value: 1, color: "green" },
    { name: "Water", value: 2, color: "blue" },
    { name: "Tree", value: 3, color: "darkgreen" },
    { name: "Rock", value: 4, color: "gray" },
    { name: "Treasure", value: 5, color: "yellow" },
    { name: 'Enemy', value: 6, image: goblinImage }, // Directly using the imported image
    // Add other materials as needed
  ];

    const material = allMaterials.find(material => material.value === type);
  

      // Determine how to render the cell based on material type
      return (
        <div onClick={onClick} style={{ ...style, position: 'relative', width: '40px', height: '40px' }}>
          {material?.image ? (
            <img src={material.image} alt={material.name} style={{ width: '100%', height: '100%' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: material?.color || 'transparent' }} />
          )}
        </div>
      );
    };

export default Cell;
