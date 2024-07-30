import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Paginate.module.scss'
import { useDispatch } from 'react-redux'
export const Pagination:React.FC = React.memo(() => {
  const dispatch = useDispatch()
  
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch({type: 'filter/sortPage' ,  payload: event.selected + 1})}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      />
  )
})
