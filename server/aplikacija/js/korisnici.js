window.addEventListener("load", async () => {
	let odgovor = await fetch("/getUloga");
	let podaci = await odgovor.text();
	let korisnik = JSON.parse(podaci);
	console.log("korisnik uloga = " + korisnik.uloga);
	if (korisnik.uloga == 2) {
		prikaziKorisnike();
	}
});
async function prikaziKorisnike() {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	let dohvati = { method: "GET" };
	let odgovor = await fetch("/baza/korisnici", dohvati);
	let podaci = await odgovor.text();
	let korisnici = await JSON.parse(podaci);
	console.log(korisnici);
	tablica +=
		"<tr><th>Korime</th><th>Ime</th><th>Prezime</th><th>Email</th><th>Lozinka</th><th>Država</th></tr>";
	for (let k of korisnici) {
		tablica += "<tr>";
		tablica += "<td>" + k.korime + "</td>";
		tablica += "<td>" + k.ime + "</td>";
		tablica += "<td>" + k.prezime + "</td>";
		tablica += "<td>" + k.email + "</td>";
		tablica += "<td>" + k.lozinka + "</td>";
		tablica += "<td>" + k.drzava + "</td>";

		tablica +=
			"<td><button onClick='brisiKorisnika(\"" +
			k.korime +
			"\")'>Ukloni</button></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	glavna.innerHTML = tablica;
}

async function brisiKorisnika(korime) {
	if (korime === "admin") {
		console.log({ status: 405 });
		console.log({ opis: "Korijenski admin se ne može obrisat" });
		return;
	}

	let obrisi = { method: "DELETE" };
	let odgovor = await fetch("/baza/korisnici/" + korime, obrisi);
	console.log("/baza/korisnici/" + korime);

	prikaziKorisnike(await odgovor.text());
}
