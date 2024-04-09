import React, { useState } from "react";
import Grid from "./Components/Grid";
import Sidebar from "./Components/Sidebar";

function App() {
  const [setupComplete, setSetupComplete] = useState(false);
  const [dimensions, setDimensions] = useState({ x: 10, y: 10 });
  const [layers, setLayers] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  const materials = {
    Background: [
      { name: 'Grass', value: 1, color: 'green', layer: 'Background' },
      { name: 'Water', value: 2, color: 'blue', layer: 'Background' },
    ],
    Foreground: [
      { name: 'Tree', value: 3, color: 'darkgreen', layer: 'Foreground' },
      { name: 'Rock', value: 4, color: 'gray', layer: 'Foreground' },
    ],
    Objects: [
      { name: 'Treasure', value: 5, color: 'yellow', layer: 'Objects' },
      { name: 'Enemy', value: 6, color: 'red', layer: 'Objects' },
    ],
  };

  const handleDimensionChange = (e) => {
    setDimensions({ ...dimensions, [e.target.name]: parseInt(e.target.value, 10) || 0 });
  };

  const initializeGrid = (x, y) => {
    return Array(y).fill(Array(x).fill(null)); // Initialize with null for transparency
  };

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

  const onSelectMaterial = (material) => {
    setSelectedMaterial(material);

    // Automatically switch to the correct layer
    const layerIndex = layers.findIndex(layer => layer.name === material.layer);
    if (layerIndex !== -1) {
      setActiveLayerIndex(layerIndex);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLayers([
      { name: 'Background', grid: initializeGrid(dimensions.x, dimensions.y) },
      { name: 'Foreground', grid: initializeGrid(dimensions.x, dimensions.y) },
      { name: 'Objects', grid: initializeGrid(dimensions.x, dimensions.y) }, // Initialize the Objects layer
    ]);
    setSetupComplete(true);
  };

  if (!setupComplete) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Choose your Dungeon size:
          X = <input type="number" name="x" value={dimensions.x} onChange={handleDimensionChange} />
          Y = <input type="number" name="y" value={dimensions.y} onChange={handleDimensionChange} />
        </label>
        <button type="submit">Set Dungeon Size</button>
      </form>
    );
  }

  return (
    <div className="App" style={{ display: 'flex' }}>
      <Sidebar materials={materials} onSelectMaterial={onSelectMaterial} />
      <div>
        <div>
          {layers.map((layer, index) => (
            <button
              key={index}
              onClick={() => setActiveLayerIndex(index)}
              style={{
                backgroundColor: index === activeLayerIndex ? 'lightblue' : 'white',
                color: index === activeLayerIndex ? 'white' : 'black',
              }}
            >
              {layer.name}
            </button>
          ))}
        </div>
        <Grid layers={layers.map(layer => layer.grid)} activeLayerIndex={activeLayerIndex} onCellClick={handleCellClick} />
      </div>
    </div>
  );
}

export default App;