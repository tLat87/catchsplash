import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import catchReducer from './slices/catchSlice';
import legendReducer from './slices/legendSlice';

const rootReducer = combineReducers({
  catch: catchReducer,
  legend: legendReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
