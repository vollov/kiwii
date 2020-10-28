import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import authReducer from './auth'
import productReducer from './product'
import orderReducer from './order'
import paymentReducer from './payment'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'product', 'order', 'payment'],
	//blacklist: ['doc']
	stateReconciler: autoMergeLevel2,
}

const reducer = combineReducers({
	auth: authReducer,
	product: productReducer,
	order: orderReducer,
	payment: paymentReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
	persistedReducer,
	compose(applyMiddleware(thunk, logger), composeWithDevTools())
)

export default store
