import React,{ useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Types_SortOptions } from "../redux/@types/TypesFromSort";

const Sort: React.FC = React.memo(() => {
  const [state, setState] = useState<boolean>(false); // State для показа окно словами сортировки

  const [ToogleClassName, setToogleClassName] = useState<number>(0); // State для переключение класса active

  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!event.composedPath().includes(sortRef.current as EventTarget)) {
        setState(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const listSortArr: string[] = [
    "цене (убывание)",
    "цене (возрастание)",
    "популярности (убывание)",
    "популярности (возрастание)",
    "алфавиту (убывание)",
    "алфавиту (возрастание)",
  ]; // Массив слов для сортировки

  const sortOptions: Types_SortOptions[] = [
    {
      price: "price",
      sortWord: "asc",
    },
    {
      price: "price",
      sortWord: "desc",
    },
    {
      price: "rating",
      sortWord: "asc",
    },
    {
      price: "rating",
      sortWord: "desc",
    },
    {
      price: "name",
      sortWord: "asc",
    },
    {
      price: "name",
      sortWord: "desc",
    },
  ];
  const sortName: string = listSortArr[ToogleClassName]; // Тут сохраняется имя на которую мы кликнули

  // Тут функцию передает в State index соответствующий из массива listSortArr, то есть, 0 или 1 или 2 и уберает окно словами сортировки

  function ToogleSort(index: number) {
    dispatch({ type: "filter/sortType", payload: sortOptions[index] });
    setToogleClassName(index);
    setState(false);
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setState(!state)}>{sortName}</span>
      </div>
      {state && (
        <div className="sort__popup">
          <ul>
            {listSortArr.map((WordsSort, i) => (
              <li
                key={i}
                onClick={() => ToogleSort(i)}
                className={ToogleClassName === i ? "active" : ""}
              >
                {WordsSort}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
