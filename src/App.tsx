import './App.css'
import { LowerContainer } from './view/lowerContainer/lowerContainer'
import { UpperContainer } from './view/upperContainer/upperContainer'
import { myPres } from './consts/presentation'
import { getUID } from './store/methods'
import { Editor } from './store/types'
type AppProps = {
  editor: Editor,
}

function App(props: AppProps) {

  return (
    <div>
      <UpperContainer // Передавать editor
        presentation={props.editor.presentations[0]}
      />
      <LowerContainer //
        key={getUID()}//
        presentation={myPres}
      />
    </div>
  )
}

export default App
