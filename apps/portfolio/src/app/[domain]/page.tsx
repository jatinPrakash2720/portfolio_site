import { notFound } from 'next/navigation'
import { domainService } from '../../../../../packages/shared/src/services/domainService'
import PortfolioPage from '../../components/portfolio/PortfolioPage'

interface PortfolioPageProps {
  params: Promise<{
    domain: string
  }>
}

export default async function DomainPortfolioPage({
  params,
}: PortfolioPageProps) {
  const { domain } = await params

  // TODO: Uncomment when deploying with real domains
  // Resolve the domain to get user data
  // const resolution = await domainService.resolveDomain(domain)

  // if (!resolution || resolution.appType !== 'portfolio') {
  //   notFound()
  // }

  // return <PortfolioPage user={resolution.user} domain={domain} />

  // For local development - redirect to /dev route
  notFound()
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const { domain } = await params

  // TODO: Uncomment when deploying with real domains
  // const resolution = await domainService.resolveDomain(domain)

  // if (!resolution || resolution.appType !== 'portfolio') {
  //   return {
  //     title: 'Portfolio Not Found',
  //   }
  // }

  // return {
  //   title: `${resolution.user.fullName} - Portfolio`,
  //   description:
  //     resolution.user.bio || `${resolution.user.fullName}'s portfolio`,
  //   openGraph: {
  //     title: `${resolution.user.fullName} - Portfolio`,
  //     description:
  //       resolution.user.bio || `${resolution.user.fullName}'s portfolio`,
  //     images: resolution.user.profilePictureUrl
  //       ? [resolution.user.profilePictureUrl]
  //       : [],
  //   },
  // }

  return {
    title: 'Portfolio Not Found - Use /dev for development',
  }
}
