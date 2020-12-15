import { FilterValues, IFilter, OperatorsType } from '@funfunz/core/lib/middleware/utils/filter'

export function expression(item: Record<string, unknown>, filters: IFilter): boolean {
  if (filters._and) {
    return filters._and.reduce<boolean>((result, filter) => {
      return result && expression(item, filter)
    }, true)
  } else if (filters._or) {
    return filters._or.reduce<boolean>((result, filter) => {
      return result || expression(item, filter)
    }, false)
  } else {
    const fieldName = Object.keys(filters)[0]
    const entry = item[fieldName] as FilterValues
    const operator = Object.keys(filters[fieldName] as IFilter)[0] as OperatorsType
    const filterValue = (filters[fieldName] as {[key: string]: FilterValues})[operator]
    return operatorMatcher(entry, operator, filterValue)
  }
}

function operatorMatcher(entry: FilterValues, operator: OperatorsType, value: FilterValues) {
  switch (operator) {
  case '_eq':
    return entry == value
  case '_neq':
    return entry != value
  case '_lt':
    return entry !== null && value !== null && entry < value
  case '_lte':
    return entry !== null && value !== null && entry <= value
  case '_gt':
    return entry !== null && value !== null && entry > value
  case '_gte':
    return entry !== null && value !== null && entry >= value
  case '_in':
    return Array.isArray(value) ? value.includes(entry as never) : false
  case '_nin':
    return Array.isArray(value) ? !value.includes(entry as never) : false
  case '_like':
    return value ? (entry + '').includes(value + '') : false
  case '_nlike':
    return value ? !(entry + '').includes(value + '') :  false
  case '_is_null':
    return entry === undefined || entry === null 
  default:
    return false
  }
}