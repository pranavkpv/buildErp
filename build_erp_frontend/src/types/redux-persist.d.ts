declare module 'redux-persist/lib/storage' {
  const storage: any;
  export default storage;
}

declare module 'redux-persist/es/persistReducer' {
  import { Reducer } from 'redux';
  import { PersistConfig } from 'redux-persist';

  export default function persistReducer<S, A>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S, A>
  ): Reducer<S, A>;
}