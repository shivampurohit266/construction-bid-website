export const reducer = (state:any, action:any) => {
    if (action.type === "NO_VALUE") {
        return { ...state, isModalOpen: true, modalContent: "", status: false };
    }
    if (action.type === "CLOSE_MODAL") {
        return { ...state, isModalOpen: false, status: false };
    }

    if (action.type === "EMPTY_VALUES") {
        return { ...state, isModalOpen: true, status: false };
    }

    if (action.type === "SUCCESS") {
        return { ...state, isModalOpen: true, status: true };
    }

    if (action.type === "ERROR") {
        return { ...state, isModalOpen: true, status: false };
    }
    if (action.type === "EXISTING_EMAIL") {
        return { ...state, isModalOpen: true, status: false };
    }
    throw new Error("no matching action type");
};
