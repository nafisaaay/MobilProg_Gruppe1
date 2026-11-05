<div align="center">

# Velkommen til SocAdemy!

</div>

SocAdemy er en sosial app for studenter på Høgskolen i Østfold. Her kan du dele innlegg i forumet, se hva som skjer på campus i kalenderen, og holde kontakt med medstudenter.

Appen finnes både som **mobilapp** og **webapp**. Mobilappen har ingen egen database. Den bruker **samme API og samme database som webappen**, så et innlegg eller et event du lager på telefonen, dukker opp på nettsiden også. Webappen ligger i et eget repo: [nafisaaay/WebApp_Gruppe1](https://github.com/nafisaaay/WebApp_Gruppe1). Derfor må begge appene kjøre samtidig.

> [!NOTE]
> Bare @hiof.no-adresser kan brukes til å registrere seg.
## Slik ser det ut

| Logg inn | Registrer deg |
| :---: | :---: |
| <img width="363" height="745" alt="Screenshot 2026-11-05 at 15 02 36" src="https://github.com/user-attachments/assets/da647b14-7c04-4100-94ea-9f9daac21648" /> | <img width="364" height="744" alt="Screenshot 2026-11-05 at 15 04 59" src="https://github.com/user-attachments/assets/5e80a0f5-c891-4daf-a759-ad5a40151254" /> |
| Logg inn med HiØ-e-posten din. | Lag en bruker med navn, @hiof.no-adresse og passord. |

| Kalender | Forum |
| :---: | :---: |
|<img width="363" height="751" alt="Screenshot 2026-11-05 at 15 07 02" src="https://github.com/user-attachments/assets/aaa2ca2f-6957-4bca-be88-5c0450b05fed" />| <img width="371" height="752" alt="Screenshot 2026-11-05 at 15 10 40" src="https://github.com/user-attachments/assets/4cfc8104-74ed-4f32-8bd6-d605f2690492" /> |
| Se og opprett events i kalenderen. | Post og lik innlegg.<br>Bruk event-toggle for å legge det i kalenderen. |

| Chat | Profil |
| :---: | :---: |
|<img width="362" height="746" alt="Screenshot 2026-11-05 at 15 12 54" src="https://github.com/user-attachments/assets/cbbbad6e-ab9d-4f0e-8752-4c63859204f8" /> | <img width="380" height="758" alt="Screenshot 2026-11-05 at 15 13 14" src="https://github.com/user-attachments/assets/88ddfe7d-cc20-44d8-9273-5fb3fe03ee03" />|
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
