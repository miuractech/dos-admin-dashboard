import React from 'react';

const AddIcon: React.FC = () => {
  return (
    <div
      style={{
        height: 20,
        width: 20,
        border: '1px solid #FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
      }}
    >
      <p
        style={{
          fontFamily: 'Montserrat',
          fontWeight: 500,
          fontStyle: 'normal',
          fontSize: '1.1em',
          color: 'white',
        }}
      >
        +
      </p>
    </div>
  );
};

export default AddIcon;
