import {createContext, Dispatch, SetStateAction, useContext} from 'react';

export interface TimeOffset {
    interval: string
    setInterval?: Dispatch<SetStateAction<string>>
}
export const MyContext = createContext<TimeOffset>({interval: 'test'} );

export function useMyContext() {
    return useContext(MyContext);
}

