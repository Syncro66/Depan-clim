# Dépannage Clim

Aide de terrain de Climat Actif 66 : codes erreur et gammes de climatiseurs et de pompes à chaleur.

Ouvrir l'application : [https://syncro66.github.io/Depan-clim/](https://syncro66.github.io/Depan-clim/)

La première ouverture se fait en ligne. Ensuite, les fiches restent disponibles hors connexion, sur téléphone comme sur ordinateur. Une nouvelle version remplace l'ancienne toute seule.

## Tests

`npm test` contrôle les fiches, puis lance les tests Playwright en vue iPhone (WebKit) et en vue PC. Par défaut ils visent le site en ligne. Pour un serveur local : `BASE_URL=http://127.0.0.1:4173/Depan-clim/ npm test`.

## Installer sur l'écran d'accueil

### iPhone (Safari)

1. Ouvrir le lien dans Safari (pas dans un autre navigateur).
2. Toucher le bouton Partager.
3. Toucher « Sur l'écran d'accueil », puis « Ajouter ».

### Android (Chrome)

1. Ouvrir le lien dans Chrome.
2. Toucher le menu ⋮.
3. Toucher « Installer l'application » ou « Ajouter à l'écran d'accueil ».

