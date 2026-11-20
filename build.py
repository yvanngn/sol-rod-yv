import pathlib
R = pathlib.Path(__file__).parent
JS = ["moteur.js", "graphisme.js", "effets.js", "son.js", "scenes.js", "decor.js", "intro.js", "chapitre1.js", "chapitre1_rod.js", "chapitre3_solene.js", "chapitre3_studio.js", "main.js"]
html = (R/"src/index.html").read_text(encoding="utf-8")
css = (R/"src/style.css").read_text(encoding="utf-8")
js = "\n".join((R/"src/js"/f).read_text(encoding="utf-8") for f in JS)
out = html.replace("/*CSS*/", css).replace("/*JS*/", js)
(R/"dist").mkdir(exist_ok=True)
(R/"dist/index.html").write_text(out, encoding="utf-8")
print("dist/index.html OK", len(out), "octets")
