import { DATA } from "../types/dataType"

const dataAction = (data) => {
    return {
        type: DATA,
        data: data,
    }
}

export { dataAction }