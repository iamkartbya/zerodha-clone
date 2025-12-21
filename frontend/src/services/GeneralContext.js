import React, { useState } from "react";
import BuyActionWindow from "../pages/dashboard/BuyActionWindow";

const GeneralContext = React.createContext({
  openOrderWindow: (stock, mode) => {},
  closeOrderWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isOrderWindowOpen, setIsOrderWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderMode, setOrderMode] = useState("BUY");

  const openOrderWindow = (stock, mode = "BUY") => {
    setIsOrderWindowOpen(true);
    setSelectedStock(stock); // full stock object
    setOrderMode(mode);
  };

  const closeOrderWindow = () => {
    setIsOrderWindowOpen(false);
    setSelectedStock(null);
    setOrderMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        openOrderWindow,
        closeOrderWindow,
        selectedStock,
        orderMode,
      }}
    >
      {props.children}

      {isOrderWindowOpen && selectedStock && (
        <BuyActionWindow
          uid={selectedStock.name}
          stock={selectedStock}
          mode={orderMode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
