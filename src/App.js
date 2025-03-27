import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.css";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);
  const [loading, setLoading] = useState(true);

  const quotesRef = useRef({});

  useEffect(() => {
    fetch(
      "https://apilayer.net/api/live?access_key=c9542ab983849c68d217855353e1396d&currencies=RUB,USD,EUR,GBP&source=USD&format=1"
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.quotes) {
          quotesRef.current = json.quotes;
          onChangeToPrice(1);
          setLoading(false);
        } else {
          alert("Ошибка при получении курсов валют");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
        setLoading(false);
      });
  }, []);

  const getRate = (from, to) => {
    if (!quotesRef.current || Object.keys(quotesRef.current).length === 0)
      return 1;

    if (from === "USD" && to === "USD") return 1;

    const usdToFrom = quotesRef.current[`USD${from}`];
    const usdToTo = quotesRef.current[`USD${to}`];

    if (from === "USD") return usdToTo;
    if (to === "USD") return 1 / usdToFrom;
    return (1 / usdToFrom) * usdToTo;
  };

  const onChangeFromPrice = (value) => {
    const rate = getRate(fromCurrency, toCurrency);
    setFromPrice(value);
    setToPrice(Number((value * rate).toFixed(3)));
  };

  const onChangeToPrice = (value) => {
    const rate = getRate(toCurrency, fromCurrency);
    setToPrice(value);
    setFromPrice(Number((value * rate).toFixed(3)));
  };

  useEffect(() => {
    if (!loading) onChangeFromPrice(fromPrice);
  }, [fromCurrency, loading]);

  useEffect(() => {
    if (!loading) onChangeToPrice(toPrice);
  }, [toCurrency, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
