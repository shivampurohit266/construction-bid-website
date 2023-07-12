import React from "react";
import { Helmet } from "react-helmet";
import { getUiLanguage, type Languages } from "../utils/localization";

const asLangProp = (lang: Languages) => {
  if (lang === "english") {
    return "en";
  } else if (lang === "finnish") {
    return "fi";
  } else {
    // fallback lang attribute
    return "en";
  }
};

const Seo = (data: {
  title: string;
  url: string;
  thumbnail?: any;
  metaTitle?: any;
  type?: any;
  noindex?: any;
  description?: string;
}) => {
  const lang = asLangProp(getUiLanguage());

  return (
    <Helmet>
      <html lang={lang} />
      <meta property="og:locale" content={lang} />

      <title>{data.title}</title>
      <meta name="title" content={data.title} />
      <meta property="og:title" content={data.title} />
      <meta property="twitter:title" content={data.title} />
      <meta property="og:site_name" content="Proppu" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:url" content={`https://proppu.com/${data.url}`} />
      <meta property="twitter:url" content={`https://proppu.com/${data.url}`} />
      <meta property="og:type" content="website" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="../static/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="../static/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="../static/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="../static/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="../static/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="../static/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="../static/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="../static/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../static/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="../static/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="../static/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../static/favicon-16x16.png"
      />
      <link rel="manifest" href="../static/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../static/favicon-16x16.png"
      />
      <link rel="manifest" href="../static/site.webmanifest" />
      <link
        rel="mask-icon"
        href="../static/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      {data.thumbnail && <meta property="og:image" content={data.thumbnail} />}
      {data.thumbnail === null && (
        <meta property="og:image" content="../static/favicon-16x16.png" />
      )}
      {data.thumbnail && (
        <meta property="twitter:image" content={data.thumbnail} />
      )}
      {data.thumbnail === null && (
        <meta property="twitter:image" content="../static/favicon-16x16.png" />
      )}

      {data.description && (
        <meta name="description" content={data.description} />
      )}
      {data.description && (
        <meta property="og:description" content={data.description} />
      )}
      {data.description && (
        <meta property="twitter:description" content={data.description} />
      )}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-223317787-1"
      ></script>
      {process.env.NODE_ENV !== "development" ? (
        <script>
          {`window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments)}
                          gtag('js', new Date());
                          gtag('config', 'AW-10932319787');`}
        </script>
      ) : null}
      {process.env.NODE_ENV !== "development" ? (
        <script>
          {`(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:2893557,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </script>
      ) : null}

      {process.env.NODE_ENV !== "development" ? (
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-10932319787"
        ></script>
      ) : null}

      {process.env.NODE_ENV !== "development" ? (
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DX14MQRNLQ"
        ></script>
      ) : null}
      {process.env.NODE_ENV !== "development" ? (
        <script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DX14MQRNLQ'); `}</script>
      ) : null}
      {/* <!-- Meta Pixel Code --> */}
      {process.env.NODE_ENV !== "development" ? (
        <script>
          {`!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '827475381729465');
    fbq('track', 'PageView');`}
        </script>
      ) : null}
      {process.env.NODE_ENV !== "development" ? (
        <noscript>
          {`<img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=827475381729465&ev=PageView&noscript=1"
            />`}
        </noscript>
      ) : null}
      {/* <!-- End Meta Pixel Code --> */}
      {/* <!-- Google Tag Manager --> */}
      <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MG9R8JK');`}</script>
      {/* <!-- End Google Tag Manager --> */}
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>{`<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MG9R8JK"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}</noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </Helmet>
  );
};

export default Seo;
