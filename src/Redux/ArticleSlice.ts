import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Article } from "../Models/Models";
import axios from "axios";

interface ArticleState {
    items: Article[],
    current: Article | null
    loading: boolean
}
const BASE_URL = "https://article-db.onrender.com/articles";

export const fetchArticles = createAsyncThunk("articles/fetchAll", async () => {
    const { data } = await axios.get(BASE_URL);
    return data
})
export const fetchArticleById = createAsyncThunk("articles/fetchOne", async (id: string) => {
    const { data } = await axios.get(`${BASE_URL}/${id}`)
    return data;
})
export const addArticle = createAsyncThunk("articles/add", async (values: Article) => {
    const { data } = await axios.post(BASE_URL, values);
    return data
})
export const editArticle = createAsyncThunk("articles/edit", async ({ id, values }: { id: string, values: Partial<Article> }) => {
    const { data } = await axios.patch(`${BASE_URL}/${id}`, values);
    return data
})
export const deleteArticle = createAsyncThunk("articles/delete", async (id: string) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
})
const initialState: ArticleState = {
    items: [],
    current: null,
    loading: true
}
const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.current = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchArticles.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchArticleById.pending, (state) => {
                state.loading = true;
                state.current = null;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.current = action.payload;
                state.loading = false;
            })
            .addCase(fetchArticleById.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addArticle.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editArticle.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id == action.payload.id);
                if (index != -1) state.items[index] = action.payload;
                state.current = action.payload;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id != action.payload);
                state.current = null;
            })
    }
})
export default articleSlice.reducer;