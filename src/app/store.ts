import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { addHours } from 'date-fns'
import ApiClient, {axiosInstance} from "@/services/api-client";
import axios from "axios";

interface TimeStore {
    timeOffset: string | number
    currentDate: any
    changeTime: any
    timezones: any
    fetchTimezones: any
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
                    parseFloat(time) > parseFloat(state.timeOffset ? state.timeOffset : '0') ?
                        {
                            timeOffset: time,
                            currentDate: addHours(state.currentDate, 1)
                        }
                        :
                        {
                            timeOffset: time,
                            currentDate: addHours(state.currentDate, -1)
                        }
            )),

        }),
        { name: 'timeStore' }

)))