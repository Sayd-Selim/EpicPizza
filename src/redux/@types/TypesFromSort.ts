import { Redux_Toolkit_Store } from './TypesForRedux-Toolit';

export type Types_SortOptions = Pick<Redux_Toolkit_Store["filter"]['sortType'], 'price' | 'sortWord'>
