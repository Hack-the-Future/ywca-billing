import Papa from "papaparse"
var data = Papa.parse("sample.csv");

var contact; // name of contact 
var vendor; // name of vendor
var street;
var city;
var state;
var zip;
var phone;  // all numbers of phone number, no dashes
var email;
var dateDay;
var dateMonth; 
var dateYear;   // four-digit year
var numDays;    // could be non-number; ex: "varies"
var hoursPerMonth;  // could be a range?
var dryStorage; // amount of dry storage needed in square feet
var fridges;    // number of fridges
var freezers;   // number of freezers 
var attendees;  // number of attendees
var insurance;  // client's insurance name
var level; // level subscirption that the client has
var offSeasonStart; // month that the off season storage starts 
var offSeasonEnd;   // month that the off season storage ends


console.log(typeof(data));