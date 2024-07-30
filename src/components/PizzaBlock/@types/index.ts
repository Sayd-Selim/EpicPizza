import { TypesStateFromFilter } from "../../../redux/@types/TypesForRedux-Toolit"


export type props_Pizza = Omit<TypesStateFromFilter, 'category' | 'rating'> // Omit удаляет ключи