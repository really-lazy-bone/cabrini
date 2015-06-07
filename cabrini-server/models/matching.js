var User = require('../models/User');
var Organization = require('../models/Organization');
var matching = {
	getOrgMatch: function (userID) {
		var matchedOrgnization;


	},
	computeDistances: function (user, organization) {

		//Countries
		var countrySimilarity = user.country == organization.country ? 1 : 0;
		//Languages
		var userLanguages = user.languages;
		var matchingLanguages = [];
		var organizationLanguages = organization.languages;
		for (var i = 0; i < userLanguages.length; i++) {
			if (organizationLanguages.indexOf(userLanguages[i]) > -1) {
				matchingLanguages.push(userLanguages[i]);
			}

		}

		var launguageSimilarity = matchingLanguages.length / userLanguages.length;

		//Languages
		var userImmigrationInterests = user.immigration_interests;
		var matchingImmigratioInterests = [];
		var organizationImmigrationInterests = organization.immigration_interests;
		for (var i = 0; i < userImmigrationInterests.length; i++) {
			if (organizationImmigrationInterests.indexOf(userImmigrationInterests[i]) > -1) {
				matchingImmigratioInterests.push(userImmigrationInterests[i]);
			}

		}

		var immigrationInterestsSimilarity = matchingImmigratioInterests.length / userImmigrationInterests.length;
		
		console.log("user is : ");
		console.log(user);
		console.log("organization is : ");
		console.log(organization);
		console.log("rank is: "+(launguageSimilarity * 0.7 + immigrationInterestsSimilarity * 0.2 + countrySimilarity * 0.1));
		return launguageSimilarity * 0.7 + immigrationInterestsSimilarity * 0.2 + countrySimilarity * 0.1;


	}



};
module.exports = matching;
