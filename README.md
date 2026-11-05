<div align="center">
<img src="socademy/assets/socademy-blomst.png" alt="SocAdemy-maskot" width="140" />

# SocAdemy

</div>

---

SocAdemy er en sosial app for studenter på Høgskolen i Østfold. Her kan du dele innlegg i forumet, se hva som skjer på campus i kalenderen, og holde kontakt med medstudenter.

Appen finnes både som **mobilapp** og **webapp**. Mobilappen har ingen egen database. Den bruker **samme API og samme database som webappen**, så et innlegg eller et event du lager på telefonen, dukker opp på nettsiden også. Webappen ligger i et eget repo: [nafisaaay/WebApp_Gruppe1](https://github.com/nafisaaay/WebApp_Gruppe1). Derfor må begge appene kjøre samtidig.

> [!NOTE]
> Bare @hiof.no-adresser kan brukes til å registrere seg.
## Slik ser det ut

| Logg inn | Registrer deg |
| :---: | :---: |
| (bilde innlogging) | (bilde registrering) |
| Logg inn med HiØ-e-posten din. | Lag en bruker med navn, @hiof.no-adresse og passord. |

| Kalender | Forum |
| :---: | :---: |
| Se og opprett events i kalenderen. | Post og lik innlegg.<br>Bruk event-toggle for å legge det i kalenderen. |

| Chat | Profil |
| :---: | :---: |
| (bilde chat) | (bilde profil) |
| Samtaler med medstudenter. <br> *(Under utvikling)* | Se navn og e-post, og logg ut. |

## Kom i gang

**1. Start webappen**

Følg oppsettet i [webapp-repoets README](https://github.com/nafisaaay/WebApp_Gruppe1#readme). Webappen må kjøre før mobilappen startes.

**2. Start mobilappen**

```bash
cd socademy
npm install
npx expo start
```

Trykk `a` for Android-emulatoren, eller skann QR-koden med Expo Go.
