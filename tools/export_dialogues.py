"""Exporte toutes les répliques du jeu dans docs/DIALOGUES.md (fichier:ligne, qui, texte)."""
import re,pathlib
R=pathlib.Path(__file__).resolve().parent.parent
FICHIERS=[("Intro","intro.js"),("Chapitre 1 — départ, Yvan, cabine, bus-musée","chapitre1.js"),("Chapitre 1 — Rod : pub, toilettes, ballon","chapitre1_rod.js"),("Londres (base), studio, Quai des Brumes","scenes.js"),("Réponses par défaut et portraits","moteur.js")]
QUI={'moi':'héros courant','yvan':'Yvan','rod':'Rod','solene':'Solène','narr':'Narrateur','tel':'Voix au téléphone','hote':"L'hôte",'visiteuse':'Visiteuse','visiteur':'Visiteur'}
CHAMP={'regarder':'regarder','prendre':'prendre','utiliser':'utiliser','parler':'parler','desc':'objet (inventaire)','donnerSansObjet':'défaut','donnerPasHumain':'défaut','donnerRefus':'défaut','utiliserSurPersonne':'défaut','yvan':'portrait','rod':'portrait','solene':'portrait'}
CHAINE=r'"((?:[^"\\]|\\.){3,})"'
out=["# Witch'rok — toutes les répliques","","Corrige directement le texte (garde le numéro) et renvoie-moi la liste. Généré par `python3 tools/export_dialogues.py`.",""]
n=0
for titre,f in FICHIERS:
    out+=[f"## {titre} (`src/js/{f}`)",""]
    for i,l in enumerate((R/"src/js"/f).read_text(encoding="utf-8").split("\n"),1):
        vus=set()
        for m in re.finditer(r"""(?:say\(|\[)\s*'(\w+)'\s*,\s*(?:[^"]*?\?)?"""+CHAINE,l):
            qui,t=m.group(1),m.group(2)
            if qui in QUI:
                n+=1;vus.add(t);out.append(f"{n}. **{QUI[qui]}** — {t}  `{f}:{i}`")
        for m in re.finditer(r"(\w+)\s*:\s*(?:\(\)=>say\('moi',[^\"]*?)?"+CHAINE,l):
            c,t=m.group(1),m.group(2)
            if t in vus or c not in CHAMP or ' ' not in t:continue
            n+=1;vus.add(t);out.append(f"{n}. *{CHAMP[c]}* — {t}  `{f}:{i}`")
        for t in re.findall(CHAINE,l):
            if t in vus or ' ' not in t or len(t)<12 or not re.search(r"[a-zàâéèêîôûç]{3}",t) or re.search(r"[{};=]|px |rgba|#[0-9a-f]{3}",t):continue
            n+=1;vus.add(t);out.append(f"{n}. — {t}  `{f}:{i}`")
    out.append("")
(R/"docs/DIALOGUES.md").write_text("\n".join(out),encoding="utf-8")
print(n,"répliques")
