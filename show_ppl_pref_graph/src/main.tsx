import React from 'react';
import CreateLayout from './createLayout';

const Main: React.FC = () => {
  return (
    <div className="App">
      <header style={{ textAlign: 'center' }}>
        <h1>都道府県別人口推移</h1>
      </header>
      <CreateLayout />
    </div>
  );
};

export default Main;
