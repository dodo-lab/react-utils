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

export function createUseContextAndStateProvider<T>(initialValue: T) {
  type UpdateType = Dispatch<SetStateAction<T>>;
  const initialUpdate: UpdateType = () => initialValue;
  const context = createContext({state: initialValue, update: initialUpdate});
  const useCtx = () => useContext(context);

  const Provider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [state, update] = useState(initialValue);
    return <context.Provider value={{state, update}}>{children}</context.Provider>;
  };

  return [useCtx, Provider] as const;
}
