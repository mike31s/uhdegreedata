# Overview

Provides seven functions with analytics to compute data for [UH degrees] (http://philipmjohnson.github.io/ics314f15/morea/coding-standards/experience-standards-compliant-uhdegreedata.html)

# Installation

Provide the following scrpits in HTML files

'''
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/underscore-min.js"></script>
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/uhdata.js"></script>
<script src="uhdatafunctions.js"></script>
'''

#Usage

Here are example calls:

'''
<script>
    console.log("Total Degrees", totalDegrees(uhdata));
    console.log("Percentage Hawaiian", percentageHawaiian(uhdata));
    console.log("Total Degrees By Year", totalDegreesByYear(uhdata, 2012));
    console.log("List Campuses", listCampuses(uhdata));
    console.log("List Campus Degrees", listCampusDegrees(uhdata));
    console.log("Max Degrees", maxDegrees(uhdata));
    console.log("Doctoral Degree Programs", doctoralDegreePrograms(uhdata));
</script>
'''

Consult uhdatafunctions.js file for more details

#Credits

Uses the [Underscore] (http://underscorejs.org/) library