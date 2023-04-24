import { createStore ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const middware = [thunk]
export const store = createStore(reducer,applyMiddleware(...middware))