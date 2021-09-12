export type UserType = null | {

    name: string
    email: string
    solde?: number
    role: 'admin' | 'client' | 'employee'

}

export type UserState = {
    user: UserType,
    loading: boolean
    error: string | null
}

