import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { addHours } from 'date-fns'

interface TimeStore {
    timeOffset: string
    currentDate: any
    changeTime: any
}

export const useTimeStore = create<TimeStore>()(
    (devtools(
        (set) => ({
            timeOffset: '',
            currentDate: new Date(),
            changeTime: (by: any) => set((state) => (
                {
                    timeOffset: by,
                    currentDate: addHours(state.currentDate, Number(state.timeOffset.slice(0, -1)))
                }
            )),

        }),
        { name: 'timeStore' }

)))