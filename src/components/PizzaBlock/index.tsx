import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {props_Pizza} from '../PizzaBlock/@types'
import { Types_For_InitialState_Cart_Store } from "../../redux/@types/TypesFromCart";
import { getCartFromLS } from '../../utils/getCartFromLocalStorage';
import { TypesItemsFromCart } from '../../redux/@types/TypesForRedux-Toolit';


// import useStates from "../useStates"

const PizzaBlock: React.FC<props_Pizza> = ({ id, name, imageUrl, sizes, types, price }) => {
  const [PizzaSize, setPizzaSize] = useState<number>(0);
  const [PizzaTypes, setPizzaTypes] = useState<number>(0);
  const PizzaType: string[] = ['тонкое', 'традиционное']
  
  const state = useSelector((state: Types_For_InitialState_Cart_Store) => state.cart)
  const dispatch = useDispatch();
  const Search_For_Pizza = state.items.find(elem => elem.id === id  
    &&  elem.PizzaSize === PizzaSize 
    &&  elem.PizzaTypes === PizzaTypes)

    useEffect(() => {
      localStorage.setItem('cart',JSON.stringify(state.items))
    },[state.items])


  function dispatchPizza() {
    dispatch({
      type: 'cart/addProduct',
      payload: {
        id,
        name,
        imageUrl,
        sizes,
        PizzaSize,
        PizzaType,
        PizzaTypes,
        types,
        price,
        counter: 1 // Увеличиваем значение count в payload
      }
    });
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <img
          className='pizza-block__image'
          src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
          alt='Pizza'
        />
        <h4 className='pizza-block__title'>{name}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types
            .map(type => (
              <li
                key={type}
                onClick={() => setPizzaTypes(type)}
                className={types[0] === 1 && 'active' || PizzaTypes === type ? 'active' : ''}
              >
                {PizzaType[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setPizzaSize(i)}
                className={PizzaSize === i ? 'active' : ''}
              >
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button onClick={dispatchPizza} className='button button--outline button--add'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
             { Search_For_Pizza && <i>{Search_For_Pizza.counter}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}
export default PizzaBlock
