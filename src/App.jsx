import { useState } from 'react'
import './App.css'
import { Navbar, Main } from './components/allPage'

const App = () => {
  const [userData, setUserData] = useState([])
  const [wallet, setWallet] = useState('')

  return (
    <>
      <Navbar setUserData={setUserData} wallet={wallet} setWallet={setWallet} />
      <Main data={userData} wallet={wallet} />
    </>
  )
}

export default App