import React, { useState, useRef, useEffect } from 'react';

const Sidebar = ({ materials, onSelectMaterial, selectedMaterial }) => {
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(materials).reduce((acc, category) => ({ ...acc, [category]: false }), {})
  );

  const contentRefs = useRef({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  useEffect(() => {
    // Adjust heights dynamically based on content
    Object.keys(contentRefs.current).forEach((key) => {
      if (expandedCategories[key]) {
        contentRefs.current[key].style.height = `${contentRefs.current[key].scrollHeight}px`;
      } else {
        contentRefs.current[key].style.height = '0px';
      }
    });
  }, [expandedCategories]);

  return (
    <div style={{ width: '200px', borderRight: '1px solid #ddd', padding: '10px' }}>
      {Object.keys(materials).map(category => (
        <div key={category}>
          <h3 onClick={() => toggleCategory(category)} style={{ cursor: 'pointer' }}>
            {category}
          </h3>
          <div
            ref={el => contentRefs.current[category] = el}
            style={{
              height: '0px', // Start with a height of 0
              overflow: 'hidden',
              transition: 'height 0.3s ease, opacity 0.3s ease',
              opacity: expandedCategories[category] ? 1 : 0,
            }}
          >
            <div>
              {materials[category].map(material => (
                <div
                  key={material.name}
                  onClick={() => onSelectMaterial(material)}
                  style={{
                    padding: '5px',
                    margin: '5px 0',
                    backgroundColor: material.color,
                    cursor: 'pointer',
                    border: selectedMaterial?.value === material.value && selectedMaterial?.layer === category ? '2px solid black' : 'none',
                  }}
                >
                  {material.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
