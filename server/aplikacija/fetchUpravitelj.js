const SerijePretrazivanje = require("./serijePretrazivanje.js");
const jwt = require("./moduli/jwt.js");
const Autentifikacija = require("./autentifikacija.js");

class FetchUpravitelj {
	constructor(tajniKljucJWT) {
		this.auth = new Autentifikacija();
		this.fp = new SerijePretrazivanje();
		this.tajniKljucJWT = tajniKljucJWT;
	}

	getJWT = async function (zahtjev, odgovor) {
		odgovor.type("json");
		console.log(zahtjev.session);
		if (zahtjev.session.korime != null) {
			let k = { korime: zahtjev.session.korime };
			let noviToken = jwt.kreirajToken(k, this.tajniKljucJWT);
			odgovor.send({ ok: noviToken });
			return;
		}
		odgovor.status(401);
		odgovor.send({ greska: "nemam token!" });
	};

	serijePretrazivanje = async function (zahtjev, odgovor) {
		let str = zahtjev.query.str;
		let trazi = zahtjev.query.trazi;
		odgovor.json(await this.fp.dohvatiSerije(str, trazi));
	};

	pretraziSeriju = async function (zahtjev, odgovor) {
		let idSerije = zahtjev.query.idSerije;
		odgovor.json(await this.fp.dohvatiSeriju(idSerije));
	};

	getUloga = async function (zahtjev, odgovor) {
		odgovor.type("json");
		if (zahtjev.session.korime == null) {
			odgovor.status(401);
			odgovor.send({ opis: "Niste prijavljeni!" });
			return;
		}
		odgovor.send({ uloga: zahtjev.session.uloga });
		return;
	};

	getKorisnik = async function (zahtjev, odgovor) {
		odgovor.type("json");
		if (zahtjev.session.korime == null) {
			odgovor.status(401);
			odgovor.send({ opis: "Niste prijavljeni!" });
			return;
		}
		odgovor.send({ korisnik: zahtjev.session.korisnik });
		return;
	};
}
module.exports = FetchUpravitelj;
