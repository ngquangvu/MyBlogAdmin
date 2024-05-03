export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg']

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const getFileNameAndExtension = (url: string | undefined): string | null => {
  const match = url ? url.match(/\/([^\/?#]+)\.([a-z0-9]+)(?:[?#]|$)/i) : ''
  if (match && match.length === 3) {
      const fileName = match[1]
      const extension = match[2]
      return fileName + '.' + extension
  }
  return null // return null if no match found
}

// change date format to yyyy-mm-dd HH:MM:SS
export const changeDateFormat = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toISOString().split('T')[0] + ' ' + dateObj.toTimeString().split(' ')[0]
}