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


export let globalDate = new Date()

export const citiesConst: City[] = [
    {
        id: 1,
        city: 'Moscow',
        country: 'Russia',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getUTCHours(),
        minutes: globalDate.getUTCMinutes(),
        date: `${days[globalDate.getUTCDay()]} ${globalDate.getUTCDate()} ${month[globalDate.getUTCMonth()]}`,
        flag: `🇷🇺`
    },
    {
        id: 2,
        city: 'London',
        country: 'UK',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`,
        flag: `🇬🇧`
    },
    {
        id: 3,
        city: 'New York',
        country: 'USA',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`,
        flag: `🇺🇸`
    },
    {
        id: 4,
        city: 'Paris',
        country: 'France',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`,
        flag: `🇫🇷`
    },
    {
        id: 5,
        city: 'Washington',
        country: 'USA',
        timezone: `GMT ${
            globalDate.getTimezoneOffset() < 0 ?
                "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
        }`,
        hours: globalDate.getHours(),
        minutes: globalDate.getMinutes(),
        date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`,
        flag: `🇺🇸`
    },
]