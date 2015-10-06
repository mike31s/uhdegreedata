/*globals _, totalDegrees, uhdata, isHawaiian  */

var testdata = uhdata.slice(0, 2).concat(_.find(uhdata, isHawaiian));

describe("totalDegrees ", function () {

  it("Should compute total degrees", function () {
    expect(totalDegrees(testdata)).toEqual(403);

  });
  var noAwardsField = testdata.concat({foo: "bar"});

  it("Should throw an error when a record doesn't have an awards field", function () {
    expect(function () {
      totalDegrees(noAwardsField);
    }).toThrowError("No AWARDS field.");
  });

  var nonNumericAwards = testdata.concat({"AWARDS": "bar"});

  it("Should throw an error when a record doesn't have an awards field", function () {
    expect(function () {
      totalDegrees(nonNumericAwards);
    }).toThrowError("non-numeric awards");
  });
});
