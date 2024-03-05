const Baza = require("./baza.js");

class KorisnikDAO {
	constructor() {
		this.baza = new Baza("RWA2023kmikec20.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	};

	dajSveEmaileIKorime = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT email, korime FROM korisnik;";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	};

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1) return podaci[0];
		else return null;
	};

	dodaj = async function (korisnik) {
		console.log("dodaj funkcija " + korisnik.datum_rodjenja);
		let sql =
			"INSERT INTO korisnik (ime,prezime,korime,email,lozinka,drzava, grad, datum_rodjenja, vrsta_korisnika_id) VALUES (?,?,?,?,?,?,?,?,?);";
		let podaci = [
			korisnik.ime,
			korisnik.prezime,
			korisnik.korime,
			korisnik.email,
			korisnik.lozinka,
			korisnik.drzava,
			korisnik.grad,
			korisnik.datum_rodjenja,
			1,
		];
		this.baza.spojiSeNaBazu();
		await this.baza.izvrsiUpit(sql, podaci);
		this.baza.zatvoriVezu();
		return true;
	};

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	};

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=?, lozinka=?, drzava=?, grad=?, datum_rodjenja=? WHERE korime=?`;
		let podaci = [
			korisnik.ime,
			korisnik.prezime,
			korisnik.lozinka,
			korisnik.drzava,
			korisnik.grad,
			korisnik.datum_rodjenja,
			korime,
		];
		console.log(sql);
		console.log(podaci);
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};
}

module.exports = KorisnikDAO;
