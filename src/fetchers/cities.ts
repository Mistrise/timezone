import {debouncePromise} from "@/helpers/debouncePromise";
import {City} from "@/app/store";

// TODO cleanup and save to storage
const queryCacheStack: Record<string, { results: City[] }> = {}

const queryByWhere = async (where?: string): Promise<{ results: City[] }>  => {
  const cacheKey = where || 'empty'
  if (!queryCacheStack[cacheKey]) {
    const searchParams =  new URLSearchParams()
    searchParams.append('select', "name,timezone,coordinates,geoname_id,country_code")
    searchParams.append('order_by', 'population desc')
    searchParams.append('limit', '20')
    // TODO maybe change, added so we don't show a lot of small cities
    searchParams.append('where', 'population > 100000')
    if (where) {
      searchParams.append('where', where)
    }
    const res = await fetch(`https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000@public/records?${searchParams}`)
    queryCacheStack[cacheKey] = await res.json();
  }
  return queryCacheStack[cacheKey];
}
export const search = async (searchQuery: string): Promise<{ results: City[] }> => {
  if (searchQuery.length) {
    return queryByWhere(`search(name,"${searchQuery}")`)
  } else {
    return queryByWhere()
  }
}

export const debouncedSearch = debouncePromise(search, 500)

export const getByIds = async (cityIds: string[]): Promise<{ results: City[] }> => {
  return queryByWhere(`geoname_id IN (${cityIds.map((cityId) => `"${cityId}"`).join(',')})`)
}

