import React, { useCallback, useRef, useState } from 'react'

import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { useWhyDidYouUpdate } from 'ahooks'

const Search:React.FC<any> = ({ stateForFilterPizz }) => {
  
  
  const [state, setState] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onClickCloseInput = () => {
    dispatch({type: 'filter/filterPizzaInInput', payload: ''})
    setState('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str:string) => {
      dispatch({type: 'filter/filterPizzaInInput', payload: str})
    }, 250),
    [],
  )

  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height='18px'
        version='1.1'
        viewBox='0 0 18 18'
        width='18px'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title />
        <desc />
        <defs />
        <g
          fill='none'
          fillRule='evenodd'
          id='Page-1'
          stroke='none'
          strokeWidth='1'
        >
          <g
            fill='#000000'
            id='Core'
            transform='translate(-339.000000, -381.000000)'
          >
            <g id='search' transform='translate(339.000000, 381.000000)'>
              <path
                d='M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z'
                id='Shape'
              />
            </g>
          </g>
        </g>
      </svg>
      <input
        ref={inputRef}
        value={state}
        onChange={event => onChangeInput(event)}
        className={styles.input}
        type='text'
        placeholder='Поиск пиццы...'
      />
      {stateForFilterPizz && (
        <svg
          onClick={() => onClickCloseInput()}
          className={styles.clearIcon}
          height='512px'
          id='Layer_1'
          version='1.1'
          viewBox='0 0 512 512'
          width='512px'
        >
          <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
        </svg>
      )}
    </div>
  )
}

export default Search
