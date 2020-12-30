import './styles/body.scss';
import { Loading } from './components/loading.component';
import { Root } from './components/root.component';
import { GlobalProvider } from './providers';

import React, { FC, useState } from 'react';

export const App: FC = () => {
  const [loading, setLoadingInto] = useState(false);

  return (
    <GlobalProvider.Provider value={{
      setLoading: setLoadingInto,
    }}
    >
      <Root />
      {loading
        ? <Loading />
        : null}
    </GlobalProvider.Provider>
  );
};
