import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "O Plano Global",
  description:
    "Umas das maiores oportunidades que ja existiu de ganhar em multiplas moedas no conforto da sua casa, usando Facebook e Google!",

    
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
     {/* Meta Pixel Code - Unificado para 2 pixels */}
     <Script id="facebook-pixels-unified">
      {`
      // Carrega o script do Facebook apenas uma vez
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      // Função para buscar dados e inicializar pixels com advanced matching
      async function initializePixelsWithAdvancedMatching() {
        try {
          // Buscar dados de geolocalização
          const geoResponse = await fetch('/api/location');
          const geoData = await geoResponse.json();

          // Buscar dados de tracking
          const trackingResponse = await fetch('/api/tracking-data');
          const trackingData = await trackingResponse.json();

          // Inicializar pixels com advanced matching
          fbq('init', '4130621700509395', {
            external_id: trackingData.external_id,
            fbp: trackingData.fbp,
            fbc: trackingData.fbc,
            city: geoData.city,
            state: geoData.state,
            country: geoData.country,
            zip_code: geoData.zip_code
          });

          fbq('init', '1891153811833718', {
            external_id: trackingData.external_id,
            fbp: trackingData.fbp,
            fbc: trackingData.fbc,
            city: geoData.city,
            state: geoData.state,
            country: geoData.country,
            zip_code: geoData.zip_code
          });

          // PageView para ambos os pixels
          fbq('track', 'PageView');

          console.log('📊 Pixels inicializados com advanced matching:', {
            pixels: ['4130621700509395', '1891153811833718'],
            geo: geoData,
            tracking: trackingData
          });

        } catch (error) {
          console.log('⚠️ Fallback para inicialização básica:', error);
          // Fallback: inicialização básica
          fbq('init', '4130621700509395');
          fbq('init', '1891153811833718');
          fbq('track', 'PageView');
        }
      }

      // Executar quando o script carregar
      initializePixelsWithAdvancedMatching();
      `}

     </Script>

     <Script id="hotjar">
      {`
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6524041,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
     </Script>

     <noscript>
       <img height="1" width="1" style={{display:'none'}}
       src="https://www.facebook.com/tr?id=1891153811833718&ev=PageView&noscript=1"
       />
     </noscript>
     
      </head>
      <body className={cn("antialiased bg-black", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
           <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}


