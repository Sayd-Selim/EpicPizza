import { getAllPizzaFromLS, getCartFromLS, getPriceFromLS } from '../../utils/getCartFromLocalStorage';
import { TypesCartFromStore, TypesItemsFromCart } from './../@types/TypesForRedux-Toolit';
import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

const initialState:TypesCartFromStore = {
    totalPrice: getPriceFromLS(),
    items: getCartFromLS(),
    allPizz: getAllPizzaFromLS(),
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<TypesItemsFromCart>) => {
            let existingItem = state.items.find(elem => elem.id === action.payload.id
                && elem.PizzaSize === action.payload.PizzaSize
                && elem.PizzaTypes === action.payload.PizzaTypes
            );
            
            if (existingItem) {
                existingItem.counter += 1; // увеличиваем количество
            } else {
                state.items.push(action.payload); // Добавляем новый элемент
            }

            state.allPizz += action.payload.counter
            state.totalPrice += action.payload.price
        },
        deletePizza: (state, action: PayloadAction<TypesItemsFromCart>) => {
            state.items = state.items.filter((pizza) => pizza.id === action.payload.id 
            && pizza.PizzaSize !== action.payload.PizzaSize 

            || pizza.id === action.payload.id 
            && pizza.PizzaTypes !== action.payload.PizzaTypes 

            || pizza.id !== action.payload.id
         )

            state.allPizz -=  action.payload.counter
            state.totalPrice -= action.payload.counter * action.payload.price

        },

        resetCart: (state, action) => {
            state.totalPrice = 0
            state.items = []
            state.allPizz = 0
        },

        increment: (state, action: PayloadAction<TypesItemsFromCart>) => {

            let existingItem = state.items.find(elem => elem.id === action.payload.id
                && elem.PizzaSize === action.payload.PizzaSize
                && elem.PizzaTypes === action.payload.PizzaTypes
            );

            if(existingItem) {
                existingItem.counter += 1
            }
        
            state.allPizz += 1

            state.totalPrice += action.payload.price
        },

        decrement: (state, action: PayloadAction<TypesItemsFromCart>) => {
            let existingItem = state.items.find(elem => elem.id === action.payload.id
                && elem.PizzaSize === action.payload.PizzaSize
                && elem.PizzaTypes === action.payload.PizzaTypes
            );

            if(existingItem && existingItem.counter > 1) {
                existingItem.counter -= 1

                state.allPizz -= 1

                state.totalPrice -= action.payload.price
                
            }

        }
    }
})

export default cartSlice.reducer
