//let url = "http://spider.foi.hr:12126/api";
let url = "http://localhost:12000";
let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajSerije(1);
	document.getElementById("filter").addEventListener("keyup", (event) => {
		dajSerije(1);
	});
});

async function dajSerije(str) {
	let parametri = { method: "POST" };
	parametri = await dodajToken(parametri);
	let odgovor = await fetch(
		"/serijePretrazivanje?str=" + str + "&trazi=" + dajFilter(),
		parametri
	);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziSerije(podaci.results);
		prikaziStranicenje(podaci.page, podaci.total_pages, "dajSerije");
	} else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "Neautorizirani pristup! Prijavite se!";
	} else {
		poruka.innerHTML = "Greška u dohvatu Serije!";
	}
}

function prikaziSerije(serije) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Id</th><th>Jezik</th><th>Naslov original</th><th>Naslov</th><th>Opis</th><th>Poster</th><th>Datum</th></tr>";
	for (let f of serije) {
		tablica += "<tr>";
		tablica += "<td>" + f.id + "</td>";
		tablica += "<td>" + f.original_language + "</td>";
		tablica += "<td>" + f.name + "</td>";
		tablica += "<td>" + f.original_name + "</td>";
		tablica += "<td>" + f.overview + "</td>";
		tablica +=
			"<td><img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
			f.poster_path +
			"' width='100' alt='slika_" +
			f.title +
			"'/></td>";
		tablica += "<td>" + f.first_air_date + "</td>";
		tablica +=
			"<td><button onClick='otvoriStranicu(" +
			f.id +
			")'>Detalji serije</button></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	sessionStorage.dohvaceneSerije = JSON.stringify(serije);

	glavna.innerHTML = tablica;
}

function dajFilter() {
	return document.getElementById("filter").value;
}

function otvoriStranicu(idSerije) {
	console.log("/detaljiSerije?idSerije=" + idSerije);
	window.location.href = "/detaljiSerije?idSerije=" + idSerije;
}
