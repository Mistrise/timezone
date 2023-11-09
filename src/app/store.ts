import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {addMinutes} from 'date-fns'
import {axiosInstance} from "@/services/api-client";
import {immer} from "zustand/middleware/immer";
import {citiesConst} from "@/constants/constants";

interface TimeStore {
    timeOffset: string | number
    currentDate: any
    changeTime: any
    timezones: any
    fetchTimezones: any
    resetCurrentDate: any
    getTimezones: any
    citiesList: any
    removeCitiesList: any
}


// @ts-ignore
export const useTimeStore = create<TimeStore>()(
    (devtools(
         immer(
             (set) => ({
            timeOffset: '',
            timezones: [],
            citiesList: citiesConst,
            currentDate: new Date(),
            fetchTimezones: async () => {
              const result = await axiosInstance.get('https://timeapi.io/api/TimeZone/AvailableTimeZones')
                set({timezones: result})
            },
                 setCities: () => {},
            removeCitiesList: (id: number) => set(state => ({citiesList: state.citiesList.filter((city: any) => city.id !== id)})),
            changeTime: (time: string) => set((state) => (
                time === '' ?
                {
                    timeOffset: time,
                }
                :
                    // @ts-ignore
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
             getTimezones: async () => {
                const response = axiosInstance.get('timezone').then(res => res.data)
                 set({timezones: await response})
             }
        })),
        { name: 'timeStore' }
)))