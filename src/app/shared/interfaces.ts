export interface IUserRegister {
  fullName: string,
  position: string,
  department: string,
  salary: string,
  email: string,
  password: string,
  role:string
}

export interface IUser{
  email: string,
  password: string,
}

export interface ITask{
  title: string,
  date: Date,
}
