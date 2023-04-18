import React, { useState, useEffect } from "react";
import "./internal.css";
import Bill from "./invoice";

const Menu = () => {
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showIncomeDetails, setShowIncomeDetails] = useState(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);
  const [drilldown3Visible, setDrilldown3Visible] = useState(false);
  const [drilldown4Visible, setDrilldown4Visible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  
    function handleImageChange(event) {
      const file = event.target.files[0];
      setSelectedImage(file);
    }
  
    function handleEmployeeDetailsSubmit(event) {
      event.preventDefault();
      // Here you can access the selected image using the `selectedImage` state variable
      console.log(selectedImage);
    }

  const handleEmployeeDetailsClick = () => {
    setShowEmployeeDetails(!showEmployeeDetails);
  }
  const handleIncomeDetailsClick = () => {
    setShowIncomeDetails(!showIncomeDetails);
  };
  const handleExpenseDetailsClick = () => {
    setShowExpenseDetails(!showExpenseDetails);
  };
  const toggleDrilldown3 = () => {
    setDrilldown3Visible(!drilldown3Visible);
  };
  const toggleDrilldown4 = () => {
    setDrilldown4Visible(!drilldown4Visible)
  }
  return (
    <div className="menu">
      <div className="menu-logo">SK Farms & Stockers</div>
      <nav className="menu-nav">
        <div className="menu-nav-item">
          <a href="#">Home</a>
        </div>
        <div className="menu-nav-item">
          <a href="#">Data</a>
          <div className="menu-nav-dropdown">
            <a href="#"onClick={handleEmployeeDetailsClick}>
              Employee Details
            </a>
            <a href="#" onClick={handleIncomeDetailsClick}>Income Details</a>
            <a href="#" onClick={handleExpenseDetailsClick}>Expenses Details</a>
            <a  href="#" onClick={toggleDrilldown3}>Records&Details</a>
            <a href="#" onClick={toggleDrilldown4}>Invoice</a>
          </div>
        </div>
        <div className="menu-nav-item">
          <a href="#">Services</a>
          <div className="menu-nav-dropdown">
            <a href="#">Farming</a>
            <a href="#">Stockers</a>
            <a href="#">Exports</a>
          </div>
        </div>
        <div className="menu-nav-item">
          <a href="https://Sudharsan181.github.io/portfolio">Contact</a> 
        </div>
      </nav>
      <div className="menu-search">
        <input type="text" placeholder="Search" />
        <button>Go</button>
      </div>
      {showEmployeeDetails && (
       <div className="employee-details-container">
       <div className="employee-details-title">Employee Details</div>
       <form className="employee-details-form">
         <label htmlFor="name">Name</label>
         <input type="text" id="name" name="name" placeholder="Employee Name" required />
         <label htmlFor="date-of-join">Date of Join</label>
         <input type="date" id="dateofjoin" name="dateofjoin" required />
         <label htmlFor="salary">Salary</label>
         <input type="text" id="salary" name="salary" placeholder="Salary" required />
         <label htmlFor="appeared">Appeared</label>
         <input type="text" id="appeared" name="appeared" placeholder="Days Appeared" required />
         <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
         {selectedImage && (
           <div className="image-preview-container">
              <img className="image-preview" src={URL.createObjectURL(selectedImage)} alt="Selected" />
           </div>
         )}
         <div className="employee-details-actions">
           <button type="submit" onClick={handleEmployeeDetailsSubmit}>
             Save
           </button>
           <button type="button" onClick={handleEmployeeDetailsClick}>
             Cancel
           </button>
         </div>
       </form>
     </div>
          )}
       {showIncomeDetails && (
        <div className="employee-details-container">
          <div className="employee-details-title">Income Details</div>
          <form className="employee-details-form">
            <label htmlFor="name">Income</label>
            <input type="text" id="name" name="name" placeholder="Income" required/>
            <label htmlFor="date-of-join\">Date of Entry</label>
            <input type="date" id="date-of-join" name="date-of-join" required />
            <label htmlFor="salary">Profit Percentage</label>
            <input type="text" id="salary" name="salary" placeholder="Profit Percentage" required/>
            <label htmlFor="appeared">Days In Count</label>
            <input type="text" id="appeared" name="appeared" placeholder="Days In Count" required/>
            <div className="employee-details-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={handleIncomeDetailsClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
       {showExpenseDetails && (
        <div className="employee-details-container">
          <div className="employee-details-title">Expenses Details</div>
          <form className="employee-details-form">
            <label htmlFor="name">Expenses</label>
            <input type="text" id="name" name="name" placeholder="Expenses" required/>
            <label htmlFor="date-of-join">Date of Entry</label>
            <input type="date" id="date-of-join" name="date-of-Entry" required/>
            <label htmlFor="salary">Expenses Percentage</label>
            <input type="text" id="salary" name="salary" placeholder="Expenses Percentage" required/>
            <label htmlFor="appeared">Days In Count</label>
            <input type="text" id="appeared" name="appeared" placeholder="Days In Count" required/>
            <div className="employee-details-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={handleExpenseDetailsClick}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {drilldown3Visible && (
        <div className="drilldown3">
          <Menu />
          <div className="Employee-data">
            <h2>Employee DATA</h2>
         
          <button className="back-arrow" onClick={() => setDrilldown3Visible(false)}>
            close
          </button>
        </div>
        </div>
      )}
      {drilldown4Visible &&(
        <div className="drilldown4">
          <Bill />
          <div>
          <button className="back-arrow" onClick={() => setDrilldown4Visible(false)}>
            close
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;