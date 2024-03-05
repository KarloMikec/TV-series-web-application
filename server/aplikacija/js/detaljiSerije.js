window.addEventListener("load", async () => {
	const query = new URLSearchParams(window.location.search);
	const idSerije = query.get("idSerije");
	console.log(idSerije);
	dohvatiSeriju(idSerije);
});

async function dohvatiSeriju(idSerije) {
	let parametri = { method: "POST" };
	let odgovor = await fetch("/pretraziSeriju?idSerije=" + idSerije, parametri);
	console.log("/pretraziSeriju?idSerije=" + idSerije);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		console.log(podaci);
		prikaziDetaljeSerije(podaci);
	} else {
		poruka.innerHTML = "Greška u dohvatu Serije!";
	}
}

function prikaziDetaljeSerije(serija) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>ID</th><th>Naziv</th><th>Opis</th><th>Broj sezone</th><th>Broj epizoda</th><th>Popularnost</th><th>Stranica</th><th>Poster</th></tr>";

	tablica += "<tr>";
	tablica += "<td>" + serija.id + "</td>";
	tablica += "<td>" + serija.original_name + "</td>";
	tablica += "<td>" + serija.overview + "</td>";
	tablica += "<td>" + serija.number_of_seasons + "</td>";
	tablica += "<td>" + serija.number_of_episodes + "</td>";
	tablica += "<td>" + serija.popularity + "</td>";
	tablica += "<td>" + "<a href=" + serija.homepage + ">Poveznica</a></td>";
	tablica +=
		"<td><img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
		serija.poster_path +
		"' width='100' alt='slika_" +
		serija.title +
		"'/></td>";
	tablica += "</tr>";
	tablica += "</table>";

	glavna.innerHTML = tablica;
}
