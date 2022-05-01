import { FirebaseError } from "firebase/app"
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
    error: null | FirebaseError
    User: User | null | undefined

}