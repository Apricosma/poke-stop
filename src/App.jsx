import { Routes, Route } from 'react-router-dom'
import './App.css'
import CardData from './components/CardData'
import CardDetails from './components/CardDetails'
import Header from './components/Header'
import NotFound from './components/NotFound'


function App() {

  return (
    <>
      <Header
        title='PokeStop'
        color='var(--background-color-light)'
        navigation={['Home', 'About', 'Contact']}
      />

      <Routes>
        <Route path="/" element={<CardData pageSize={10} page={1} />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/404" element={<NotFound /> } />
      </Routes>
    </>
  )
}

export default App
