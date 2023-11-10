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
    resetCurrentDate: any
    getTimezones: any
    citiesList: any
    fetchCurrentDate?: any
    removeCitiesList: any
}


// @ts-ignore
// @ts-ignore
export const useTimeStore = create<TimeStore>()(
    (devtools(
         immer(
             (set) => ({
            timeOffset: '',
            timezones: [
                "Europe/Moscow",
                "Europe/Paris",
                "Europe/Prague",
                "America/New_York",
                "Asia/Hong_Kong",
            ],
            citiesList: citiesConst,
            currentDate: new Date(),
            setCities: ( ) => {},
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