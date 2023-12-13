import { DATA, MANUALLYDATA } from "../types/dataType"

const dataAction = (data) => {
    return {
        type: DATA,
        data: data,
    }
}

const munallyDataAction = (data,currentData,currentName) => {
    return {
        type: MANUALLYDATA,
        data: data,
        currentData: currentData,
        currentName: currentName,
    }
}

export { dataAction, munallyDataAction }