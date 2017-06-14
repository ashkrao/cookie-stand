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

var firstAndPike = {
  name: '1st and Pike',
  minHourlyCustomer: 23,
  maxHourlyCustomer: 65,
  hourlyCookiesPerCustomer: 6.3,
  cookiesPurchasedEachHour: [],
  generateCustomers: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var seaTacAirport = {
  name: 'SeaTac Airport',
  minHourlyCustomer: 3,
  maxHourlyCustomer: 24,
  hourlyCookiesPerCustomer: 1.2,
  cookiesPurchasedEachHour: [],
  generateCustomers: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var seattleCenter = {
  name: 'Seattle Center',
  minHourlyCustomer: 11,
  maxHourlyCustomer: 38,
  hourlyCookiesPerCustomer: 3.7,
  cookiesPurchasedEachHour: [],
  generateCustomers: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var capitolHill = {
  name: 'Capitol Hill',
  minHourlyCustomer: 20,
  maxHourlyCustomer: 38,
  hourlyCookiesPerCustomer: 2.3,
  cookiesPurchasedEachHour: [],
  generateCustomers: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var alki = {
  name: 'Alki',
  minHourlyCustomer: 2,
  maxHourlyCustomer: 16,
  hourlyCookiesPerCustomer: 4.6,
  cookiesPurchasedEachHour: [],
  generateCustomers: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var generateList = function (store) {
  // Generate cookies for each hour from 6 AM to 8 PM, 15 hours in all
  for(var i = 0; i < 15; i++) {
    store.cookiesPurchasedEachHour[i] = store.generateCustomers(store.minHourlyCustomer, store.maxHourlyCustomer);
  }

  var parentElement = document.getElementById('stores');

  var h2 = document.createElement('h2');
  h2.textContent = store.name;
  parentElement.appendChild(h2);

  var ul = document.createElement('ul');
  parentElement.appendChild(ul);

  for (i = 0; i < store.cookiesPurchasedEachHour.length; i++) {
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
