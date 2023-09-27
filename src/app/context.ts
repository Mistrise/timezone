import {createContext, useContext} from 'react';

export type TimeOffset = {
    globalTimeOffset: string
    setGlobalTimeOffset: (time: string) => void
}
export const TimeContext = createContext<TimeOffset>({
    globalTimeOffset: '',
    setGlobalTimeOffset: () => {}
} );

export const useTimeContext = () => useContext(TimeContext)

