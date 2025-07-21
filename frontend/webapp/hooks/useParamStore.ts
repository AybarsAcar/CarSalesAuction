import {create} from "zustand/react";

type State = {
    pageNumber: number;
    pageSize: number;
    pageCount: number;
    searchTerm: string;
    orderBy: string;
    filterBy: string;
}

type Action = {
    setParams: (params: Partial<State>) => void;
    reset: () => void;
}

const initialState: State = {
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: "",
    orderBy: "make",
    filterBy: "live",
}

// create the hook to update the parameter's store
export const useParamStore = create<State & Action>((set) => ({
    ...initialState,

    setParams: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageNumber) {
                return {...state, pageNumber: newParams.pageNumber};
            } else {
                return {...state, ...newParams, pageNumber: 1};
            }
        });
    },

    reset: () => {
        set(initialState);
    }
}));