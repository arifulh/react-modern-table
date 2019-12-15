import React from 'react';
import logo from './logo.svg';
import './App.css';

import Table from './components/Table'
const data = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3]
]
function App() {
  return (
    <Table 
      columns={[
        'Name',
        'Column 2',
        'Column 3',
        'Column 4',
        'Column 5'
      ]}
      data={data}
    />
  );
}

export default App;
