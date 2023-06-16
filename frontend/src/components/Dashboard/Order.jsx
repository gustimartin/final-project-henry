import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdes } from "../../features/ordesSlice";
import style from "../../styles/order.module.css";

const OrderDashboard = () => {
  const dispatch = useDispatch();
  const { allOrdes: ordes } = useSelector((state) => state.ordes);

  useEffect(() => {
    dispatch(getAllOrdes());
  }, [dispatch]);

  return (
    <>
      <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
              Orders
            </h1>
            {ordes &&
              ordes.map((e) => (
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <p className={style.p}>
                    Order: <span className={style.span_id}>{e._id}</span>
                  </p>
                  <p className={style.p}>
                    Date: <span className={style.span_id}>{e.createdAt}</span>
                  </p>
                  <div className={style.container_product}>
                    <div className={style.products}>
                      <div className={style.container_img}>
                        {e.products.map((product) => (
                          <img
                            className={style.img}
                            src={product.image}
                            alt={product.name}
                          />
                        ))}
                      </div>
                      <div>
                        {e.products.map((product) => (
                          <>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0"></div>
                            <p className={style.p}>
                              Name:{" "}
                              <sapn className={style.span_id}>
                                {product.name}
                              </sapn>
                            </p>
                            <p className={style.p}>
                              Category:{" "}
                              <span className={style.span_id}>
                                {product.category}
                              </span>
                            </p>
                            <p className={style.p}>
                              Price:{" "}
                              <span className={style.span_id}>
                                ${product.price}
                              </span>
                            </p>
                          </>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className={style.p}>
                        Country: {e.shipping.address.country}
                      </p>
                      <p className={style.p}>
                        Postal code: {e.shipping.address.postal_code}
                      </p>
                      <p className={style.p}>
                        Line: {e.shipping.address.line1}
                      </p>
                      <p className={style.p}>Email: {e.shipping.email}</p>
                      <p className={style.p}>Name: {e.shipping.name}</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0"></div>
                  <div className={style.total}>
                    <p className={style.p}>Total:</p>
                    <p className={style.span_id}>${(e.total / 100)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDashboard;
