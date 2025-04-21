import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const topRef = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const [total, setTotal] = useState("1300450");
  const [btc, setBtc] = useState("900000");
  const [eth, setEth] = useState("300000");
  const [sol, setSol] = useState("250000");

  const[prices,setPrices]=useState({BTCUSDT:null,ETHUSDT:null,SOLUSDT:null});

  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<string | null>(null);
  const [solPrice, setSolPrice] = useState<string | null>(null);

  const btcPriceRef = useRef<string | null>(null);
  const ethPriceRef = useRef<string | null>(null);
  const solPriceRef = useRef<string | null>(null);

  useEffect(() => {
    const myWs = new WebSocket("wss://stream.bybitglobal.com/v5/public/spot");

    myWs.onopen = () => {
      myWs.send(
        JSON.stringify({
          op: "subscribe",
          args: [
            "publicTrade.BTCUSDT",
            "publicTrade.ETHUSDT",
            "publicTrade.SOLUSDT",
          ],
        }),
      );
    };

    myWs.onmessage = (info) => {
      const myData = JSON.parse(info.data);

      if (myData.topic?.startsWith("publicTrade") && myData.data.length > 0) {
        const symbol = myData.topic.split(".")[1];
        const price = parseFloat(myData.data[0].p.toString());

        setPrices((prev) => ({ ...prev, [symbol]: price }));

        const liveBtc = symbol == "BTCUSDT" ? price : prices?.BTCUSDT || btcPriceRef.current;
        const liveEth = symbol=="ETHUSDT" ? price : prices?.ETHUSDT || ethPriceRef.current;
        const liveSol = symbol=="SOLUSDT" ? price : prices?.SOLUSDT || solPriceRef.current;

        if (liveBtc && !isNaN(parseFloat(liveBtc))) {
          btcPriceRef.current = liveBtc;
          setBtcPrice(liveBtc);
	  console.log("BTCUSDT price updated using Bybit ws, as",liveBtc)
        }

        if (liveEth && !isNaN(parseFloat(liveEth))) {
          ethPriceRef.current = liveEth;
          setEthPrice(liveEth);
        }

        if (liveSol && !isNaN(parseFloat(liveSol))) {
          solPriceRef.current = liveSol;
          setSolPrice(liveSol);
        }

        const myBtcValue = Number(liveBtc) * 12;
        const myEthValue = Number(liveEth) * 120;
        const mySolValue = Number(liveSol) * 500;
        const totalValue = myBtcValue + myEthValue + mySolValue;

        setTotal(totalValue.toString());

        setBtc(myBtcValue.toString());
        setEth(myEthValue.toString());
        setSol(mySolValue.toString());
      }
    };
    return () => myWs.close();
  }, []);

  const handleAnim1 = () => {
    if (topRef.current && button2Ref.current) {
      const top = topRef.current;
      const button2 = button2Ref.current;
      top.classList.remove("animClass");
      void top.offsetWidth;
      top.classList.add("animClass");
      setTimeout(() => {
        top.classList.remove("animClass2");
        button2.classList.toggle("button2-show");
      }, 4000);
    }
  };

  const handleAnim2 = () => {
    if (topRef.current && button2Ref.current) {
      const top = topRef.current;
      const button2 = button2Ref.current;
      button2.style.backgroundColor = "#ef9800";
      top.classList.remove("animClass2");

      top.classList.add("animClass2");
      setTimeout(() => {
        top.classList.remove("animClass");
      }, 4000);
      setTimeout(() => {
        button2.classList.toggle("button2-show");
      }, 100);
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">Bank Web</div>
        <div className="outer">
          <div className="perspective">
            <div
              className="button2"
              ref={button2Ref}
              onClick={() => {
                handleAnim2();
              }}
            >
              See bank
            </div>
            <div className="top" ref={topRef}>
              <div className="button1" onClick={() => handleAnim1()}>
                See coins
              </div>
              <div className="crypto-face">
                <div className="total">
                  {Number(total).toLocaleString("en-us")} USD
                </div>
                <div className="wallet">Crypto wallet</div>
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
                      <b style={{ fontWeight: "normal", fontSize: 10 }}>12 </b>
                      BTC
                    </div>
                    <div className="price">
                      ~ {Number(btc).toLocaleString("en-us")}
                      <b style={{ fontSize: 10 }}> USDT</b>
                    </div>
                  </div>

                  <div className="coin">
                    <div style={{ backgroundColor: "white" }} className="logo">
                      <img src="https://i.postimg.cc/PqqWcF0y/Ethereum-logo.png" />
                    </div>
                    <div className="coin-name">
                      <b style={{ fontWeight: "normal", fontSize: 10 }}>120 </b>
                      ETH
                    </div>
                    <div className="price">
                      ~ {Number(eth).toLocaleString("en-us")}
                      <b style={{ fontSize: 10 }}> USDT</b>
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
                      <b style={{ fontWeight: "normal", fontSize: 10 }}>500 </b>
                      SOL
                    </div>
                    <div className="price">
                      ~ {Number(sol).toLocaleString("en-us")}
                      <b style={{ fontSize: 10 }}> USDT</b>
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
              <div>
                {btcPrice == null
                  ? "Loading..."
                  : Number(btcPrice).toLocaleString("en-us")}
              </div>
            </div>
            <div className="ticker1">
              <div>ETH</div>
              <div>
                {ethPrice == null
                  ? "Loading..."
                  : Number(ethPrice).toLocaleString("en-us")}
              </div>
            </div>
            <div className="ticker1">
              <div>SOL</div>
              <div>
                {solPrice == null
                  ? "Loading..."
                  : Number(solPrice).toLocaleString("en-us")}
              </div>
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
                color: "#291900",
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
