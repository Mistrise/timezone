import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from "zustand/middleware/immer";

export type TimeZone = {
  countryCode: string
  countryName: string
  gmtOffset: number
  timestamp: number
  zoneName: string
}

export interface CityCoordinates {
  lon: number
  lat: number
}

export interface City {
  geoname_id: string
  name: string
  ascii_name: string
  alternate_names: string[]
  feature_class: string
  feature_code: string
  country_code: string
  cou_name_en: string
  country_code_2: any
  admin1_code: string
  admin2_code: string
  admin3_code: string
  admin4_code: string
  population: number
  elevation: any
  dem: number
  timezone: string
  modification_date: string
  label_en: string
  coordinates: CityCoordinates
}

interface TimeStore {
  hoursOffset: number
  currentDate: any
  setHoursOffset: any
  selectedCities: City[]
  removeCity: any
  fetchCurrentDate?: any
  init: (cities: City[]) => void
  isInitialized: boolean;
  addCity: any
  timeOffsetAddedHours: any
  updateCurrentDate: any
  shuffleTimezone: any
  toggleTimeFormat: boolean
  setToggleTimeFormat: any
}


// @ts-ignore

export const useTimeStore = create<TimeStore>()(
  (devtools(
    immer(
      (set) => ({
        // TODO rename to hoursOffset
        hoursOffset: 0,
        timeOffsetAddedHours: '',
        selectedCities: [],
        currentDate: new Date(),
        toggleTimeFormat: true,
        isInitialized: false,
        setToggleTimeFormat: (timeFormat: boolean) => set(() => ({toggleTimeFormat: timeFormat})),
        removeCity: (removedCity: City) => set(state => ({selectedCities: state.selectedCities.filter((city) => city.geoname_id !== removedCity.geoname_id)})),
        init: (cities: City[]) => set(state => ({selectedCities: cities, isInitialized: true})),
        shuffleTimezone: (timezones: []) => set(state => {
          state.selectedCities = timezones
        }),

        addCity: (nextCity: City) => set(state => {
          if (!state.selectedCities.find((city) => city.geoname_id === nextCity.geoname_id)) {
            state.selectedCities.push(nextCity)
          }
        }),

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