export const DELETE_PRODUCT =" DELETE_PROCUT"

export const deleteProduct = (productid) => {
    return {
        type: DELETE_PRODUCT , pid : productid    }
}