/* globals _, uhdata */
/* exported testdata, maxDegrees, percentageHawaiian, listCampusDegrees, listCampuses, doctoralDegreePrograms, totalDegreesByYear */

/**
 * Analytics for UH data sets
 * A small set of records from UH data set
 * @type {string}
 */
//var testdata = uhdata.slice(0, 2).concat(_.find(uhdata, isHawaiian));

/**
 *REDUCTION FUNCTION FOR ACCUMULATING DEGREES
 * @param memo The accumulator
 * @param record The UH data record
 * @returns the total of the  accumulator
 */
function addDegrees(memo, record) {
  if(isNaN(record["AWARDS"])){
    throw new Error("non-numeric awards");
  }
  return memo + record["AWARDS"];   //memo is whats geting added to
}
/**
 * returns true if past record has awards field
 * @param record true if has awards fields
 */
function hasAwards(record) {
  return record.hasOwnProperty("AWARDS");
}

/**
 * Returns the total number of degrees
 * @param data The UH data set
 * @returns {*} The total number of degrees
 */
function totalDegrees(data) {
  if (!_.every(data, hasAwards)) {
    throw new Error("No AWARDS field.");
  }
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
/**
 * A function that returns a dataset maching all records that have Hawaiian legacy
 * @param dataThe UH data record
 * @returns {Array.<T>|*} All record with Hawaiian Legacy
 */
function hawaiianLegacy(data) {
  return _.filter(data, isHawaiian);
}
/**
 * Finds the total amount of degrees given to those with Hawaiian Legacy
 * @param data The UH data record
 * @returns {*} the total amount of degrees
 */
function totalHawaiianLegacy(data) {
  return _.reduce(hawaiianLegacy(data), addDegrees, 0);
}
/**
 * Compares how many degrees were given to Hawaiians versus all studdents
 * @param data The UH data record
 * @returns {number} the percentage of degrees given to Hawaiians
 */
function percentageHawaiian(data) {
  return (totalHawaiianLegacy(data) / totalDegrees(data)) * 100;
}
/**
 * Filters records for a specific year
 * @param year The year being examined
 * @returns {Function} true if the record is of that year
 */
function makeYearFilter(year) {
  return function (record) {
    return record["FISCAL_YEAR"] === year;
  };
}
/**
 * Displays all data for a given year
 * @param data The UH data record
 * @param year the year to examine
 * @returns {Array.<T>|*} An object containing the data for a given yyear
 */
function dataForYear(data, year) {
  return _.filter(data, makeYearFilter(year));
}
/**
 * Gives the total amount of degrees given out each year
 * @param data The UH data record
 * @param year the year to examine
 * @returns {*} a value indicating the amount of degrees awareded for the year
 */
function totalDegreesByYear(data, year) {
  return _.reduce(dataForYear(data, year), addDegrees, 0);
}

/**
 * Finds all campuses in the dataset
 * @param data The UH data record
 * @returns {*} a unique array of each campus
 */
function listCampuses(data) {
  return _.unique(_.pluck(data, "CAMPUS"));
}
/**
 * Groups data records by the campus
 * @param data The UH data record
 * @returns {*} an object of records grouped by campus
 */
function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}
/**
 * Provides the sum of degrees awared from each campus
 * @param data The UH data record
 * @returns {*} the sum of each campus's degrees
 */
function listCampusDegrees(data) {
  return _.mapObject(groupByCampus(data),
      function (val) {
        return _.reduce(val, addDegrees, 0);
      });
}

/**
 * groups data by the year awarded
 * @param data The UH data record
 * @returns {*} records grouped by year
 */
function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}
/**
 * Finds the year where the most degrees were awarded
 * @param data The UH data record
 * @returns {number} the year with the most degrees awarded
 */
function maxDegrees(data) {
  return _.max(_.mapObject(groupByYear(data),
      function (val) {
        return _.reduce(val, addDegrees, 0);
      }));
}
/**
 * Predacit function returning true if the degree is part of a doctorate program
 * @param record The UH data record
 * @returns {boolean} returns true if the degree is part of the doctorate program
 */
function isDoctoralDegree(record) {
  return record["OUTCOME"] === "Doctoral Degrees";
}
/**
 * Filters out only programs with doctoral degreess
 * @param dataThe UH data record
 * @returns {Array.<T>|*} returns array of programs with doctoral degrees
 */
function doctoralList(data) {
  return _.filter(data, isDoctoralDegree);
}
/**
 * provides a list of a specific type of doctoral degree
 * @param data The UH data record
 * @returns {*}a list of doctoral degrees
 */
function doctoralDegreePrograms(data) {
  return _.unique(_.pluck(doctoralList(data, "CIP_DESC")));
}
