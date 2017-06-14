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

var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);

var seaTacAirport = new Store('SeaTac Airport', 3, 24, 1.2);

var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);

var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);

var alki = new Store('Alki', 2, 16, 4.6);

var generateList = function (store) {

  var parentElement = document.getElementById('stores');

  var h2 = document.createElement('h2');
  h2.textContent = store.name;
  parentElement.appendChild(h2);

  var ul = document.createElement('ul');
  parentElement.appendChild(ul);

  for (var i = 0; i < store.cookiesPurchasedEachHour.length; i++) {
    var li = document.createElement('li');
    var hour = i + 6;
    var time = 'am';
    if(hour > 12) {
      hour = hour - 12;
      time = 'pm';
    }
    li.textContent = hour + time + ': ' + store.cookiesPurchasedEachHour[i] + ' cookies';
    ul.appendChild(li);
  }
};

generateList(firstAndPike);
generateList(seaTacAirport);
generateList(seattleCenter);
generateList(capitolHill);
generateList(alki);
