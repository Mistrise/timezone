import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {addMinutes} from 'date-fns'
import {immer} from "zustand/middleware/immer";
import {citiesConst} from "@/constants/constants";

interface TimeStore {
    timeOffset: string
    currentDate: any
    changeTime: any
    timezones: any
    resetCurrentDate: any
    citiesList: any
    removeTimezone: any
    fetchCurrentDate?: any
    removeCitiesList: any
    addTimezone: any
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

            removeTimezone: (city: string) => set(state => ({timezones: state.timezones.filter((timezone: any) => timezone !== city)})),

            addTimezone: (city: any) => set(state => {state.timezones.push(city)}),

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
        })),
        { name: 'timeStore' }
)))