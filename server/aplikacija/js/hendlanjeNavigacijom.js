window.addEventListener("load", async () => {
	ucitajPodatke();
});

async function ucitajPodatke() {
	let odgovor = await fetch("/getUloga");
	let podaci = await odgovor.text();
	let korisnik = JSON.parse(podaci);
	console.log("korisnik uloga = " + korisnik.uloga);
	if (korisnik.uloga == 2) {
		navigacijaAdmin();
	} else if (korisnik.uloga == 1) {
		navigacijaKorisnik();
	} else {
		navigacijaGost();
	}
}

function navigacijaGost() {
	document.getElementById("pocetna").hidden = false;
	document.getElementById("prijava").hidden = false;
	document.getElementById("registracija").hidden = true;
	document.getElementById("dokumentacija").hidden = false;
	document.getElementById("korisnici").hidden = true;
	document.getElementById("userProfil").hidden = true;
	document.getElementById("detaljiSerije").hidden = true;
	document.getElementById("odjava").hidden = true;
}

function navigacijaKorisnik() {
	document.getElementById("pocetna").hidden = false;
	document.getElementById("prijava").hidden = false;
	document.getElementById("registracija").hidden = true;
	document.getElementById("dokumentacija").hidden = false;
	document.getElementById("korisnici").hidden = true;
	document.getElementById("userProfil").hidden = false;
	document.getElementById("detaljiSerije").hidden = false;
	document.getElementById("odjava").hidden = false;
}

function navigacijaAdmin() {
	document.getElementById("pocetna").hidden = false;
	document.getElementById("prijava").hidden = false;
	document.getElementById("registracija").hidden = false;
	document.getElementById("dokumentacija").hidden = false;
	document.getElementById("korisnici").hidden = false;
	document.getElementById("userProfil").hidden = false;
	document.getElementById("detaljiSerije").hidden = false;
	document.getElementById("odjava").hidden = false;
}
