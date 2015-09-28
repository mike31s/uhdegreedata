/* globals _, uhdata */
/* exported testdata, maxDegrees, percentageHawaiian, listCampusDegrees, listCampuses, doctoralDegreePrograms */


/**
 * Analytics for UH data sets
 * A small set of records from UH data set
 * @type {string}
 */
var testdata = uhdata.slice(0, 2).concat(_.find(uhdata, isHawaiian));

/**
 *REDUCTION FUNCTION FOR ACCUMULATING DEGREES
 * @param memo The accumulator
 * @param record The UH data record
 * @returns the total of the  accumulator
 */
function addDegrees(memo, record) {
  return memo + record["AWARDS"];   //memo is whats geting added to
}

/**
 * Returns the total number of degrees
 * @param data The UH data set
 * @returns {*} The total number of degrees
 */
function totalDegrees(data) {
  return _.reduce(data, addDegrees, 0);
}
/**
 * Predicate function.  Returns true if the lassed record is of Hawaiian
 * @param record The UH data record
 * @returns {boolean}True if of Hawaiian
 */
function isHawaiian(record) {
  return record ["HAWAIIAN_LEGACY"] === "HAWAIIAN";
}

function hawaiianLegacy(data) {
  return _.filter(data, isHawaiian);
}

function totalHawaiianLegacy(data) {
  return _.reduce(hawaiianLegacy(data), addDegrees, 0);
}

function percentageHawaiian(data) {
  return (totalHawaiianLegacy(data) / totalDegrees(data)) * 100;
}

function makeYearFilter(year) {
  return function (record) {
    return record["FISCAL_YEAR"] === year;
  };
}
function dataForYear(data, year) {
  return _.filter(data, makeYearFilter(year));
}

function totalDegreesByYear(data, year) {
  return _.reduce(dataForYear(data, year), addDegrees, 0);
}
console.log(totalDegreesByYear(uhdata, 2014));

//listCampuses(data). This function can be passed uhdata and returns an array containing all the campuses referenced in the passed dataset.
//pluck the campus value into an array
//remove duplicates using uniq

function listCampuses(data) {
  return _.unique(_.pluck(data, "CAMPUS"));
}

//console.log(listCampuses(uhdata));

//listCampusDegrees(data) returns object. property keys are campuses and values are number of degrees awarded 
//group all records by campus  keys are campus, keys are aray
//reduce array of records to total number of degrees

function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}

function listCampusDegrees(data) {
  return _.mapObject(groupByCampus(data),
      function (val) {
        return _.reduce(val, addDegrees, 0);
      });
}

//maxDegrees(data)
//group all record by year
//reduce to get object with years as key and number degrees 
// get the max

function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}

function maxDegrees(data) {
  return _.max(_.mapObject(groupByYear(data),
      function (val) {
        return _.reduce(val, addDegrees, 0);
      }));
}

//doctoralDegreePrograms returns list of degree programs for which doctoral degree is provided
//filter by records with doctoral degreeOUTCOME === "doctoral degrees"
//pluck CIP_DESC
//remove dups

//predicate for doctoralList
function isDoctoralDegree(record) {
  return record["OUTCOME"] === "Doctoral Degrees";
}

function doctoralList(data) {
  return _.filter(data, isDoctoralDegree);
}
function doctoralDegreePrograms(data) {
  return _.uniqe(_.pluck(doctoralList(data, "CIP_DESC")));
}
