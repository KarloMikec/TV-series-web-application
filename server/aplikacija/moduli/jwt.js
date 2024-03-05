const jwt = require("jsonwebtoken");

exports.kreirajToken = function (korisnik, tajniKljucJWT) {
	let token = jwt.sign({ korime: korisnik.korime }, tajniKljucJWT, {
		expiresIn: "15s",
	});
	console.log(token);
	return token;
};

exports.provjeriToken = function (zahtjev, tajniKljucJWT) {
	console.log("Provjera tokena: " + zahtjev.headers.authorization);
	if (zahtjev.headers.authorization != null) {
		console.log(zahtjev.headers.authorization);
		let token = zahtjev.headers.authorization;
		try {
			let podaci = jwt.verify(token, tajniKljucJWT);
			console.log("JWT podaci: " + podaci);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
	return false;
};
