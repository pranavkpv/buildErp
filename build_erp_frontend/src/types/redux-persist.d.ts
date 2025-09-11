declare module 'redux-persist/es/persistReducer' {
  import { Reducer } from 'redux';
  import { PersistConfig, PersistReducer } from 'redux-persist';

  export default function persistReducer<S, A>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S, A>
  ): Reducer<S, A> & PersistReducer<S>;
}
