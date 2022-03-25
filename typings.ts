export interface Class{
    teacherId:string
    className:string
    classID:string
    studentCount:number
    id:string
    teacherName:string
    teacherEmail:string
    requests:[Requests]
    students:[string]
}
export interface Requests{
    name:string
    email:string
    id:string
    image:string
}
export interface Announcement{
    message:string
    publisherId:string
}