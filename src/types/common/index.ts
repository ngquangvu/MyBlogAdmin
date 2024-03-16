export type ResponseDataType = {
  statusCode: number
  type: string
  timestamp: Date
  path: string
  message: string
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum Role {
  USER =  'USER',
  AUTHOR =  'AUTHOR'
}