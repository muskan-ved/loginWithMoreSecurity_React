import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
   key: 'root',
   storage: storage,
}

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, reducers)
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default () => {
   let store = createStore(
     persistedReducer, composeWithDevTools(
      applyMiddleware(...middlewares),
      // other store enhancers if any
    )
   //   applyMiddleware(...middlewares)
   )

   let persistor = persistStore(store)
   return { store, persistor }
}