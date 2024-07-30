import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";

const Categories: React.FC = React.memo(() => {

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dispatch = useDispatch();
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  function ToogleCategory(index: number) {
    dispatch({ type: "filter/sortCategory", payload: index });
    setActiveIndex(index);
  }
  return (
    <div className="categories">
      <ul>
        {categories.map((elem, i) => (
          <li
            key={i}
            onClick={() => ToogleCategory(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
