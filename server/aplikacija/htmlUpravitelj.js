const ds = require("fs/promises");
const Autentifikacija = require("./autentifikacija.js");

class HtmlUpravitelj {
	constructor(tajniKljucJWT) {
		this.tajniKljucJWT = tajniKljucJWT;
		console.log(this.tajniKljucJWT);
		this.auth = new Autentifikacija();
	}

	pocetna = async function (zahtjev, odgovor) {
		let pocetna = await ucitajStranicu("serije_pretrazivanje");
		odgovor.send(pocetna);
	};

	userProfil = async function (zahtjev, odgovor) {
		let userProfil = await ucitajStranicu("userProfil");
		odgovor.send(userProfil);
	};

	korisnici = async function (zahtjev, odgovor) {
		let korisnici = await ucitajStranicu("Korisnici");
		odgovor.send(korisnici);
	};

	detaljiSerije = async function (zahtjev, odgovor) {
		let detaljiSerije = await ucitajStranicu("detaljiSerije");
		odgovor.send(detaljiSerije);
	};

	dokumentacija = async function (zahtjev, odgovor) {
		let dokumentacija = await ucitajStranicu(
			"../../dokumentacija/dokumentacija"
		);
		odgovor.send(dokumentacija);
	};

	registracija = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		let greska = "";
		if (zahtjev.method == "POST") {
			let uspjeh = await this.auth.dodajKorisnika(zahtjev.body);
			if (uspjeh) {
				odgovor.redirect("/prijava");
				return;
			} else {
				greska = "Dodavanje nije uspjelo provjerite podatke!";
			}
		}

		let stranica = await ucitajStranicu("registracija", greska);
		odgovor.send(stranica);
	};

	odjava = async function (zahtjev, odgovor) {
		zahtjev.session.korisnik = null;
		zahtjev.session.korime = null;
		zahtjev.session.uloga = null;
		odgovor.redirect("/prijava");
	};

	prijava = async function (zahtjev, odgovor) {
		let greska = "";
		if (zahtjev.method == "POST") {
			var korime = zahtjev.body.korime;
			var lozinka = zahtjev.body.lozinka;
			var korisnik = await this.auth.prijaviKorisnika(korime, lozinka);
			console.log(korisnik);
			console.log(korime + lozinka);
			if (korisnik) {
				korisnik = JSON.parse(korisnik);
				zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
				zahtjev.session.korime = korime;
				zahtjev.session.uloga = korisnik.vrsta_korisnika_id;
				zahtjev.session.korisnik = korisnik;
				console.log(zahtjev.session);
				odgovor.redirect("/");
				return;
			} else {
				greska = "Netocni podaci!";
			}
		}

		let stranica = await ucitajStranicu("prijava", greska);
		odgovor.send(stranica);
	};

	serijePretrazivanje = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("serije_pretrazivanje");
		odgovor.send(stranica);
	};
}

module.exports = HtmlUpravitelj;

async function ucitajStranicu(nazivStranice, poruka = "") {
	let stranice = [ucitajHTML(nazivStranice), ucitajHTML("navigacija")];
	let [stranica, nav] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	stranica = stranica.replace("#poruka#", poruka);
	return stranica;
}

function ucitajHTML(htmlStranica) {
	return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}
