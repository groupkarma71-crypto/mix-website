import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowHeader from "./components/ShowHeader";
import Loading from "./components/Loading";
import UPIPayment from "./components/UPIPayment";

function App() {
  const HomePage = lazy(() => import("./components/HomePage"));
  const Productpage = lazy(() => import("./components/Productpage"));
  const CategoryPage = lazy(() => import("./components/CategoryPage"));
  const AddAddresspage = lazy(() => import("./components/AddAddresspage"));
  const CheckOutpage = lazy(() => import("./components/CheckOutpage"));
  const PaymentPage = lazy(() => import("./components/PaymentPage"));
  const Cartpage = lazy(() => import("./components/Cartpage"));

  // Thank You Page
  const OrderThankYou = lazy(() => import("./components/OrderThankYou"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then((productdata) => {
        setData(
          productdata.map((d) => ({
            ...d,
            rate: (Math.random() * 1.5 + 3.5).toFixed(1),
            ratenum: Math.floor(Math.random() * 99901 + 100),
          }))
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      )
        e.preventDefault();
    };

    const c = (e) => e.preventDefault();

    document.addEventListener("keydown", h);
    document.addEventListener("contextmenu", c);

    return () => {
      document.removeEventListener("keydown", h);
      document.removeEventListener("contextmenu", c);
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <ShowHeader />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <HomePage data={data} />
              </Suspense>
            }
          />

          <Route
            path="category/:category"
            element={
              <Suspense fallback={<Loading />}>
                <CategoryPage data={data} />
              </Suspense>
            }
          />

          <Route
            path="productdetails/:id/:name"
            element={
              <Suspense fallback={<Loading />}>
                <Productpage data={data} />
              </Suspense>
            }
          />

          <Route
            path="addaddress"
            element={
              <Suspense fallback={<Loading />}>
                <AddAddresspage />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cartpage data={data} />
            </Suspense>
          }
        />

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loading />}>
              <CheckOutpage data={data} />
            </Suspense>
          }
        />

        <Route
          path="/payment"
          element={
            <Suspense fallback={<Loading />}>
              <PaymentPage data={data} />
            </Suspense>
          }
        />

        <Route
          path="/upi"
          element={
            <Suspense fallback={<Loading />}>
              <UPIPayment data={data} />
            </Suspense>
          }
        />

        {/* THANK YOU PAGE */}
        <Route
          path="/thank-you"
          element={
            <Suspense fallback={<Loading />}>
              <OrderThankYou />
            </Suspense>
          }
        />
      </Routes>

      <ToastContainer
        className="!bottom-[80px]"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;