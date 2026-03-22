import { createContext } from "react";
import { placeOrder, fetchHoldings } from "../services/Api";

export const HoldingsContext = createContext();

export const HoldingsProvider = ({ children }) => {

  const buyStock = async ({ name, qty, price }) => {
    await placeOrder({
      name,
      qty,
      price,
      mode: "BUY",
    });
    return fetchHoldings(); // GET only
  };

  const sellStock = async ({ name, qty, price }) => {
    await placeOrder({
      name,
      qty,
      price,
      mode: "SELL",
    });
    return fetchHoldings(); // GET only
  };

  return (
    <HoldingsContext.Provider value={{ buyStock, sellStock }}>
      {children}
    </HoldingsContext.Provider>
  );
};
