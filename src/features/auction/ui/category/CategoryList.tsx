import React, { useState, useEffect } from "react";
import CategoryBoardCard from "./CategoryBoardCard";
import { useAuctionQuery } from "../../hooks/useAuctionQuery";
import { useProductQuery } from "../../hooks/useProductQuery";
import { Skeleton } from "antd";
import { TimerStore } from "@/shared";
const CategoryList = () => {
  const [selected, setSelected] = useState(0);
  const [isMdSize, setisMdSize] = useState(false);
  const { productIsLoading, productIsError, products } = useProductQuery();
  const { auctionIsLoading, auctionIsError, auction } = useAuctionQuery();
  const { startTimer, stopTimer } = TimerStore();

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    const isMdSizehandler = () => {
      if (window.innerWidth > 768) {
        setisMdSize(true);
      } else {
        setisMdSize(false);
      }
    };

    window.addEventListener("resize", isMdSizehandler);
    isMdSizehandler();
    return () => window.removeEventListener("resize", isMdSizehandler);
  }, []);

  const getProductByAuctionId = (auctionId: number) => {
    const product = products?.find((item) => auctionId === item.auctionId);
    return product;
  };

  const menus: string[] = [
    "인기순",
    "신상품순",
    "판매가 낮은순",
    "브랜드 별",
    "카테고리 별",
  ];

  return (
    <div className="container mx-auto">
      {!productIsLoading && !auctionIsLoading ? (
        <div className="inner">
          <div className="menu_select flex   items-center w-screen md:w-[1200px] h-[50px] scrollbar-hide">
            <div className="menu_list md:w-[800px] flex overflow-x-auto  whitespace-nowrap scrollbar-hide">
              <ul className=" my-auto flex   whitespace-nowrap scrollbar-hide md:justify-around">
                {menus.map((menu, index) => (
                  <li
                    key={index}
                    onClick={() => setSelected(index)}
                    className={` mr-7 ml-3 cursor-pointer pb-1  ${selected === index ? "font-bold border-black border-b-2  " : ""}`}
                  >
                    {menu}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="board_list  border-t-2 w-screen md:w-[70rem] h-[30rem] ">
            {auction?.map((data) => {
              const product = getProductByAuctionId(data.id);
              return product ? (
                <CategoryBoardCard
                  key={data.id}
                  auction={data}
                  product={product}
                  isMdSize={isMdSize}
                />
              ) : (
                <div className="w-[55rem] h-[8rem] bg-gray-300 rounded-lg animate-pulse mb-3"></div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryList;
