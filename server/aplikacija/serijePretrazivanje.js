//const portRest = 12126;
const portRest = 12000;
//const url = "http://spider.foi.hr:" + portRest + "/api";
const url = "http://localhost:12000";
const kodovi = require("./moduli/kodovi.js");
class SerijeZanroviPretrazivanje {
	async dohvatiSerije(stranica, kljucnaRijec = "") {
		let putanja =
			url + "/tmdb/serije?stranica=" + stranica + "&trazi=" + kljucnaRijec;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let serije = JSON.parse(podaci);
		console.log(serije);
		return serije;
	}

	async dohvatiSeriju(idSerije) {
		let putanja = url + "/tmdb/serija?idSerije=" + idSerije;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let serije = JSON.parse(podaci);
		console.log(serije);
		return serije;
	}

	async dohvatiSveZanrove() {
		let odgovor = await fetch(url + "/tmdb/zanr");
		let podaci = await odgovor.text();
		console.log(podaci);
		let zanrovi = JSON.parse(podaci).genres;
		return zanrovi;
	}
}

module.exports = SerijeZanroviPretrazivanje;
