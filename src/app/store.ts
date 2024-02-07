import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {addMinutes} from 'date-fns'
import {immer} from "zustand/middleware/immer";
import {citiesConst} from "@/constants/constants";

export type TimeZone = {
  countryCode: string
  countryName: string
  gmtOffset: number
  timestamp: number
  zoneName: string
}

interface TimeStore {
  hoursOffset: number
  currentDate: any
  setHoursOffset: any
  timezonesMap: Record<string, TimeZone>
  selectedTimezoneKeys: any
  initSelectedTimezonesKeys: any
  citiesList: any
  removeTimezone: any
  fetchCurrentDate?: any
  initTimeZonesMap: any
  addTimezone: any
  timeOffsetAddedHours: any
  updateCurrentDate: any
  shuffleTimezone: any
}


// @ts-ignore

export const useTimeStore = create<TimeStore>()(
  (devtools(
    immer(
      (set) => ({
        // TODO rename to hoursOffset
        hoursOffset: 0,
        timeOffsetAddedHours: '',
        timezonesMap: {},
        selectedTimezoneKeys: [
          "Europe/Moscow",
          "Europe/Paris",
          "Europe/Prague",
          "America/New_York",
          "Asia/Hong_Kong",
        ],
        citiesList: citiesConst,
        currentDate: new Date(),

        removeTimezone: (city: string) => set(state => ({selectedTimezoneKeys: state.selectedTimezoneKeys.filter((timezone: any) => timezone !== city)})),
        initSelectedTimezonesKeys: (timezoneKeys: string[]) => set(state => ({selectedTimezoneKeys: timezoneKeys})),
        shuffleTimezone: (timezones: []) => set(state => {
          state.selectedTimezoneKeys = timezones
        }),

        addTimezone: (city: any) => set(state => {
          state.selectedTimezoneKeys.includes(city) || state.selectedTimezoneKeys.push(city)
        }),
        initTimeZonesMap: (timeZones: TimeZone[]) => set(state => ({
          timezonesMap: timeZones.reduce((acc, timeZone) => {
            acc[timeZone.zoneName] = timeZone
            return acc;
          }, {} as Record<string, TimeZone>)
        })),

        // TODO rename to changeHoursOffset
        setHoursOffset: (nextTimeOffsetHours: number) => set((state) => {
          if (nextTimeOffsetHours !== state.hoursOffset) {
            return {
              hoursOffset: nextTimeOffsetHours,
            }
          }
          return undefined
        }),
        updateCurrentDate: () => set((state) => {
          const nextDate = new Date();
          if (nextDate.getMinutes() !== state.currentDate.getMinutes()) {
            return {
              currentDate: nextDate,
            }
          }
        }),
      })),
    {name: 'timeStore'}
  )))


export const useRapidTimeStore = create<{ secondsOffset: number, setSecondsOffset: any }>()(
  (devtools(
    immer(
      (set) => ({
        secondsOffset: 0,
        setSecondsOffset: (nextSecondsOffset: number) => set(() => {
          return {
            secondsOffset: nextSecondsOffset
          }
        }),
      })),
    {name: 'rapidTimeStore'}
  )))