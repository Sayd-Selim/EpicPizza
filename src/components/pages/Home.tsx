import React, { useEffect, useState } from "react";
import qs from "qs";
import Skeleton from "../PizzaBlock/Skeleton";
import Categories from "../Categories";
import Sort from "../Sort";
import PizzaBlock from "../PizzaBlock";
import { Pagination } from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestPizza } from "../../redux/slices/filterSlice";
import { Redux_Toolkit_Store } from "../../redux/@types/TypesForRedux-Toolit";
import { AppDispatch } from "../../redux/store"; // Предположим, что эти типы определены в вашем store файле

const Home: React.FC = () => {
  const SingleArrForRenderSkeleton: undefined[] = [...new Array(4)];
  const dispatch: AppDispatch = useDispatch();
  const { currentPage, sortType, categories, filterPizz, state } = useSelector(
    (state: Redux_Toolkit_Store) => state.filter
  );
  
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        requestPizza({
          currentPage,
          sortType,
          categories,
          filterPizz,
          state: []
        })
      );
    };
    fetchData();
    window.scrollTo(0, 50);
  }, [sortType.sortWord, filterPizz, currentPage, categories, dispatch]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortType: sortType.sortWord,
      categories,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categories, currentPage, sortType.sortWord, navigate]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {state.length === 0 &&
          SingleArrForRenderSkeleton.map((elem, index) => (
            <Skeleton key={index} />
          ))}
        {state
          .filter((Pizza) =>
            Pizza.name.toLowerCase().includes(filterPizz.toLowerCase())
          )
          .map(({ id, name, imageUrl, sizes, types, price }, i) => (
            <PizzaBlock
              id={id}
              key={i}
              name={name}
              imageUrl={imageUrl}
              sizes={sizes}
              types={types}
              price={price}
            />
          ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
