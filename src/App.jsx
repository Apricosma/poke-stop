import './App.css'
import CardData from './components/CardData'
import Header from './components/Header'


function App() {

  return (
    <>
      <Header
        title='PokeStop'
        color='var(--background-color-light)'
        navigation={['Home', 'About', 'Contact']}
      />
      <div className='container'>
        <CardData
          pageSize={10}
          page={1}
        />
      </div>
    </>
  )
}

export default App
