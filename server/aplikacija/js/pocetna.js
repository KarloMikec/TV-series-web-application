//let url = "http://spider.foi.hr:12126";
let url = "http://localhost:12000";

window.addEventListener("load", async () => {
	let main = document.getElementsByTagName("main")[0];
	let prikaz = "<ol>";
	for (let p of await dohvatiZanrove()) {
		prikaz += "<li>" + p.name;
		let serije = await dohvatiSerije(p.name);
		prikaz += "<ul>";
		prikaz += "<li>" + serije[0]["original_title"] + "</li>";
		prikaz += "<li>" + serije[1]["original_title"] + "</li>";
		prikaz += "</ul></li>";
	}
	main.innerHTML = prikaz + "</ol>";
});

async function dohvatiZanrove() {
	let odgovor = await fetch(url + "/dajSveZanrove");
	let podaci = await odgovor.text();
	console.log(podaci);
	let zanrovi = JSON.parse(podaci);
	return zanrovi;
}
