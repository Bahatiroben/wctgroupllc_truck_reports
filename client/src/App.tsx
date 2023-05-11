import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import './App.css';
import { Driver } from './features/driver/Driver';
import { Expense } from './features/expense/Expense';
import { Load } from './features/load/Load';

function App() {

  const [currentEntity, setCurrentEntity] = useState('driver')
  const [driverId, setDriverId] = useState('');
  const [loadIds, setLoadIds] = useState([]);

  return (
    <Container className="App">
      <Header>
        <LogoWording>World Class Transportation Group</LogoWording>
        <LogoLetter>WCTG</LogoLetter>
      </Header>
      <TableHeader>
        {
          currentEntity === 'driver' && <Driver setDriverId={setDriverId} setCurrentEntity={setCurrentEntity} />
        }
        {
          currentEntity === 'load' && <Load driverId={driverId}/>
        }
      </TableHeader>
    </Container>
  );
}

export default App;

const Container = styled.div`
width: 100%;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2em 20px;
`

const LogoWording = styled.div`
  font-size: 2rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoLetter = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  width: 80px;
  height: 80px;
  background-color: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const TableHeader = styled.div`
`;
