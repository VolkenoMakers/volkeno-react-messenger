import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { persistStore } from 'redux-persist'
// eslint-disable-next-line no-unused-vars
import { PersistGate } from 'redux-persist/integration/react'

// eslint-disable-next-line no-unused-vars
const persistor = persistStore(store)

export function renderWithRedux(Component: any) {
  return render(
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      {/* <BrowserRouter> */}
      <Component />
      {/* </BrowserRouter> */}
      {/* </PersistGate> */}
    </Provider>
  )
}
