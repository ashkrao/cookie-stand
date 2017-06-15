'use strict';

// Store constructor
function Store (name, minHourlyCustomer, maxHourlyCustomer, hourlyCookiesPerCustomer) {
  this.name = name;
  this.minHourlyCustomer = minHourlyCustomer;
  this.maxHourlyCustomer = maxHourlyCustomer;
  this.hourlyCookiesPerCustomer = hourlyCookiesPerCustomer;
  this.cookiesPurchasedEachHour = this.generateCustomers();
}

Store.prototype.generateCustomers = function() {
  var cookiesPurchasedEachHour = [];
  for(var i = 0; i < 14; i++) {
    cookiesPurchasedEachHour[i] = Math.floor(Math.random() * (this.maxHourlyCustomer - this.minHourlyCustomer + 1)) + this.minHourlyCustomer;
  }
  return cookiesPurchasedEachHour;
};

Store.prototype.render = function() {
  var row = document.createElement('tr');
  var td = document.createElement('td');
  td.textContent = this.name;
  row.appendChild(td);
  var total = 0;
  for (var i = 0; i < 14; i++) {
    total = total + this.cookiesPurchasedEachHour[i];

    td = document.createElement('td');
    td.textContent = this.cookiesPurchasedEachHour[i];
    row.appendChild(td);
  }

  td = document.createElement('td');
  td.textContent = total;
  row.appendChild(td);

  return row;
};

var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTacAirport = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var storeArray = [firstAndPike, seaTacAirport, seattleCenter, capitolHill, alki];

var addForm = document.getElementById('addStoreForm');
addForm.addEventListener('submit',
  function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var minHourlyCustomer = parseInt(event.target.minHourlyCustomer.value);
    var maxHourlyCustomer = parseInt(event.target.maxHourlyCustomer.value);
    var hourlyCookiesPerCustomer = parseFloat(event.target.hourlyCookiesPerCustomer.value);

    var newStore = new Store(name, minHourlyCustomer, maxHourlyCustomer, hourlyCookiesPerCustomer);
    storeArray.push(newStore);
    generateTable();

    addForm.reset();
  }
);

var getColumnSum = function(i) {
  var colSum = 0;
  for(var j = 0; j < storeArray.length; j++) {
    colSum = colSum + storeArray[j].cookiesPurchasedEachHour[i];
  }
  return colSum;
};

var generateTable = function () {
  var parentElement = document.getElementById('stores');
  parentElement.innerHTML = ''; // reset the table if it was previously generated

  var table = document.createElement('table');
  parentElement.appendChild(table);
  // Add header
  var head = document.createElement('thead');
  var row1 = document.createElement('tr');
  var th = document.createElement('th');
  row1.appendChild(th);
  for (var i = 0; i < 14; i++) {
    var hour = i + 6;
    var time = 'am';
    if(hour > 12) {
      hour = hour - 12;
      time = 'pm';
    }
    th = document.createElement('th');
    th.textContent = hour + ':00' + time;
    row1.appendChild(th);
  }
  th = document.createElement('th');
  th.textContent = 'Daily Location Total';
  row1.appendChild(th);
  head.appendChild(row1);
  table.appendChild(head);

  // Call render for each store
  for(i = 0; i < storeArray.length; i++) {
    table.appendChild(storeArray[i].render());
  }

  // Add footer
  var foot = document.createElement('tfoot');
  var row2 = document.createElement('tr');
  var td = document.createElement('td');
  td.textContent = 'Totals';
  row2.appendChild(td);

  var totalSum = 0;
  for (i = 0; i < 14; i++) {
    td = document.createElement('td');
    var columnSum = getColumnSum(i);
    totalSum = totalSum + columnSum;
    td.textContent = columnSum;
    row2.appendChild(td);
  }
  td = document.createElement('td');
  td.textContent = totalSum;
  row2.appendChild(td);

  foot.appendChild(row2);
  table.appendChild(foot);
};

generateTable();
