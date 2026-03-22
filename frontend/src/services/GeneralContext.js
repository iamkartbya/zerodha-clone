import React, { createContext, useState } from "react";
import BuyActionWindow from "../pages/dashboard/BuyActionWindow";

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [isOrderWindowOpen, setIsOrderWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderMode, setOrderMode] = useState("BUY");

  //  Open Buy / Sell window
  const openOrderWindow = (stock, mode = "BUY") => {
    setSelectedStock(stock);
    setOrderMode(mode);
    setIsOrderWindowOpen(true);
  };

  //  Close window
  const closeOrderWindow = () => {
    setIsOrderWindowOpen(false);
    setSelectedStock(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openOrderWindow,
        closeOrderWindow,
      }
      } >
      {children}

      {/*  Global Buy/Sell Modal */}
      {isOrderWindowOpen && selectedStock && (
        <BuyActionWindow stock={selectedStock} mode={orderMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
