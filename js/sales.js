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

var getColumnSum = function(i) {
  return firstAndPike.cookiesPurchasedEachHour[i] + seaTacAirport.cookiesPurchasedEachHour[i] + seattleCenter.cookiesPurchasedEachHour[i] + capitolHill.cookiesPurchasedEachHour[i] + alki.cookiesPurchasedEachHour[i];
};

var generateTable = function () {
  var parentElement = document.getElementById('stores');
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
  table.appendChild(firstAndPike.render());
  table.appendChild(seaTacAirport.render());
  table.appendChild(seattleCenter.render());
  table.appendChild(capitolHill.render());
  table.appendChild(alki.render());
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
