import React from 'react';
import Cell from './Cell';

const Grid = ({ layers, onCellClick, activeLayerIndex }) => (
  <div style={{ position: 'relative', width: `${40 * layers[0][0].length}px`, height: `${40 * layers[0].length}px` }}>
    {layers.map((grid, layerIndex) => (
      <div key={layerIndex} style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        display: 'grid', 
        gridTemplateColumns: `repeat(${grid[0].length}, 40px)`,
        gridTemplateRows: `repeat(${grid.length}, 40px)`,
        pointerEvents: layerIndex === activeLayerIndex ? 'auto' : 'none',
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              type={cell}
              onClick={() => onCellClick(rowIndex, cellIndex, layerIndex)}
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #ddd',
              }}
            />
          ))
        )}
      </div>
    ))}
  </div>
);

export default Grid;
