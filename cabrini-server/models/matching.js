var matching = {
	/*Simple Implementation of Jaccard Index: http://people.revoledu.com/kardi/tutorial/Similarity/Jaccard.html
	  This returns a numeric distance between a user and an organization based on countries, languages, and immigration interests.
	  
	  return value is percentage like 0.98 and so on, 1 is maximum
	  
	  Weighted percentages:
	  ----------------------
	  Languages: 70%;
	  immigration interest: 20%;
	  countries: 10%;
	  
	  
	*/
	computeDistances: function (user, organization) {
		
		//Countries
		var userCountries = user.countries;
		var matchingCountries = [];
		var oragnizationCountries = organization.countries;
		for (var i = 0; i < userCountries.length; i++) {
			if (oragnizationCountries.indexOf(userCountries[i]) > -1) {
				matchingCountries.push(userCountries[i]);
			}

		}
		//1 is maximum. an example value will be 0.98
		var countrySimilarity = matchingCountries.length/userCountries.length;

		//Languages
		var userLanguages = user.languages;
		var matchingLanguages = [];
		var organizationLanguages = organization.languages;
		for (var i = 0; i < userLanguages.length; i++) {
			if (organizationLanguages.indexOf(userLanguages[i]) > -1) {
				matchingLanguages.push(userLanguages[i]);
			}

		}

		var launguageSimilarity = matchingLanguages.length/userLanguages.length;

		//Languages
		var userImmigrationInterests = user.immigration_interests;
		var matchingImmigratioInterests = [];
		var organizationImmigrationInterests = organization.immigration_interests;
		for (var i = 0; i < userImmigrationInterests.length; i++) {
			if (organizationImmigrationInterests.indexOf(userImmigrationInterests[i]) > -1) {
				matchingImmigratioInterests.push(userImmigrationInterests[i]);
			}

		}

		var immigrationInterestsSimilarity = matchingImmigratioInterests.length/userImmigrationInterests.length;

		return launguageSimilarity * 0.7 + immigrationInterestsSimilarity * 0.2 + countrySimilarity * 0.1;
		


	}



};
module.exports = matching;