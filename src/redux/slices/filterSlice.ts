import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {TypesFilterFromStore, TypesStateFromFilter} from '../../redux/@types/TypesForRedux-Toolit'
export const requestPizza = createAsyncThunk<TypesStateFromFilter[], TypesFilterFromStore>(
    'filter/getPizza',
    async ({ currentPage, sortType, categories }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<TypesStateFromFilter[]>(
                `https://66922f91346eeafcf46c1aee.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortType.price}&order=${sortType.sortWord}${ categories === 0 ? '' : `&search&category=${categories}`}`
            );            
            return data;
        } catch (err) {
            // Возвращаем ошибку в payload
            return rejectWithValue(err);
        }
        // Тут наш async функция НЕ ВЫЗЫВАЕТСЯ ! а просто создается а потом в actionCreator вызывается в переменной result
        // ответ tru или catch возвращается в result из actionCreator который находится в createAsyncThunk
    }
);

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        categories: 0,
        currentPage: 1,
        filterPizz: '',
        sortType: { price: 'price', sortWord: 'asc' },
        state: [],
    },
    reducers: {
        sortCategory: (state:TypesFilterFromStore, action: PayloadAction<number>) => {
            state.categories = action.payload;
        },
        sortPage: (state:TypesFilterFromStore, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        sortType: (state:TypesFilterFromStore, action: PayloadAction<{price: string, sortWord: string}>) => {
            state.sortType = action.payload;
        },
        filterPizzaInInput: (state:TypesFilterFromStore, action: PayloadAction<string>) => {
            state.filterPizz = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestPizza.fulfilled, (state:TypesFilterFromStore, action) => {
                // console.log('action.payload', action.payload);
                state.state = [...action.payload];
            })
            .addCase(requestPizza.rejected, (state:TypesFilterFromStore, action) => {
                // console.log('action', action.payload);
            });
    }
});

export default filterSlice.reducer;
