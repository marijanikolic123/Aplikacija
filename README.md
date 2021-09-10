# Projekat - Sistemi ePoslovanja - 2020/2021

## Sadržaj spremišta

Ovde se nalazi projekat za predmeta Praktikum - Sistemi ePoslovanja na [UNIVERZITET SINGIDUNUM]- 2020/2021.

## Struktura direktorijuma

* U direktorijumu [01-Documentation](./01-Documentation/README.md) se nalaze dokumenta o projektu, medju kojima su tekst projektnog zahteva, projektna dokumentacija, model baze itd.
* U direktorijumu [02-Resources](./02-Resources/README.md) se nalaze prateci resursi za potrebne podizanja projekta kao sto je SQL dump sa demo podacima radne baze podataka, skripte za utomatizaciju zatadaka itd.
* U direktorijumu [03-Back-end](./03-Back-end/README.md) se nalazi Node.js backend sloj aplikacije odnosno API.
* U direktorijumu [04-Front-end](./03-Front-end/README.md) se nalazi React.js frontend sloj aplikacije.

## Kako se pokreće aplikacija

Aplikacija se pokrece u 3 koraka:

1.Mora da se pripremi MySQL/MariaDB baza podataka u koju se ucitava azurna verzija sql dump-a baze (ne postoje migracije).
2.Zatim se pokrece backend sloj aplikacije (uputstva se nalaze u backend direktorijumu)
3.Zatim se pokrece fronedn sloj aplikacije (uputstva se nalaze u frontend direktorijumu)
4.Otvara se web adresa frontend aplikacije.
