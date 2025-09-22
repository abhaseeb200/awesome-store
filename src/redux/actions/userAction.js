import { USER } from "../types/userType";

const userAction = (user) => {
    console.log(user);
    return {
        type: USER,
        currentUser: user
    };
};

export { userAction }