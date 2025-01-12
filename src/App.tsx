import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom'
import './App.css'
import {type HistoryType} from './utils/history'
import {Player} from './view/player/Player'
import {PresentationEditor} from './view/presentationEditor/PresentationEditor'

type AppProps = {
	history: HistoryType,
}

function App({history}: AppProps) {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
				>
					<Route
						index={true}
						element={(
							<Navigate
								to="/editor"
								replace={true}
							/>
						)}
					/>
					<Route
						path="/editor"
						element={<PresentationEditor history={history} />}
					/>
					<Route
						path="/player"
						element={<Player />}
					/>
				</Route>
			</Routes>
		</Router>
	)
}

export {
	App,
}
