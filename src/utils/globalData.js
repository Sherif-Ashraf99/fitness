const NAMES = {
	services: {
		null: '',
		undefined: '',
		7: 'local',
		8: 'international',
		9: 'africa',
		10: 'othersports',
		14: 'meloukelkora',
		15: 'fitness',
	},
	sports: {
		1: '',
		undefined: '',
		2: 'tennis',
		3: 'basketball',
		4: 'hockey',
		5: 'volleyball',
		6: 'handball',
		7: 'squash',
		8: 'swimming',
	},
	sections: {
		4: 'fl3aglaelsalama',
		10: 'roadtochampionship',
		7: 'fun2fit',
		9: 'adelsaad',
		8: 'africastories',
	},
	portals: {
		1: 'new_et',
		3: 'twist',
	},
};

const IDS = {
	SERVICES: {
		PUBLIC: null,
		LOCAL: 7,
		INTERNATIONAL: 8,
		AFRICA: 9,
		OTHERSPORTS: 10,
		MELOUKELKORA: 14,
		FITNESS: 15,
	},
	SPORTS: {
		FOOTBALL: 1,
		TENNIS: 2,
		BASKETBALL: 3,
		HOCKEY: 4,
		VOLLEYBALL: 5,
		HANDBALL: 6,
		SQUASH: 7,
		SWIMMING: 8,
	},
	SECTIONS: {
		FL3AGLAELSALAMA: 4,
		ROADTOCHAMPIONSHIP: 10,
		FUN2FIT: 7,
		ADELSAAD: 9,
		AFRICASTORIES: 8,
	},
	PORTALS: {
		NEW_ET: 1,
		TWIST: 3,
	},
};

const services = [
	'local',
	'international',
	'africa',
	'othersports',
	'meloukelkora',
	'fitness',
];
const otherSports = ['tennis', 'handball', 'squash', 'basketball'];

const appsBaseUrls = {
	Twist: import.meta.env.VITE_APP_MEDIA_URL,
	Fitness: import.meta.env.VITE_APP_MEDIA_URL, // i don't have it yet
	Melouk: import.meta.env.VITE_APP_MELOUK_MEDIA_URL,
};

const isStaticAds = false;

const sportsSupportedByTwist2024 = {
	1: 'football',
	2: 'tennis',
	3: 'basketball',
	6: 'handball',
}

const olympicsEndDate = new Date("2024-08-12 00:00");
const currentTime = new Date();
const isEventEnded  = currentTime > olympicsEndDate;





export { NAMES, IDS, services, otherSports, appsBaseUrls, isStaticAds , sportsSupportedByTwist2024 , isEventEnded };
