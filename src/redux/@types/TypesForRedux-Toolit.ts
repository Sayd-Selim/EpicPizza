 export interface TypesStateFromFilter {
    category: number,
    id: number,
    imageUrl: string,
    name: string,
    price: number,
    rating: number,
    sizes: number[],
    types: number[]
  }
  
  export interface TypesFilterFromStore {
    categories: number,
    currentPage: number,
    filterPizz: string,
    sortType: {price: string, sortWord: string},
    state: TypesStateFromFilter[]
  }
//  до 19 строки типы для filter 




 export interface TypesItemsFromCart {
    PizzaSize: number,
    PizzaType: string[],
    PizzaTypes: number,
    counter: number,
    id: number,
    imageUrl: string,
    name: string,
    price: number,
    sizes: number[]
    types: number[]
  }

 export interface TypesCartFromStore {
    allPizz: number,
    items: TypesItemsFromCart[],
    totalPrice: number,
  }
//   До 43 строки типы для cart 
  



 export interface Redux_Toolkit_Store {
    cart: TypesCartFromStore,
    filter: TypesFilterFromStore
  }