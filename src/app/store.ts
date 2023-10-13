import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {addMinutes} from 'date-fns'
import {axiosInstance} from "@/services/api-client";

interface TimeStore {
    timeOffset: string | number
    currentDate: any
    changeTime: any
    timezones: any
    fetchTimezones: any
    resetCurrentDate: any
}


// @ts-ignore
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
            changeTime: (time: string) => set((state) => (
                time === '' ?
                {
                    timeOffset: time,
                }
                :
                    parseFloat(time) >= parseFloat(state.timeOffset ? state.timeOffset : '0') ?
                        {
                            timeOffset: time,
                            currentDate: addMinutes(state.currentDate, 30)
                        }
                        :
                        {
                            timeOffset: time,
                            currentDate: addMinutes(state.currentDate, -30)
                        }
            )),
             resetCurrentDate: () => set(
                 {currentDate: new Date()}
             ),
             
        }),
        { name: 'timeStore' }

)))