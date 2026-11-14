# Witch'rok — règles du projet (font foi)

Jeu point and click pixel art : Yvan, Rod et Solène traversent le mur d'un studio de cinéma londonien
et basculent dans un monde de sorciers **original** (aucun nom, lieu, personnage ou logo des films/livres
existants : on invente tout — Académie d'Hiverlune, Quai des Brumes…).

## Structure
- `src/index.html` (gabarit), `src/style.css`, `src/js/*.js` (ordre fixé dans `build.py`).
- `python3 build.py` → `dist/index.html` (fichier unique). **Ne jamais éditer `dist/`.**
- Tout est dessiné par le code (pas d'images ni de sons externes). Polices Google : « Mystery Quest » (titre, noms des bulles, avatars, jamais en petit) et « Fondamento » (dialogues). Panneaux dessinés dans le canvas : Georgia gras (une police décorative est illisible à 7-9 px).

## Déroulé
- Intro (`intro.js`) : `appart` (anniversaire, cadeau = tenue de sorcier, tenue neutre `S.tenue='neutre'`) → `salon` (Yvan sur son canapé)
  → carton « Un an plus tard » → **Chapitre 1** `londres` : « Et nous voici à Londres », titre flottant `titreJeu()`, tutoriel `tuto()`.
- Ensuite : `quai` (studio, photo du chariot) → `autre` (Quai des Brumes). À venir : une scène avec Yvan seul, puis Rod et Solène, qui se retrouvent.
- Yvan porte la tenue de sorcier (robe et cape noires, écharpe rouge, **pas de chapeau**) à partir du chapitre 1. Tenues : `SPEC` (chapitre en cours) et `NEUTRE` (intro), via `tenue(n)`.

## Moteur (src/js/moteur.js)
- Personnages jouables : `yvan`, `rod`, `solene`. Inventaire par personnage `S.persos[nom].inv`.
  Changer : `switchPerso(nom)`.
- Graphisme (`graphisme.js`) : apparence dans `SPEC`, `drawPerso` avec `face()`/`profil()` (dir face, d, g, dos) et cycle de marche `S.anim[n]` ; outils `shade`, `vgrad`, `halo`, `vignette`.
  Décors détaillés dans `decor.js` (remplacent `dessin` des scènes).
- Effets (`effets.js`), déclarés par scène : `ambiance{nuit,voile,teinte}`, `lumieres` (liste ou fonction {x,y,r,c,vacille}),
  `particules()` (via `emettre`), `premierPlan()` (flou + parallaxe via `couche(f,…)`/`flou(px,…)`), `reflet:1` (sol mouillé).
  Parallaxe : `couche()` seulement pour le lointain et le premier plan, jamais pour les objets cliquables.
- `say('moi',…)` = voix du héros courant ; `say('rod',…)` = Rod précis. `choose([...])` = menu dans la scène.
- Interface sans barre de verbes : clic = `verbeParDefaut(o)` (personne→parler, `utiliser` défini→utiliser, sinon regarder ; `defaut:` pour forcer).
  Clic droit / appui long = roue Regarder/Prendre/Utiliser/Parler. Objet sélectionné + clic = Utiliser (objet) ou Donner (personne).
- Verbes internes : Regarder, Prendre, Utiliser, Parler, Donner. Donner = toujours « objet → personne »
  (`humain:true`), réactions dans `with:{objet:…}`. Utiliser X avec Y : `with` aussi.
- Une scène = `SCENES.id = {nom, dessin(), objets:[…], heros:{nom:{parler,with}}, entree()}`.
- Drapeaux d'histoire : `S.f`. Personnage assis/caché derrière un meuble : `S.posY[nom]` + meuble dessiné dans `devant()` de la scène.
- Mobile (≤ 760 px) : la bulle et les choix s'affichent sous l'image (zone réservée sous le canvas), jamais par-dessus les personnages.
- Son (`son.js`, Web Audio synthétisé) : musique par scène `MUSIQUE_SCENE` (thèmes `THEMES` : anniv, soir, magie, brumes ; voix = [instrument, [[midi|accord|null, temps]…]]),
  ambiances `AMBIANCE_SCENE`, bruitages `sfx(nom)`. Menu ⚙ : musique / bruitages avec bouton couper + curseur de volume (`volume(type,v)`, `regler(type,oui)`, mémorisés), revoir le tuto. Démarre au premier geste du joueur.
- Mise en scène : `noir(true/false)` (fondu), `carton(texte)`, `titreJeu()`, `tuto()`, `anim(n).rire`.

## Tests
- `sh tester.sh` (tout) ou `sh tester.sh quai` (groupes : graphisme, intro, son, passer, londres, quai, autre). Scénarios dans `tests/test.js`.
- Mode test : `window.TEST` → dialogues instantanés, choix pris dans `TEST.choix`, `action(id,verbe,objet)`.
- Toute fonctionnalité ou correction = un test dans le groupe concerné. Ne tester que le groupe modifié.

## Économie de tokens
- Réponses brèves, pas de récap. Coder tout le prompt, vérifier **une fois à la fin**.
- Texte/dessin seul : `python3 build.py` + `node --check` suffit.
- Histoire : coder seulement ce que l'utilisateur décrit ; mes idées vont dans « Suggestions ».
- Après de nouvelles répliques : les lister numérotées pour correction ; appliquer telles quelles.
- Garde-fou : >40 échanges ou historique compacté → proposer une nouvelle conversation + résumé 5 lignes.
  >6 demandes indépendantes → proposer un découpage. « force » = exécuter quand même.
- Exports (zip, dialogues) uniquement sur demande.

## Republier
Avant toute publication, même pour un simple changement de texte ou de police : `sh tester.sh` (ou au minimum `node --check`).
Publier `dist/index.html` avec l'outil Artifact, toujours sur la même page (même chemin ou `url`).
