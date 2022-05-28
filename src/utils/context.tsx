import React, {createContext, Dispatch, SetStateAction, useContext, useState} from 'react';

export function createUseContextAndProvider<T>() {
  const context = createContext<T | undefined>(undefined);
  const useCtx = () => {
    const use = useContext(context);
    if (!use) throw new Error('Provider values is required.');
    return use;
  };

  return [useCtx, context.Provider] as const;
}

export function createUseContextAndComponent<T>(initialValue: T) {
  type UpdateType = Dispatch<SetStateAction<T>>;
  const initialUpdate: UpdateType = () => initialValue;
  const context = createContext({state: initialValue, update: initialUpdate});
  const useCtx = () => useContext(context);

  function Component(props: React.PropsWithChildren<{}>) {
    const [state, update] = useState(initialValue);
    return <context.Provider value={{state, update}} {...props} />;
  }

  return [useCtx, Component];
}
