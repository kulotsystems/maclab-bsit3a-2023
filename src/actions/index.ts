export const signIn = (user:object|undefined) => {
    return {
        type: 'sign-in',
        payload: user
    }
}

export const signOut = () => {
    return {
        type: 'sign-out',
        payload: null
    }
}
