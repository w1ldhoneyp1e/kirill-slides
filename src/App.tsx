import './App.css'
import { LowerContainer } from './components/lowerContainer/lowerContainer'
import { UpperContainer } from './components/upperContainer/upperContainer'
import { toolbarButtons } from './consts/buttons'
import { myPres } from './consts/presentation'
import { getUID } from './methods'

function App() {

  return (
    <div>
      <UpperContainer //
        toolbar={toolbarButtons}
      />
      <LowerContainer //
        key={getUID()}//
        presentation={myPres}
      />
    </div>
  )
}

export default App
