import { Html, Head, Main, NextScript } from "next/document";

import { getCspRules } from "utils/getCspRules";

export default function Document() {
  return (
    <Html lang="ru">
      <meta http-equiv="Content-Security-Policy" content={getCspRules()} />
      <Head />
      <body>
        <Main />
        <NextScript />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
         
            ym(93468824, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });`,
          }}
        />

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/93468824"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </Html>
  );
}
