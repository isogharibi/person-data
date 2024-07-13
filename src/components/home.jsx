import { useEffect, useRef, useState } from "react";
import React from "react";

export default function Home() {
  const [Products, SetProducts] = useState([]);
  const [Sorted, SetSorted] = useState(false);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=3&limit=15")
      .then((Response) => Response.json())
      .then((OutPut) => SetProducts(OutPut));
  }, []);

  const SortedProductsASC = Products.sort((a, b) => a.price - b.price);
  const SortedProductsDESC = Products.sort((a, b) => b.price - a.price);

  return (
    <section>
      <ul className="flex justify-center gap-x-5 list-none pt-10 pb-10">
        <li className="bg-white p-2 rounded-lg cursor-pointer" onClick={() => SetSorted(true)}> DESC </li>
        <li className="bg-white p-2 rounded-lg cursor-pointer" onClick={() => SetSorted(false)}> ASC</li>
      </ul>
      <div className="gap-8 grid grid-cols-5">
        {Sorted
          ? SortedProductsDESC.map((SortPdt) => (
              <div key={SortPdt.id}>
                <div className="bg-white p-5 rounded-lg flex flex-col gap-y-5 font-sans hover:font-serif">
                  <img className="rounded-md" src={SortPdt.images[0]} alt="" />
                  <h2>
                    {SortPdt.title.slice(0, 23)}
                    <p> {SortPdt.description.slice(0, 130)} </p>
                    <span className="bg-emerald-500 p-1 px-5 w-16 rounded-lg text-white"> {SortPdt.price}$ </span>
                  </h2>
                </div>
              </div>
            ))
          : SortedProductsASC.map((Pdts) => (
              <div key={Pdts.id}>
                <div className="bg-white p-5 rounded-lg flex flex-col gap-y-5 font-sans hover:font-serif">
                  <img className="rounded-md" src={Pdts.images[0]} alt="" />
                  <h2>
                    {Pdts.title.slice(0, 23)}
                    <p> {Pdts.description.slice(0, 130)} </p>
                  </h2>
                  <span className="bg-emerald-500 p-1 px-5 w-16 rounded-lg text-white"> {Pdts.price}$ </span>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
