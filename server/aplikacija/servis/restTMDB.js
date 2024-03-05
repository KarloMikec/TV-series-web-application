const TMDBklijent = require("./klijentTMDB.js");

class RestTMDB {
	constructor(api_kljuc) {
		this.tmdbKlijent = new TMDBklijent(api_kljuc);
		console.log(api_kljuc);
	}

	getZanr(zahtjev, odgovor) {
		console.log(this);
		this.tmdbKlijent
			.dohvatiZanrove()
			.then((zanrovi) => {
				odgovor.type("application/json");
				odgovor.send(zanrovi);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}

	getSerije(zahtjev, odgovor) {
		console.log(this);
		odgovor.type("application/json");
		let stranica = zahtjev.query.stranica;
		let trazi = zahtjev.query.trazi;

		if (stranica == null || trazi == null) {
			odgovor.status("417");
			odgovor.send({ greska: "Neocekivani podaci" });
			return;
		}

		this.tmdbKlijent
			.pretraziSerijePoNazivu(trazi, stranica)
			.then((serije) => {
				odgovor.send(serije);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}

	getSerija(zahtjev, odgovor) {
		odgovor.type("application/json");
		let idSerije = zahtjev.query.idSerije;
		if (idSerije == null) {
			odgovor.status("417");
			odgovor.send({ greska: "Neocekivani podaci" });
			return;
		}

		this.tmdbKlijent
			.dohvatiSeriju(idSerije)
			.then((serije) => {
				odgovor.send(serije);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}
}

module.exports = RestTMDB;
