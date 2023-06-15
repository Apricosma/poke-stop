import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CardData from './components/CardData'



function App() {

  return (
    <>
      <CardData 
        pageSize={10} 
        page={1}
      />
    </>
  )
}

export default App
