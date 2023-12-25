import {useTimeStore} from "@/app/store";
import {CardActive} from "@/app/components/Card/CardActive";
import {CardSkeleton} from "@/app/components/Card/CardSkeleton";

interface Props {
  timeZoneKey: string
  timeFormat: boolean
}

export const Card = ({timeZoneKey, timeFormat}: Props) => {
  const timezonesMap = useTimeStore(state => state.timezonesMap)
  if (timezonesMap[timeZoneKey]) {
    return (<CardActive timeZone={timezonesMap[timeZoneKey]} timeFormat={timeFormat}/>)
  }
  return (<CardSkeleton/>)
}
