const KorisnikDAO = require("./korisnikDAO.js");
const kodovi = require("../moduli/kodovi.js");

exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		console.log(korisnici);
		odgovor.status(200).send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = async function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	console.log("restKorisnci = " + JSON.stringify(podaci));

	let korisnici = await kdao
		.dajSveEmaileIKorime(podaci)
		.then((korisnici) => korisnici);
	let dodajKorisnika = await provjeraPodataka(korisnici, podaci);
	console.log(dodajKorisnika);
	if (dodajKorisnika) {
		let dodan = await kdao.dodaj(podaci).then((odg) => odg);
		odgovor.status(201);
		odgovor.send(JSON.stringify({ opis: "Izvrseno" }));
	} else {
		odgovor.status(403);
		odgovor.send(JSON.stringify({ opis: "Neuspješno dodan korisnik" }));
	}
};

provjeraPodataka = async function (korisnici, podaci) {
	for (let korisnik of korisnici) {
		if (korisnik.email == podaci.email) {
			return false;
		}
		if (korisnik.korime == podaci.korime) {
			return false;
		}
	}
	if (
		podaci.lozinka ==
		"01c026640a1cedda357ae7abcde756b1bd18e4270a780a87e24e9b4aeb504195"
	) {
		return false;
	}
	return true;
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { greska: "Metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { greska: "Metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		console.log(korisnik);
		odgovor.status(200).send(JSON.stringify(korisnik));
	});
};

exports.getKorisnikPrijava = async function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	let lozinka = kodovi.kreirajSHA256(zahtjev.body.lozinka, "moja sol");
	console.log("Prijava API: " + korime);

	let token = zahtjev.body.token;

	let o = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=6Ld-BEcpAAAAAE0lptf7onCZrGOfB1-kDi2pTOhh&response=${token}`,
		{ method: "POST" }
	);

	let status = JSON.parse(await o.text());


	if (!(status.success && status.score > 0.5)) {
		odgovor.status(400);
		odgovor.send(JSON.stringify({ opis: "Vi ste robot!" }));
		return;
	}

	kdao.daj(korime).then((korisnik) => {
		console.log(korisnik);
		console.log(zahtjev.body);
		if (korisnik != null && korisnik.lozinka == lozinka)
			odgovor.status(201).send(JSON.stringify(korisnik));
		else {
			odgovor.status(401);
			odgovor.send(JSON.stringify({ greska: "Zabranjen pristup" }));
		}
	});
};
exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "Zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.obrisi(korime).then((korisnik) => {
		console.log(korisnik);
		odgovor.status(201).send(JSON.stringify(korisnik));
	});
};

exports.putKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let podaci = zahtjev.body;
	let lozinka = kodovi.kreirajSHA256(zahtjev.body.lozinka, "moja sol");
	podaci.lozinka = lozinka;
	console.log("korime");
	console.log(korime);
	console.log("podaci");
	console.log(podaci);
	let kdao = new KorisnikDAO();

	kdao
		.azuriraj(korime, podaci)
		.then((poruka) => {
			if (
				zahtjev.session.korisnik &&
				zahtjev.session.korisnik.korime === korime
			) {
				zahtjev.session.korisnik = { ...zahtjev.session.korisnik, ...podaci };
				odgovor.status(201);
				odgovor.send(JSON.stringify({ opis: "Korisnik je ažuriran" }));
			} else {
				console.log(
					"Korisnik nije prijavljen ili se korisničko ime ne podudara."
				);
			}
			odgovor.send(JSON.stringify(poruka));
		})
		.catch((greska) => {
			console.error("Došlo je do greške tijekom ažuriranja korisnika:", greska);
			odgovor
				.status(500)
				.send(JSON.stringify({ greska: "Došlo je do greške pri ažuriranju." }));
		});
};
