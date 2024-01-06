'use client'
import { store } from "@/lib/store";
import {Provider} from "react-redux";

export const ReduxStoreProvider = ({ children }: {children: React.ReactNode}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}