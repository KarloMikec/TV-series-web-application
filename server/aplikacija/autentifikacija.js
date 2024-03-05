const kodovi = require("./moduli/kodovi.js");
const mail = require("./moduli/mail.js");
//const portRest = 12126;
const portRest = 12000;
class Autentifikacija {
	async dodajKorisnika(korisnik) {
		let tijelo = {
			ime: korisnik.ime,
			prezime: korisnik.prezime,
			lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
			email: korisnik.email,
			korime: korisnik.korime,
			grad: korisnik.grad,
			drzava: korisnik.drzava,
			datum_rodjenja: korisnik.datum_rodjenja,
		};

		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			"http://localhost:" + portRest + "/baza/korisnici",
			parametri
		);

		if (odgovor.status == 201) {
			/* try {
				await mail.posaljiMail(
					"kmikec20@foi.hr",
					korisnik.email,
					"Ovo su vaši podaci za prijavu:",
					`Vaši podaci za prijavu: korisničko ime: ${korisnik.korime} i lozinka: ${korisnik.lozinka} `
				);
			} catch {
				console.log("Greška kod slanja maila");
			} */
			console.log("Korisnik ubačen na servisu");
			return true;
		} else {
			console.log(odgovor.status);
			console.log(await odgovor.text());
			return false;
		}
	}

	async prijaviKorisnika(korime, lozinka) {
		lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
		let tijelo = {
			lozinka: lozinka,
		};
		console.log(lozinka);
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			"http://localhost:12000" + "/baza/korisnici/" + korime + "/prijava",
			parametri
		);

		if (odgovor.status == 201) {
			return await odgovor.text();
		} else {
			return false;
		}
	}
}

module.exports = Autentifikacija;
