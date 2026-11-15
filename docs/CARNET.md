# Carnet — Witch'rok

Mémoire du projet (skill `carnet-de-projet`). À lire avant chaque séance, à compléter à la fin. On n'efface rien.
Légende : ✅ fait · 🔨 en cours · ⏳ à faire · 💡 idée de Claude (à valider) · ❌ abandonné

Witch'rok est le **jeu de référence** de la charte graphique (skill `charte-jeux-pixel-art`). Les règles techniques sont dans `CLAUDE.md`.

## 1. L'histoire (résumé)
Yvan, Rod et Solène visitent un studio de cinéma à Londres. Ils tentent la photo du chariot qui fonce dans le mur… et le traversent pour de vrai. Ils basculent dans un monde de sorciers **entièrement original** : aucun nom, lieu, personnage ni logo des films ou des livres existants. Tout est inventé (Académie d'Hiverlune, Quai des Brumes…).

## 2. Personnages
| Qui | Ce qu'on sait | Jouable |
|---|---|---|
| Yvan | Fan de foot (écharpe vue plus de défaites que de victoires… c'est celle de Rod), adore photographier la bouffe (4 000 photos). Porte la tenue de sorcier dès le chapitre 1 : robe et cape noires, écharpe rouge, pas de chapeau. | ✅ |
| Rod | A une écharpe de foot porte-bonheur ; jouait dans un groupe (« la setlist du groupe »). Au début du chapitre 1, part aux toilettes vers la gauche (où il y aura un pub anglais). | ✅ |
| Solène | Garde les billets ; a « confisqué la carte bleue » d'Yvan. Au début du chapitre 1, part acheter des bonbons (vers le bas). | ✅ |
| L'hôte (PNJ) | **À l'intérieur du bus, derrière sa caisse à l'entrée** (corrigé le 15/11) : « dit de rentrer, que c'est gratuit et de ne pas avoir peur ». Disparaît quand le bus redevient normal. | — |
| Visiteuse (PNJ) | Dame aux cheveux roses et jumelles, dans le bus. Le visiteur (touriste) a été retiré de l'intérieur le 15/11 ; les deux passent encore dehors (gens qui entrent et ressortent). | — |
| Alien vert (curiosité) | « Un alien vert classique » : grosse tête, grands yeux noirs, cligne des yeux. | — |
| Lapin géant (curiosité) | « Un lapin géant humanoïde creepy » : debout, costume marron, yeux noirs à point rouge, grand sourire plein de dents, tête qui penche. | — |
| Voix au téléphone | « Bzrkkks c'est toi ? » … « Ce n'est pas ce qui était prévu. » Identité inconnue. | — |
| L'homme au manteau (PNJ) | « Un type aux cheveux longs, un manteau noir comme Néo de Matrix » qui entre dans le bus quand Yvan en sort. | — |

## 3. Chapitres et scènes
| Partie | Scènes | État |
|---|---|---|
| Intro | `appart` (anniversaire, cadeau = tenue de sorcier, tenue neutre) → `salon` (Yvan sur son canapé) → carton « Un an plus tard » | ✅ |
| Chapitre 1 — départ | `londres` : « Et nous voici à Londres », titre, tuto ; Rod part aux toilettes, Solène acheter des bonbons ; Yvan : « Encore seul… pour changer. » On joue les 3 **successivement**, sans pouvoir changer de perso (verrou). | ✅ 15/11/2026 |
| Chapitre 1 — Yvan | Cabine (pièce brillante, appel mystérieux) → bus-musée (plus grand dedans, curiosités, singe aux cymbales) → pièce dans le singe → éblouissement → bus normal → sortie, l'homme au manteau entre → « Pendant ce temps, du côté de Rod… » | ✅ 15/11/2026 |
| Chapitre 1 — Rod | Pub anglais à gauche, toilettes. Détails à venir (raconté par l'utilisateur). | ⏳ |
| Chapitre 1 — Solène | Achat de bonbons, puis les trois se retrouvent. Détails à venir. | ⏳ |
| Plus tard | `quai` (studio, photo du chariot) → `autre` (Quai des Brumes) : accessibles quand ils se sont retrouvés (`S.f.retrouves`). | ✅ (code) |

Drapeaux d'histoire utilisés : `S.f.pose`, `S.f.traverse`, `S.f.fin`, `S.f.cabine`, `S.f.piece`, `S.f.hote`, `S.f.fente`, `S.f.singe`, `S.f.busNormal`, `S.f.manteau`, `S.f.finYvan`, `S.f.retrouves` (pas encore posé par l'histoire).

## 4. Inventaires par chapitre
| Moment | Yvan | Rod | Solène |
|---|---|---|---|
| Début du chapitre 1 | Téléphone | Écharpe de foot | Billets |
| Chapitre 1 — Yvan | + **Pièce brillante** (cabine) → **utilisée** dans le singe | — (parti) | — (partie, garde les Billets) |
| Fin de la partie d'Yvan | Téléphone | Écharpe de foot | Billets |
| Rue de Londres | — | Solène peut donner les **Billets** à Rod ou à Yvan | Billets → donnés |
| Studio (quai) | Téléphone **utilisé** pour la photo du chariot | — | — |
| Fin (Quai des Brumes, plus tard) | Téléphone (+ Billets si on les lui a donnés) | Écharpe (+ Billets si on les lui a donnés) | (Billets s'ils ne sont pas donnés) |

## 4 bis. Énigmes et déclencheurs
| Énigme | Il faut | Résultat |
|---|---|---|
| Cabine | Utiliser la cabine → **vue zoomée de l'intérieur** (téléphone, combiné, tablette, annuaire, vitres sous la pluie) | La pièce brille sur la tablette, à côté du combiné |
| Pièce | Prendre la pièce | Le téléphone sonne (le combiné vibre), **Yvan décroche** (sa main tient le combiné), appel mystérieux, on raccroche |
| Bus-musée | Utiliser le bus → l'hôte (« gratuit »), Yvan tremble, « …Mais c'est gratuit. », **pause**, il avance vers le centre, puis « ça a l'air plus grand dedans » (gag voulu par l'utilisateur) | Intérieur géant plein de curiosités |
| Singe | Examiner le singe (action par défaut ; la fente est toujours visible) ; Utiliser la pièce sur le singe | Scintillement, Yvan ébloui, le bus redevient normal |
| Sortie du bus | Bus normal | L'homme au manteau entre ; transition vers Rod |

## 5. Contradictions et points à vérifier
- Avant : le chapitre 1 se jouait à trois avec changement libre de personnage, et le studio venait juste après. Maintenant : les trois se séparent et on les joue l'un après l'autre (verrou). Le studio (photo du chariot) est gardé pour quand ils se retrouvent ; la porte du studio refuse d'ouvrir avant.
- L'intro se passe « un an plus tôt » : Raphaël n'était pas né, d'où son retrait (voir Abandonné).
- Les **Billets** peuvent finir chez Rod ou chez Yvan selon le choix du joueur : la suite de l'histoire devra marcher dans les deux cas (ou forcer l'un des deux).
- L'**Écharpe** de Rod n'a encore aucun usage : à prévoir dans une énigme, sinon c'est un objet d'ambiance.
- Qui est la voix au téléphone, que « prévoyait »-elle, et qui est l'homme au manteau ? À définir par l'utilisateur.
- La description de l'écharpe dit « Mon écharpe porte-bonheur » alors que c'est Rod qui la porte : c'est cohérent seulement si la description est lue dans la voix de Rod (à vérifier en jeu avec Yvan).

## Lots
- 16/11/2026 : répliques du chapitre 1 corrigées par l'utilisateur (77 lignes, appliquées telles quelles, accents ajoutés). Homme au manteau plus lent. Cabine : la main d'Yvan décroche et porte le combiné à son oreille (on voit le côté de sa tête), puis raccroche.

## 6. Idées de Claude (💡 à valider)
- (aucune en attente)

## 7. Abandonné
- ❌ Yvan vu dans la cabine depuis la rue : remplacé le 16/11/2026 par une vue zoomée de l'intérieur.
- ❌ Momie deux fois plus grande qu'Yvan : remise à sa taille le 15/11/2026.
- ❌ **Méditants** (sosies de John Lennon) : remplacés par l'alien vert et le lapin géant, le 15/11/2026.
- ❌ **Visiteur** touriste à l'intérieur du bus : retiré le 15/11/2026 (il reste parmi les passants dehors).
- ❌ **Raphaël** (bébé de Solène) et la **Tétine** : retirés le 15/11/2026, il n'était pas encore né à ce moment de l'histoire (demande de l'utilisateur).
