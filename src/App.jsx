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
