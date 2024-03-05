window.addEventListener("load", async () => {
	var gumbOdustani = document.getElementById("Odustani");
	var gumbSpremi = document.getElementById("Spremi");
	gumbOdustani.addEventListener("click", () => {
		odustaniProfil();
	});

	ucitajPodatke();
	gumbSpremi.addEventListener("click", () => {
		let noviPodaci = azuriratiKorisnika();
		console.log("novi podaci");
		console.log(noviPodaci);
		prikaziPodatke(noviPodaci);
	});
});

async function ucitajPodatke() {
	let odgovor = await fetch("/getKorisnik");
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		prikaziPodatke(podaci);
	} else {
		alert("Problem kod dohvaćanja podataka:\n" + odgovor.statusText);
	}
}

function prikaziPodatke(podaci) {
	let sesija = JSON.parse(podaci);
	let korisnik = sesija.korisnik;
	console.log("asdfasdf");
	console.log(korisnik);
	console.log(korisnik.ime);

	var Ime = document.getElementById("ime");
	var Prezime = document.getElementById("prezime");
	var Korime = document.getElementById("korime");
	var Email = document.getElementById("email");
	var Lozinka = document.getElementById("lozinka");
	var Drzava = document.getElementById("drzava");
	var Grad = document.getElementById("grad");
	var GodinaRođenja = document.getElementById("datum_rodjenja");

	Ime.value = korisnik.ime;
	Prezime.value = korisnik.prezime;
	Korime.value = korisnik.korime;
	Email.value = korisnik.email;
	Lozinka.value = korisnik.lozinka;
	Drzava.value = korisnik.drzava;
	Grad.value = korisnik.grad;
	GodinaRođenja.value = korisnik.datum_rodjenja;
}

async function azuriratiKorisnika() {
	var novoIme = document.getElementById("ime");
	var novoPrezime = document.getElementById("prezime");
	var novaLozinka = document.getElementById("lozinka");
	var novaDrzava = document.getElementById("drzava");
	var noviGrad = document.getElementById("grad");
	var noviDatum_rodjenja = document.getElementById("datum_rodjenja");
	var Korime = document.getElementById("korime");
	const noviPodaci = {
		ime: novoIme.value,
		prezime: novoPrezime.value,
		lozinka: novaLozinka.value,
		drzava: novaDrzava.value,
		grad: noviGrad.value,
		datum: noviDatum_rodjenja.value,
	};
	console.log(noviPodaci);
	const zahtjev = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(noviPodaci),
	};
	console.log(Korime.value);
	try {
		const odgovor = await fetch("/baza/korisnici/" + Korime.value, zahtjev);
		const tekstOdgovora = await odgovor.text();
		prikaziPodatke(noviPodaci);
		return tekstOdgovora;
	} catch (error) {
		console.error("Došlo je do greške tijekom ažuriranja korisnika:", error);
	}
}

function odustaniProfil() {
	window.location.reload();
}
