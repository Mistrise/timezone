import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TimeStore {
    timeOffset: string
    changeTime: (by: string) => void
}

export const useTimeStore = create<TimeStore>()(
    (devtools(

        (set) => ({
            timeOffset: '',

            changeTime: (by) => set(() => ({timeOffset: by})),

        }),
        { name: 'timeStore' }

)))