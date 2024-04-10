import React, { useState } from "react";
import Grid from "./Components/Grid";
import Sidebar from "./Components/Sidebar";
import goblinImage from "./Images/Goblin.png";  // Importing the goblin image for use in the app.

function App() {
  // State declarations for various functionalities within the app.
  const [setupComplete, setSetupComplete] = useState(false);  // Determines if the setup form has been completed.
  const [dimensions, setDimensions] = useState({ x: 10, y: 10 });  // Stores the dimensions of the grid.
  const [layers, setLayers] = useState([]);  // Holds the different layers of the grid.
  const [selectedMaterial, setSelectedMaterial] = useState(null);  // Tracks the currently selected material.
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);  // Index of the currently active layer.

  // Definitions for different materials that can be placed on the grid, categorized by layer type.
  const materials = {
    Background: [
      { name: "Nothing", value: 0, color: "transparent", layer: "Background" },
      { name: "Grass", value: 1, color: "green", layer: "Background" },
      { name: "Water", value: 2, color: "blue", layer: "Background" },
    ],
    Foreground: [
      { name: "Nothing", value: 0, color: "transparent", layer: "Foreground" },
      { name: "Tree", value: 3, color: "darkgreen", layer: "Foreground" },
      { name: "Rock", value: 4, color: "gray", layer: "Foreground" },
    ],
    Objects: [
      { name: "Nothing", value: 0, color: "transparent", layer: "Objects" },
      { name: "Treasure", value: 5, color: "yellow", layer: "Objects" },
      { name: "Enemy", value: 6, image: goblinImage || "/Goblin.png", layer: "Objects" },
    ],
  };

  // Handles changes to the grid dimension input fields.
  const handleDimensionChange = (e) => {
    setDimensions({
      ...dimensions,
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    });
  };

  // Initializes a grid based on the given dimensions with all cells set to null (transparent).
  const initializeGrid = (x, y) => {
    return Array(y).fill(Array(x).fill(null));
  };

  // Handles clicks on the grid cells, updating the appropriate cell with the selected material.
  const handleCellClick = (rowIndex, cellIndex, layerIndex) => {
    if (layerIndex !== activeLayerIndex || !selectedMaterial) return;

    const newLayers = layers.map((layer, index) => {
      if (index === activeLayerIndex) {
        let newGrid = [...layer.grid];
        let newRow = [...newGrid[rowIndex]];
        newRow[cellIndex] = selectedMaterial.value;
        newGrid[rowIndex] = newRow;
        return { ...layer, grid: newGrid };
      }
      return layer;
    });

    setLayers(newLayers);
  };

  // Updates the selected material and automatically switches to the correct layer.
  const onSelectMaterial = (material) => {
    setSelectedMaterial(material);

    const layerIndex = layers.findIndex(layer => layer.name === material.layer);
    if (layerIndex !== -1) {
      setActiveLayerIndex(layerIndex);
    }
  };

  // Handles the form submission, initializing the layers based on the specified dimensions.
  const handleSubmit = (e) => {
    e.preventDefault();
    setLayers([
      { name: "Background", grid: initializeGrid(dimensions.x, dimensions.y) },
      { name: "Foreground", grid: initializeGrid(dimensions.x, dimensions.y) },
      { name: "Objects", grid: initializeGrid(dimensions.x, dimensions.y) },
    ]);
    setSetupComplete(true);
  };

  // Render setup form if the setup is not complete, otherwise render the main app interface.
  if (!setupComplete) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Choose your Dungeon size: X ={" "}
          <input
            type="number"
            name="x"
            value={dimensions.x}
            onChange={handleDimensionChange}
          />
          Y ={" "}
          <input
            type="number"
            name="y"
            value={dimensions.y}
            onChange={handleDimensionChange}
          />
        </label>
        <button type="submit">Set Dungeon Size</button>
      </form>
    );
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <Sidebar materials={materials} onSelectMaterial={onSelectMaterial} selectedMaterial={selectedMaterial} />
      <div>
        <div>
          {layers.map((layer, index) => (
            <button
              key={index}
              onClick={() => setActiveLayerIndex(index)}
              style={{
                backgroundColor:
                  index === activeLayerIndex ? "lightblue" : "white",
                color: index === activeLayerIndex ? "white" : "black",
              }}
            >
              {layer.name}
            </button>
          ))}
        </div>
        <Grid
          layers={layers.map(layer => layer.grid)}
          activeLayerIndex={activeLayerIndex}
          onCellClick={handleCellClick}
        />
      </div>
    </div>
  );
}

export default App;
