import { UserAuthActionType } from '../types/UserAction.type';

const userReducer = (state:object|null = null, action:UserAuthActionType ) => {
    switch (action.type) {
        case 'sign-in':
            return action.payload;
        default:
            return null
    }
};

export default userReducer;
