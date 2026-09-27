<?xml version="1.0" encoding="UTF-8"?>
<!-- Только для человека в браузере: поисковики читают XML напрямую и этот файл игнорируют -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="ru">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Карта сайта — urvanov.com</title>
        <style>
          :root { --bg:#fafafa; --fg:#18181b; --mute:#71717a; --line:#e4e4e7; --chip:#f4f4f5; --acc:#2563eb; }
          @media (prefers-color-scheme: dark) { :root { --bg:#111113; --fg:#f4f4f5; --mute:#a1a1aa; --line:#27272a; --chip:#1c1c1f; --acc:#60a5fa; } }
          * { box-sizing:border-box; }
          body { margin:0; padding:24px 16px; background:var(--bg); color:var(--fg); font:14px/1.5 system-ui,-apple-system,sans-serif; }
          main { max-width:960px; margin:0 auto; }
          h1 { font-size:20px; margin:0 0 4px; }
          .sub { color:var(--mute); margin:0 0 20px; }
          .n { font-weight:600; color:var(--fg); }
          table { width:100%; border-collapse:collapse; }
          th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
          th { color:var(--mute); font-weight:500; font-size:12px; }
          td.url { word-break:break-all; }
          a { color:var(--acc); text-decoration:none; }
          a:hover { text-decoration:underline; }
          .chip { display:inline-block; padding:1px 7px; margin:0 4px 2px 0; border-radius:6px; background:var(--chip); font-size:12px; }
          .bar { display:inline-block; height:6px; border-radius:3px; background:var(--acc); vertical-align:middle; margin-right:6px; }
          .nw { white-space:nowrap; }
          @media (max-width:600px) { th.hide, td.hide { display:none; } }
        </style>
      </head>
      <body>
        <main>
          <h1>Карта сайта</h1>
          <p class="sub">Страниц: <span class="n"><xsl:value-of select="count(s:urlset/s:url)"/></span></p>
          <table>
            <tr><th>Страница</th><th class="hide">Языки</th><th>Обновлена</th><th class="hide">Важность</th></tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td class="url"><a href="{s:loc}"><xsl:value-of select="substring-after(s:loc, '.com')"/></a></td>
                <td class="hide"><xsl:for-each select="xhtml:link[@hreflang != 'x-default']"><a class="chip" href="{@href}"><xsl:value-of select="@hreflang"/></a></xsl:for-each></td>
                <td class="nw"><xsl:value-of select="s:lastmod"/></td>
                <td class="hide nw"><span class="bar" style="width:{s:priority * 40}px"></span><xsl:value-of select="s:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
