#!/usr/bin/env python3
"""Пересчитывает src/data/termDates.ts: для каждого термина глоссария дата создания (первый коммит со слагом)
и дата последнего обновления (самая свежая строка блока термина по git blame; непроверенные правки считаются сегодняшними)."""
import subprocess, re, datetime
F = 'src/data/glossary.ts'
TODAY = datetime.date.today().isoformat()
lines = open(F).read().split('\n')
blocks = {}
i = 0
while i < len(lines):
    m = re.match(r"^        slug: '([a-z0-9-]+)',$", lines[i])
    k = i - 1
    while k > 0 and lines[k].lstrip().startswith('//'):
        k -= 1
    if m and lines[k] == '      {':
        j = i
        while lines[j] != '      },':
            j += 1
        blocks[m.group(1)] = (i, j + 1)
        i = j
    i += 1
res = {}
for slug, (a, b) in blocks.items():
    c = subprocess.run(['git', 'log', '-S' + f"slug: '{slug}',", '--format=%cs', '--reverse', '--', F], capture_output=True, text=True).stdout.split()
    created = c[0] if c else TODAY
    bl = subprocess.run(['git', 'blame', '-L', f'{a},{b}', '--date=short', F], capture_output=True, text=True).stdout.splitlines()
    ds = [m.group(1) for l in bl if (m := re.search(r'(\d{4}-\d{2}-\d{2}) ', l))]
    if any('Not Committed Yet' in l for l in bl):
        ds.append(TODAY)
    updated = max(ds) if ds else created
    res[slug] = (created, max(created, updated))
out = ("// Даты терминов глоссария: создан и последнее обновление. Считаются по истории git скриптом scripts/term-dates.py\n"
       "export const TERM_DATES: Record<string, [string, string]> = {\n"
       + ''.join(f"  '{k}': ['{v[0]}', '{v[1]}'],\n" for k, v in res.items()) + "}\n")
open('src/data/termDates.ts', 'w').write(out)
print(len(res), 'терминов')
