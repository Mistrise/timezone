import {City} from "@/app/page";

export const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
]

export const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const globalDate = new Date()

export const citiesConst: City[] = [
    {
        id: 1,
        city: 'Moscow',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
    },
    {
        id: 2,
        city: 'London',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
    },
    {
        id: 3,
        city: 'New York',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
    },
    {
        id: 4,
        city: 'Paris',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
    },
    {
        id: 5,
        city: 'Washington',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
    },
]