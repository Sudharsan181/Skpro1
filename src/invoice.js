import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './internal.css';

const InvoiceForm = () => {
const today = new Date();
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1 , 0);
lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1);

const [invoiceNumber, setInvoiceNumber] = useState(localStorage.getItem('invoiceNumber') || '00000');
const [customerName, setCustomerName] = useState('');
const [invoiceDate, setInvoiceDate] = useState(today.toISOString().substr(0, 10)); // set to current date
const [dueDate, setDueDate] = useState(lastDayOfMonth.toISOString().substr(0, 10)); // set to last date of month
const [total, setTotal] = useState(0);
const [items, setItems] = useState([{ name: '', quantity: '', price: '' }]);

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', price: '' }]);
  };
  
  const clearFields = () => {
    setItems([{ name: '', quantity: '', price: '' }]);
    setCustomerName('');
    setTotal(0);
  }

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    setTotal(
      updatedItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  const generatePDF = () => {
    // create a new PDF instance
    const doc = new jsPDF();

    // Set the border color
    doc.setDrawColor(0,0,255); // blue

    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 255); // blue
    doc.line(10, 45, 200, 45); // draw a line at y=45
    
    // set the line width for drawing borders
    doc.setLineWidth(0.5);

    // draw a border around the entire PDF
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S', '#00FF00');


    // add the form data to the PDF
    doc.text(`Invoice Number: ${invoiceNumber}`, 10, 10);
    doc.text(`Customer Name: ${customerName}`, 10, 20);
    doc.text(`Invoice Date: ${invoiceDate}`, 10, 30);
    doc.text(`Due Date: ${dueDate}`, 10, 40);

    // add the table to the PDF
    const tableData = items.map((item) => [
      item.name,
      item.quantity,
      item.price,
      item.quantity * item.price,
    ]);
    tableData.push(['', '', 'Total:', total]);
    doc.autoTable({
      head: [['Name', 'Quantity', 'Price', 'Subtotal']],
      body: tableData,
      startY: 50,
      styles: {
      lineWidth: 0.1,
      lineColor: 'Skyblue',
      },
    });

    // download the PDF
    doc.save('Invoice.pdf');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };

  useEffect(() => {
    // save the invoice number to local storage
    localStorage.setItem('invoiceNumber', invoiceNumber);
  }, [invoiceNumber]);

  const handlePrint = (e) => {
    const newInvoiceNumber = (parseInt(invoiceNumber, 10)+ 1).toString().padStart(5, '0');
    setInvoiceNumber(newInvoiceNumber);
    e.preventDefault();
    generatePDF();
    // print the invoice
  }

  return (
    <div className="invoice-form">
      <form onSubmit={handlePrint}>
        <label>
          Invoice Number:
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} onKeyDown={handleKeyDown} />
        </label>
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} onKeyDown={handleKeyDown} />
        </label>
        <label>
          Invoice Date:
          <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} onKeyDown={handleKeyDown} />
        </label>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} onKeyDown={handleKeyDown} />
        </label>
        <h2>Invoice</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                    onKeyDown={handleKeyPress}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                    onKeyDown={handleKeyPress}
                  />
                </td>
                <td>{item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total:</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
        <button type="button" onClick={clearFields}>
          Clear
        </button>
        <button type="submit" className="inv-submit">
          Print
        </button>
      </form>
    </div>
  );  
};

export default InvoiceForm;
