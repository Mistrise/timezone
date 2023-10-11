import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { addHours } from 'date-fns'
import ApiClient, {axiosInstance} from "@/services/api-client";
import axios from "axios";

interface TimeStore {
    timeOffset: string
    currentDate: any
    changeTime: any
    timezones: any
    fetchTimezones: any
}


export const useTimeStore = create<TimeStore>()(
    (devtools(
         (set) => ({
            timeOffset: '',
            timezones: [],
            currentDate: new Date(),
            fetchTimezones: async () => {
              const result = await axiosInstance.get('https://timeapi.io/api/TimeZone/AvailableTimeZones')
                set({timezones: result})
            },
            changeTime: (by: any) => set((state) => (
                {
                    timeOffset: by,
                    currentDate: addHours(state.currentDate, Number(state.timeOffset.slice(0, -1)))
                }
            )),

        }),
        { name: 'timeStore' }

)))