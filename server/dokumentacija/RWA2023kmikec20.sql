
BEGIN;
CREATE TABLE "serija"(
  "tmdb_id" INTEGER PRIMARY KEY NOT NULL,
  "naziv" VARCHAR(100) NOT NULL,
  "opis" TEXT NOT NULL,
  "br_sezone" INTEGER NOT NULL,
  "br_epizode" INTEGER NOT NULL,
  "popularnost" DECIMAL NOT NULL,
  "slika" TEXT NOT NULL,
  "poveznica_na_str" TEXT NOT NULL
);
CREATE TABLE "sezona"(
  "tmdb_id" INTEGER PRIMARY KEY NOT NULL,
  "naziv" VARCHAR(100) NOT NULL,
  "opis" TEXT NOT NULL,
  "slika" TEXT NOT NULL,
  "br_sezone" INTEGER NOT NULL,
  "br_epizode" INTEGER NOT NULL,
  "serija_tmdb_id" INTEGER NOT NULL,
  CONSTRAINT "fk_vrsta_korisnika_serija1"
    FOREIGN KEY("serija_tmdb_id")
    REFERENCES "serija"("tmdb_id")
);
CREATE INDEX "sezona.fk_vrsta_korisnika_serija1_idx" ON "sezona" ("serija_tmdb_id");
CREATE TABLE "vrsta_korisnika"(
  "id" INTEGER PRIMARY KEY NOT NULL,
  "naziv" VARCHAR(30) NOT NULL
);
CREATE TABLE "korisnik"(
  "korime" VARCHAR(50) PRIMARY KEY NOT NULL,
  "ime" VARCHAR(50),
  "prezime" VARCHAR(100),
  "email" VARCHAR(100) NOT NULL,
  "lozinka" VARCHAR(1000) NOT NULL,
  "drzava" VARCHAR(50),
  "grad" VARCHAR(50),
  "datum_rodjenja" DATE,
  "vrsta_korisnika_id" INTEGER NOT NULL,
  CONSTRAINT "email_UNIQUE"
    UNIQUE("email"),
  CONSTRAINT "fk_korisnik_vrsta_korisnika1"
    FOREIGN KEY("vrsta_korisnika_id")
    REFERENCES "vrsta_korisnika"("id")
);
CREATE INDEX "korisnik.fk_korisnik_vrsta_korisnika1_idx" ON "korisnik" ("vrsta_korisnika_id");
CREATE TABLE "favoriti"(
  "korisnik_korime" VARCHAR(50) NOT NULL,
  "serija_tmdb_id" INTEGER NOT NULL,
  PRIMARY KEY("korisnik_korime","serija_tmdb_id"),
  CONSTRAINT "fk_favoriti_korisnik1"
    FOREIGN KEY("korisnik_korime")
    REFERENCES "korisnik"("korime"),
  CONSTRAINT "fk_favoriti_serija1"
    FOREIGN KEY("serija_tmdb_id")
    REFERENCES "serija"("tmdb_id")
);
CREATE INDEX "favoriti.fk_favoriti_serija1_idx" ON "favoriti" ("serija_tmdb_id");
CREATE TABLE "dnevnik"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "datum_od" DATE NOT NULL,
  "datum_do" DATE NOT NULL,
  "vrijeme_od" TIME NOT NULL,
  "vrijeme_do" TIME NOT NULL,
  "vrsta_zahtjeva" VARCHAR(20) NOT NULL,
  "tijelo" VARCHAR(45),
  "korisnik_korime" VARCHAR(50) NOT NULL,
  CONSTRAINT "fk_dnevnik_korisnik1"
    FOREIGN KEY("korisnik_korime")
    REFERENCES "korisnik"("korime")
);
CREATE INDEX "dnevnik.fk_dnevnik_korisnik1_idx" ON "dnevnik" ("korisnik_korime");
COMMIT;

SELECT *FROM korisnik WHERE korime='obican'
UPDATE korisnik SET lozinka='2317c5cc4e67b0cb5f55b26fdcf5fe0a24012503ae99d22b26f3c866d281be2b' WHERE korime='admin'