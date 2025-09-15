
import './App.css'
import { PlusIcon } from './icons/PlusIcon'
import { Button } from './components/Button'

function App() {
 

  return (
    <>
     <div className='h-180 mx-170 gap-10 flex items-center'>
        <Button text ={"hello"} variant="primary" startIcon={<PlusIcon/>}/>
        <Button text ={"bye"} variant="secondary" startIcon={<PlusIcon/>}/>
     </div>
    </>
  )
}

export default App
