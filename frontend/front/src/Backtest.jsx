import React, { useState, useEffect } from "react";
import "./Backtest.css"; 

function Backtest() {
  const [message, setmessage] = useState([{
    ohlc:[],
    strategy:[],
    trades:[]
  }]);
  const [sym, setsymbol] = useState("");
  const [symbollist, setlist] = useState([]);
  const [stra, setstra] = useState("");
  const [investement, setinve] = useState("");
  const [loading, setLoading] = useState(false);

  const STRATEGIES = ["Mean Reversion", "Arima", "Sarima", "Moving Average Crossover", "Bollinger Band"];

  useEffect(() => {
    getsymbol();
  }, []);

  const getdata = async () => {
    if (!sym || !stra || !investement) {
        alert("Please fill all fields");
        return;
    }
    setLoading(true);
    const res = await fetch("http://localhost:8000/bbband", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({investement:parseFloat(investement),sym: sym,stra: stra}),
    });
    const data = await res.json();
    setmessage({ohlc:data.ohlc,
      strategy:data.bb,
      trades:data.trades}

    );
  };

  const getsymbol = async () => {
    try {
      const res = await fetch("http://localhost:8000/hydroname");
      const data = await res.json();
      setlist(data);
    } catch (err) {
      console.log("failed to fetch symbols");
    }
  };

  return (
    <div className="quant-container">
      
      <aside className="sidebar">
        <div className="logo">QUANT<span>LAB</span></div>
        
        <div className="input-group">
          <label>Stock Symbol</label>
          <select value={sym} onChange={(e) => setsymbol(e.target.value)}>
            <option value="">Select a Stock</option>
            {symbollist.map((item, index) => (
              <option key={index} value={item.Symbol}>{item.Symbol}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Strategy</label>
          <select value={stra} onChange={(e) => setstra(e.target.value)}>
            <option value="">Select Strategy</option>
            {STRATEGIES.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Investment Capital</label>
          <input
            type="number"
            placeholder="e.g. 10000"
            value={investement}
            onChange={(e) => setinve(e.target.value)}
          />
        </div>

        <button className="run-button" onClick={getdata}>
          Run Backtest
        </button>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h2>Backtest Results {sym && `— ${sym}`}</h2>
        </header>
        
        <div className="results-display">
          {message.length === 0 ? (
            <div className="placeholder">Configure parameters and run to see results.</div>
          ) : (
            <pre>{JSON.stringify(message, null, 2)}</pre>
          )}
        </div>
      </main>
    </div>
  );
}

export default Backtest;