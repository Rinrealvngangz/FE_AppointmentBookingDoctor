export interface IDoctor{
  total:number
  doctors:[{
    DOB: string
    address: string
    doctorId: number
    firstName: string
    lastName: string
    nameRole: string
    phone: string
    speciallityName: string
  }]
}
