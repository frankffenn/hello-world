import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from './hooks'

export const store = configureStore({
    reducer: {
      app: appReducer,
    },
  })
