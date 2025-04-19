import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const topRef = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const [prices, setPrices] = useState({});
  const [total, setTotal] = useState(1300450);
  const [btc, setBtc] = useState(900000);
  const [eth, setEth] = useState(300000);
  const [sol, setSol] = useState(250000);



const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana");

useEffect(()=>{
ws.onmessage =(info)=>{
const data = JSON.parse(info.data);
setPrices(data);

const myBtcValue = Number(data.bitcoin)*12;
const myEthValue = Number(data.ethereum)*120;
const mySolValue = Number(data.solana)*500;

setBtc(myBtcValue.toLocaleString("en-us"));
setEth(myEthValue.toLocaleString("en-us"));
setSol(mySolValue.toLocaleString("en-us"));
}},[]);

  const handleAnim1 = () => {
    if (topRef.current) {
      topRef.current.classList.remove("animClass");
      void topRef.current.offsetWidth;
      topRef.current.classList.add("animClass");
      setTimeout(() => {
        topRef.current.classList.remove("animClass2");
        button2Ref.current.classList.toggle("button2-show");
      }, 4000);
    }
  };

  const handleAnim2 = () => {
    if (topRef.current) {
      button2Ref.current.style.backgroundColor = "#ef9800";
      topRef.current.classList.remove("animClass2");

      topRef.current.classList.add("animClass2");
      setTimeout(() => {
        topRef.current.classList.remove("animClass");
      }, 4000);
      setTimeout(() => {
        button2Ref.current.classList.toggle("button2-show");
      }, 100);
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">Bank Web</div>
        <div className="outer">
          <div className="perspective">
	  <div className="button2" ref={button2Ref}onClick={()=>{handleAnim2()}}>See bank</div>
            <div className="top" ref={topRef}>
              <div className="button1" onClick={() => handleAnim1()}>
                See coins
              </div>
              <div className="crypto-face">
                <div className="total">{total} USD</div>
                <div className="wallet">Crypto Wallet</div>
                <div className="coins-list">
                  <div
                    className="coin"
                    style={{
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <div className="logo">
                      <img src="https://i.postimg.cc/7L1GY17c/download-3.png" />
                    </div>
                    <div className="coin-name">
                      <b style={{ fontWeight:"normal", fontSize: 10 }}>12 </b>BTC
                    </div>
                    <div className="price">
                      ~ {btc}
                      <b style={{ fontSize: 10 }}>USDT</b>
                    </div>
                  </div>

                  <div className="coin">
                    <div style={{ backgroundColor: "white" }} className="logo">
                      <img src="https://i.postimg.cc/PqqWcF0y/Ethereum-logo.png" />
                    </div>
                    <div className="coin-name">
                      
                      <b style={{ fontWeight:"normal", fontSize: 10 }}>120 </b>ETH
                    </div>
                    <div className="price">
                      ~ {eth}
                      <b style={{ fontSize: 10 }}>USDT</b>
                    </div>
                  </div>

                  <div
                    className="coin"
                    style={{
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <div className="logo">
                      <img
                        style={{ width: "110%", backgroundColor: "black" }}
                        src="https://i.postimg.cc/dV6R5KND/Solana-Logo.png"
                      />
                    </div>
                    <div className="coin-name">
                      <b style={{ fontWeight:"normal", fontSize: 10 }}>500 </b>SOL
                    </div>
                    <div className="price">
                      ~ {sol}
                      <b style={{ fontSize: 10 }}>USDT</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="balance">
                <div className="bal-txt">Balance</div>
                <div className="bal-amount">$ 1,245,600</div>
              </div>
              <div className="profile">
                <div className="dp">
                  <img
                    style={{
                      position: "absolute",
                      height: "110%",
                      width: "105%",
                    }}
                    src="https://i.postimg.cc/vH7TT4rX/1720950713065.jpg"
                  />
                </div>
                <div
                  style={{
                    justifyContent: "space-between",
                    gap: 2,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="name">Onyekachi Banks</div>
                  <div className="verified">Verified ID</div>
                </div>
              </div>
            </div>
          </div>

          <div className="live-tickers">
            <div className="table-title">
              <div>Coins</div>
              <div>Price</div>
            </div>
            <div className="ticker1">
              <div>BTC</div>
              <div>{prices.bitcoin || "Loading..."}</div>
            </div>
            <div className="ticker1">
              <div>ETH</div>
              <div>{prices.ethereum}</div>
            </div>
            <div className="ticker1">
              <div>SOL</div>
              <div>{prices.solana}</div>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: 10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                width: "100%",
                height: 40,
                backgroundColor: "#c77700",
              }}
            >
              The prices above reflect real-time cryptocurrency prices. Tickers
              are tracked live.
            </div>
          </div>

          <div
            style={{
              width: "85%",
              justifyContent: "space-between",
              display: "flex",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <div className="deposit">Deposit</div>
            <div className="withdraw">Withdraw</div>
          </div>

          <div className="transactions">
            <div
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: "#5a3600",
                marginRight: 10,
              }}
            >
              Transactions history
            </div>
            {[
              {
                id: 1,
                amount: "$40,000",
                status: "✔️",
                tId: "2504D56A...",
                type: "Credit",
              },
              {
                id: 2,
                amount: "$300,000",
                status: "✔️",
                tId: "2504G5A...",
                type: "Debit",
              },
              {
                id: 3,
                amount: "$106,000",
                status: "✔️",
                tId: "2504D76B...",
                type: "Credit",
              },
              {
                id: 4,
                amount: "$200,000",
                status: "✔️",
                tId: "2504D76B...",
                type: "Credit",
              },
            ].map((item, index) => {
              const isTop = item.id == 1;
              const isBottom = item.id == 4;

              return (
                <>
                  <div
                    key={index}
                    style={{
                      borderTopLeftRadius: isTop ? 15 : 2,
                      borderTopRightRadius: isTop ? 15 : 2,
                      borderBottomLeftRadius: isBottom ? 20 : 2,
                      borderBottomRightRadius: isBottom ? 20 : 2,
                    }}
                    className="tbox"
                  >
                    <div className="status">{item.status}</div>
                    <div className="alert">{item.type}</div>
                    <div className="amount">{item.amount}</div>
                    <div className="tId">{item.tId}</div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="notes">
            <b style={{}}>Bank Web</b>, here every customer is verified and user
            data are protected by the C-SKv architecture, guaranteeing
            <b style={{}}> 24/7</b> security of funds.{"\n"} Transactions are
            done by logged in users promptings.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
