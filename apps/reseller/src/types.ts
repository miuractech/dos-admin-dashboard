import { User } from "firebase/auth"

export type user = {
    email: string
    fullName: string
    phone: string
    storeName: string
}



export interface UserDetailState {
    userDetails: user
    loading: boolean
    error: null
    User: User | null | undefined

}