import { DATA } from "../types/dataType"

const initialState = {
    productData: {},
}

const DataReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATA:
            // const updatedData = Object.keys(action.data).map(category => action.data[category].map((product)=> { ...item, 'sizes': { 'small': item.price, 'medium': (item.price * 0.1) - item.price, 'large': (item.price * 0.2) - item.price } }));
            let updateProduct = {}
            const updatedData = Object.keys(action.data).map((category) => {
                // console.log(category,"????????????????????????????/");
                updateProduct = action.data[category].map((product)=>({
                    ...product,
                    'quantity':0,
                }))
                // return action.data[category] = updateProduct
            });
            console.log(updateProduct, "------------- UPDATE",updatedData);
            return {
                productData: { ...action.data },
            }
        default:
            return state
    }
}

export default DataReducer