export function DateFormatRU(dateIn: string) {
  const date = new Date(dateIn)
  const formattedDate =
    [('0' + date.getDate()).slice(-2), ('0' + (date.getMonth() + 1)).slice(-2), date.getFullYear()].join('.') + ' ' + [('0' + date.getHours()).slice(-2), ('0' + date.getMinutes()).slice(-2)].join(':')

  return formattedDate
}
