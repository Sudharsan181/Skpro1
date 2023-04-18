import React, { useState, FaArrowLeft } from 'react';
import './App.css';
import './internal.css';
import Menu from './menu';
import { Chart } from 'chart.js/auto';
import {AreaChart, Area} from 'recharts';
import {
  LineChart,
  ResponsiveContainer,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const data = [
  {name:"A", x:30, y:70},
  {name:"B", x:12, y:88},
  {name:"C", x:15, y:85},
  {name:"D", x:35, y:65},
  {name:"E", x:54, y:46},
  {name:"F", x:72, y:28},
  {name:"G", x:32, y:68}
];
const pdata = [
	{
		name: 'Quality Products',
		Percentage: 11,
		Rate: 120
	},
	{
		name: 'SubQaulity',
		Percentage: 15 ,
		Rate: 105
	},
	{
		name: 'Third quality',
		Percentage: 5,
		Rate: 100
	},
	{
		name: 'Premium',
		Percentage: 10,
		Rate: 356
	},
	{
		name: 'Platinum',
		Percentage: 9,
		Rate: 400
	},
	{
		name: 'Platinum+',
		Percentage: 10,
		Rate: 800
	},
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [drilldownVisible, setDrilldownVisible] = useState(false);
  const [drilldown2Visible, setDrilldown2Visible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Make an API request to Alpha Vantage to retrieve stock exchange data
const apiKey = 'KQL3AZIGKUUD3O26';
const symbol = 'AAPL';
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract the stock exchange data from the API response
    const timeSeriesData = data['Time Series (5min)'];
    const labels = Object.keys(timeSeriesData).reverse();
    const values = Object.values(timeSeriesData).map(item => parseFloat(item['4. close'])).reverse();

    // Display the stock exchange data in a graph using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: symbol,
          data: values,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  });
//fetch data from Alpha Vantage API
fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=KQL3AZIGKUUD3O26')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#av-table tbody');
    //parse data and populate the table
    for (const [date, values] of Object.entries(data['Time Series (Daily)'])) {
      const row = tableBody.insertRow();
      row.insertCell().textContent = date;
      row.insertCell().textContent = values['1. open'];
      row.insertCell().textContent = values['2. high'];
      row.insertCell().textContent = values['3. low'];
      row.insertCell().textContent = values['4. close'];
      row.insertCell().textContent = values['6. volume'];
    }
  })
  .catch(error => console.error(error));


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleDrilldown = () => {
    setDrilldownVisible(!drilldownVisible);
  };
  const toggleDrilldown2 = () => {
    setShowPopup(false); // close the login popup
    setDrilldown2Visible(!drilldown2Visible); // open drilldown2
  };
  const handleLogin = (e) => {
    e.preventDefault(); // prevent form submission
  
    // check if the username and password are correct
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    if (username === 'Sudharsan K' && password === 'sudhan123') {
      setIsLoggedIn(true); // set the login status to true
      toggleDrilldown2(); // open the second drilldown
    } else {
      alert('Incorrect username or password.'); // display an error message.
    }
  };  
  

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="https://sudharssan181.github.io/portfolio/">Home</a>
          </li>
          <li>
            <a href="#">About</a>
            <ul>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Services</a>
            <ul>
              <li>
              <a href='#'>Warehousing</a>
              </li>
              <li>
                <a href="#">Seeding</a>
              </li>
              <li>
                <a href="#">Farms</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://sudharsan181.github.io/">Contact</a>
          </li>
          <li className="login" onClick={togglePopup}>
            <a href="#">Admin</a>
          </li>
        </ul>
      </nav>
      <div className="body">
        <div className="company-name">
          <h4>SK Farms &amp; Stockers</h4>
          <p className="tagline">Quality Live Stock Products</p>
        </div>
        <div>
          <img
            src="http://sk-farm.net/wp-content/uploads/2022/11/logo-01-2.png"
            alt="Not Available"
            className="img"  onClick={toggleDrilldown}
          ></img>
        </div>
        <div className="container">
          <hr></hr>
          <p>
            Agriculture is our wisest pursuit, because it will in the end
            contribute most to real wealth, good morals & happiness.
          </p>
        </div>
      </div>
      {drilldownVisible && (
        <div className="drilldown">
          <button className="close" onClick={toggleDrilldown}>
            &times;
          </button>
          <h2>STCEX DATA</h2>
          {/*  */}
          <canvas id='myChart'></canvas>
          <h2>STCEX Details</h2>
           <table id="av-table">
             <thead>
              <tr>
               <th>Date</th>
               <th>Open</th>
                <th>High</th>
                <th>Low</th>
               <th>Close</th>
                <th>Volume</th>
             </tr>
           </thead>
         <tbody>
       </tbody>
     </table>
   </div>
      )}
      {drilldown2Visible && (
        <div className="drilldown2">
          <Menu />
          <div className='linechart'>
            <h2>IMEX DATA</h2>
          <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={pdata} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="Products"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="Rate"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer></div>
            <div className="chart2">
            < AreaChart width={1100} height={550} data={data}>
        <CartesianGrid/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area dataKey="x" stackId="1" 
            stroke="green" fill="green" />
        <Area dataKey="y" stackId="1" 
            stroke="blue" fill="blue" />
        </AreaChart>
        <button className="back-arrow" onClick={() => setDrilldown2Visible(false)}>
            close
          </button>
            </div>
        </div>      
      )}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close" onClick={togglePopup}>
              &times;
            </button>
            <h2>Admin login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-field">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              {isLoggedIn ? (
                    <button type="submit" className="submit" onClick={toggleDrilldown2}>
                        Admit
                    </button>
                      ) : (
                      <button type="submit" className="submit">
                          Admit
                       </button>
                        )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;