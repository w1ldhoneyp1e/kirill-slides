import './App.css'
import { LowerContainer } from './view/LowerContainer/LowerContainer'
import { myPres } from './consts/presentation'
import { EditorType } from './store/types'
import { UpperContainer } from './view/UpperContainer/upperContainer'
type AppProps = {
  editor: EditorType,
}

function App(props: AppProps) {

  return (
    <div>
      <UpperContainer // Передавать editor
        presentation={props.editor.presentations[0]}
      />
      <LowerContainer //
        presentation={myPres}
      />
    </div>
  )
}

export default App
