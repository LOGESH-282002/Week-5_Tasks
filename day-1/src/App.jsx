import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Button from './Button.jsx'
import { useState } from 'react'

function App() {
  const [buttonLabel, setButtonLabel] = useState('Click Me 😶‍🌫️')

  return (
    <>
      <Header />
      <main>
        <h2 className='title'>Welcome to the Blog Manager application!</h2>
        <div>
          <Button label={buttonLabel} onClick={() => setButtonLabel('Clicked 😡')} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
