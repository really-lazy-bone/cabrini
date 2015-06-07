var User = require('../models/User');
var Organization = require('../models/Organization');
var matching = {
	getOrgMatch: function (userID) {
		var matchedOrgnization;
		return User.findOne({
			_id: userID
		}, function (err, existingUser) {
				if (existingUser) {
					//User already has match
					if (existingUser.org_id) {
						Organization.findOne({
							_id: existingUser.org_id
						}, function (err, existingOrganization) {
								if (existingOrganization) {
									matchedOrgnization = existingOrganization;
									return matchedOrgnization;
								}
							});
					}
					else {
						//Found user, but no match yet. Loop through all orgs, and find best match,
						Organization.find({}, function (err, allOrgs) {
							for (var i = 0; i < allOrgs.length; i++) {
								allOrgs[i].rank = matching.computeDistances(existingUser, allOrgs[i]);
							}
							allOrgs.sort(function (a, b) {
								return a.rank - b.rank;
							});
							matchedOrgnization = allOrgs[allOrgs.length - 1];
							matchedOrgnization.users.push(existingUser);
							existingUser.ord_id = matchedOrgnization._id;
							existingUser.save(function (err) {
								if (err) throw err;
								return matchedOrgnization;
							});

						});

					}


				}

			});
		
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

		return launguageSimilarity * 0.7 + immigrationInterestsSimilarity * 0.2 + countrySimilarity * 0.1;


	}



};
module.exports = matching;