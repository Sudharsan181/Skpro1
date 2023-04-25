import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import EmployeeIDCard from "./EmpID";
import "./internal.css";

const Menu = () => {
  const [showEmployeeID, setShowEmployeeID] = useState(false);
  const [showIncomeDetails, setShowIncomeDetails] = useState(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);
  const [drilldown3Visible, setDrilldown3Visible] = useState(false);
  const [drilldown5Visible, setDrilldown5Visible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  
    function handleImageChange(event) {
      const file = event.target.files[0];
      setSelectedImage(file);
    }
  
    function handleEmployeeDetailsSubmit(event) {
      event.preventDefault();
    
      const doc = new jsPDF();
      const cardWidth = 100;
      const cardHeight = 130;
      const cardMargin = 10;
      const cardX = (doc.internal.pageSize.getWidth() - cardWidth) / 2;
      const cardY = (doc.internal.pageSize.getHeight() - cardHeight) / 2;
    
      // Set draw color and line width for interactive borders
      doc.setDrawColor(255, 0, 0);
      doc.setLineWidth(0.5);
    
      // Add interactive borders around the edges of the PDF paper
      const borderOffset = 5;
      doc.rect(borderOffset, borderOffset, doc.internal.pageSize.getWidth() - (borderOffset * 2), doc.internal.pageSize.getHeight() - (borderOffset * 2), "S");
    
      // Reset draw color and line width for text and images
      doc.setDrawColor(0);
      doc.setLineWidth(0);
    
      doc.rect(cardX, cardY, cardWidth, cardHeight, "S");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
    
      doc.text("Employee ID Details", cardX + cardMargin, cardY + cardMargin + 10);
      doc.text(`Name: ${document.getElementById("name").value}`, cardX + cardMargin, cardY + cardMargin + 30);
      doc.text(`Date of Join: ${document.getElementById("dateofjoin").value}`, cardX + cardMargin, cardY + cardMargin + 40);
      doc.text(`Salary: ${document.getElementById("salary").value}`, cardX + cardMargin, cardY + cardMargin + 50);
      doc.text(`Designation: ${document.getElementById("Designation").value}`, cardX + cardMargin, cardY + cardMargin + 60);
    
      if (selectedImage) {
        const image = new Image();
        image.onload = function() {
          const imageWidth = 50;
          const imageHeight = (imageWidth * this.height) / this.width;
          doc.addImage(this, "auto", cardX + cardMargin, cardY + cardMargin + 70, imageWidth, imageHeight);
          doc.save("employee_id_details.pdf");
        };
        image.src = URL.createObjectURL(selectedImage);
      } else {
        doc.save("employee_id_details.pdf");
      }
    }
  const handleEmployeeIDClick = () => {
    setShowEmployeeID(!showEmployeeID);
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
  const toggleDrilldown5 = () => {
    setDrilldown5Visible(!drilldown5Visible);
  };
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
            <a href="#"onClick={handleEmployeeIDClick}>
              Employees ID
            </a>
            <a href="#" onClick={handleIncomeDetailsClick}>Income Details</a>
            <a href="#" onClick={handleExpenseDetailsClick}>Expenses Details</a>
            <a  href="#" onClick={toggleDrilldown3}>Records&Details</a>
            <a  href="#" onClick={toggleDrilldown5}>ID Genrate</a>
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
      {showEmployeeID && (
       <div className="employee-details-container">
       <div className="employee-details-title">Employee ID</div>
       <form className="employee-details-form">
         <label htmlFor="name">Name</label>
         <input type="text" id="name" name="name" placeholder="Employee Name" required />
         <label htmlFor="dateofjoin">Date of Join</label>
         <input type="date" id="dateofjoin" name="dateofjoin" required />
         <label htmlFor="salary">Salary</label>
         <input type="text" id="salary" name="salary" placeholder="Salary" required />
         <label htmlFor="Designation">Designation</label>
         <input type="text" id="Designation" name="Designation" placeholder="Designation" required />
         <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
         {selectedImage && (
           <div className="image-preview-container">
              <img className="image-preview" src={URL.createObjectURL(selectedImage)} alt="Selected" />
           </div>
         )}
         <div className="employee-details-actions">
           <button type="submit" onClick={handleEmployeeDetailsSubmit}>
             Get
           </button>
           <button type="button" onClick={handleEmployeeIDClick}>
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
      {drilldown5Visible && (
        <div className="drilldown5">
          <Menu />
          <div className="Employee-data">
            <div>
              <EmployeeIDCard />
            </div>
          <button className="back-arrow" onClick={() => setDrilldown3Visible(false)}>
            close
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Menu;