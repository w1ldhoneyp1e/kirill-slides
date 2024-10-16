import './App.css'
import { LowerContainer } from './view/LowerContainer/LowerContainer'
import { EditorType } from './store/types'
import { UpperContainer } from './view/UpperContainer/UpperContainer'
type AppProps = {
  editor: EditorType,
}

function App({editor}: AppProps) {

  return (
    <div>
      <UpperContainer // Передавать editor
        editor={editor}
      />
      <LowerContainer //
        editor={editor}
      />
    </div>
  )
}

export default App
