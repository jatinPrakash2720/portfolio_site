import { ReduxProvider } from '@/store/Provider'
import { StoreHydrator } from '@/components/shared/storeHydrator' // 👈 Import
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Boldonse:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          <StoreHydrator />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
