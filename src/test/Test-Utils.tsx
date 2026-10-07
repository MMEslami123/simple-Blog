import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import type { JSX } from "react/jsx-runtime"
import { configureStore } from "@reduxjs/toolkit"
import articleSlice from "../Redux/ArticleSlice"

export const renderWithProviders = (ui: JSX.Element) => {
    const store = configureStore({
        reducer: {
            articles: articleSlice
        }
    })
    render(<Provider store={store}>
        <MemoryRouter>
            {ui}
        </MemoryRouter>
    </Provider>)
}