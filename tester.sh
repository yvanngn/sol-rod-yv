python3 build.py >/dev/null && node tests/test.js "$@" 2>&1 | grep -A3 "ÉCHEC\|vérifications"
