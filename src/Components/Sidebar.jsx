// src/Sidebar.js
import React from "react";

const Sidebar = ({ materials, onSelectMaterial, selectedMaterial }) => (
    <div style={{ width: '200px', borderRight: '1px solid #ddd', padding: '10px' }}>
      {Object.keys(materials).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          {materials[category].map(material => (
            <div
              key={material.name}
              onClick={() => onSelectMaterial(material)}
              style={{
                padding: '5px',
                margin: '5px 0',
                backgroundColor: material.color,
                cursor: 'pointer',
                border: selectedMaterial?.value === material.value && selectedMaterial?.layer === category ? '2px solid black' : 'none', // Highlight if selected
              }}
            >
              {material.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );  

export default Sidebar;
