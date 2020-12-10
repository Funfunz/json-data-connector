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
    const operator = Object.keys(filters[fieldName] as IFilter)[0] as OperatorsType
    return operatorMatcher(item[fieldName] as FilterValues, operator, (filters[fieldName] as any)[operator] as FilterValues)
  }
}

function operatorMatcher(entry: FilterValues, operator: OperatorsType, value: FilterValues) {
  console.log('operator', entry, operator, value)
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
    return Array.isArray(value) && value.includes(entry as never)
  case '_nin':
    return Array.isArray(value) && !value.includes(entry as never)
  case '_like':
    // not implemented!
    return false
  case '_nlike':
    // not implemented!
    return false
  case '_is_null':
    return entry === undefined || entry === null 
  default:
    return false
  }
}