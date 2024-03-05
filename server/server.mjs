import express from "express";
import sesija from "express-session";
import kolacici from "cookie-parser";
import Konfiguracija from "./aplikacija/konfiguracija.js";
import restKorisnik from "./aplikacija/servis/restKorisnik.js";
import RestTMDB from "./aplikacija/servis/restTMDB.js";
import HtmlUpravitelj from "./aplikacija/htmlUpravitelj.js";
import FetchUpravitelj from "./aplikacija/fetchUpravitelj.js";
import cors from "cors";
//import portovi from "/var/www/RWA/2023/portovi.js";

//const port = portovi.kmikec20;
const port = 12000;
const server = express();

let konf = new Konfiguracija();
konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		console.log(greska);
		if (process.argv.length == 2) {
			console.error("Niste naveli naziv konfiguracijske datoteke!");
		} else {
			console.error("Datoteka ne postoji: " + greska.path);
		}
	});

function pokreniServer() {
	server.use(express.urlencoded({ extended: true }));
	server.use(express.json());
	server.use(cors());
	server.use(kolacici());
	server.use(
		sesija({
			secret: konf.dajKonf().tajniKljucSesija,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);

	server.use("/js", express.static("./aplikacija/js"));
	server.use("/dokumentacija", express.static("./dokumentacija"));
	server.use("/", express.static("./angular/browser"));
	pripremiPutanjeKorisnik();
	pripremiPutanjeTMDB();
	//pripremiPutanjePocetna();
	pripremiPutanjePretrazivanjeSerija();
	pripremiPutanjeAutentifikacija();

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		odgovor.json({ opis: "nema resursa" });
	});
	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}

function pripremiPutanjeKorisnik() {
	server.get("/baza/korisnici", restKorisnik.getKorisnici);
	server.post("/baza/korisnici", restKorisnik.postKorisnici);
	server.delete("/baza/korisnici", restKorisnik.deleteKorisnici);
	server.put("/baza/korisnici", restKorisnik.putKorisnici);

	server.get("/baza/korisnici/:korime", restKorisnik.getKorisnik);
	server.post("/baza/korisnici/:korime", restKorisnik.postKorisnik);
	server.delete("/baza/korisnici/:korime", restKorisnik.deleteKorisnik);
	server.put("/baza/korisnici/:korime", restKorisnik.putKorisnik);

	server.post(
		"/baza/korisnici/:korime/prijava",
		restKorisnik.getKorisnikPrijava
	);
}

function pripremiPutanjeTMDB() {
	let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
	server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
	server.get("/api/tmdb/serije", restTMDB.getSerije.bind(restTMDB));
	server.get("/api/tmdb/serija", restTMDB.getSerija.bind(restTMDB));
}

function pripremiPutanjePocetna() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
	server.get("/korisnici", htmlUpravitelj.korisnici.bind(htmlUpravitelj));
	server.get("/userProfil", htmlUpravitelj.userProfil.bind(htmlUpravitelj));
	server.get(
		"/detaljiSerije",
		htmlUpravitelj.detaljiSerije.bind(htmlUpravitelj)
	);
	server.get(
		"/dokumentacija",
		htmlUpravitelj.dokumentacija.bind(htmlUpravitelj)
	);
}

function pripremiPutanjePretrazivanjeSerija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get(
		"/serije_pretrazivanje",
		htmlUpravitelj.serijePretrazivanje.bind(htmlUpravitelj)
	);
	server.post(
		"/serijePretrazivanje",
		fetchUpravitelj.serijePretrazivanje.bind(fetchUpravitelj)
	);
	server.post(
		"/pretraziSeriju",
		fetchUpravitelj.pretraziSeriju.bind(fetchUpravitelj)
	);
}

function pripremiPutanjeAutentifikacija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.post(
		"/registracija",
		htmlUpravitelj.registracija.bind(htmlUpravitelj)
	);
	server.get("/odjava", htmlUpravitelj.odjava.bind(htmlUpravitelj));

	server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.post("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));

	server.get("/getJWT", fetchUpravitelj.getJWT.bind(fetchUpravitelj));
	server.get("/getUloga", fetchUpravitelj.getUloga.bind(fetchUpravitelj));
	server.get("/getKorisnik", fetchUpravitelj.getKorisnik.bind(fetchUpravitelj));
}
