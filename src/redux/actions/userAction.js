import { USER } from "../types/userType";

const currentUserAction = (user) => {
    console.log(user);
    return {
        type: USER,
        currentUser: user
    };
};

export { currentUserAction }