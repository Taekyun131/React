import './App.css'
import { useState } from 'react'
// MUI: 레이아웃 컴포넌트 제공
// 기본 레이아웃 컴포넌트는 Container
import { Container } from '@mui/material'
// MUI AppBar 컴포넌트
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'

// 쇼핑항목을 표시하는 목록 컴포넌트 추가
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'

import AddItem from './AddItem'

// Item 타입 생성
export type Item = {
  product: string;
  amount: string;
}


function App() {
  const [items, setItems] = useState<Item[]>([]);

  // 새 항목을 추가하는 함수
  const addItem = (item: Item) => {
    setItems([item, ... items]);
  }
  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <AddItem addItem={addItem} />
        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                <ListItemText
                  primary={item.product}
                  secondary={item.amount}
                />
              </ListItem>)
          }
        </List>
      </Container>
    </>
  )
}

export default App

