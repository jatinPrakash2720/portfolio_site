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
      <body>
        <ReduxProvider>
          <StoreHydrator />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
