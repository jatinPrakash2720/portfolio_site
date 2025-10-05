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

  // Handle localhost for development
  if (domain === 'localhost:3001' || domain === 'localhost') {
    const RootPage = (await import('../page')).default
    return <RootPage />
  }

  // For production subdomains (portfolio.username.com)
  // const resolution = await domainService.resolveDomain(domain)

  // if (!resolution || resolution.appType !== 'portfolio') {
  //   notFound()
  // }

  // return <PortfolioPage user={resolution.user} domain={domain} />
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const { domain } = await params

  // Handle localhost for development
  if (domain === 'localhost:3001' || domain === 'localhost') {
    return {
      title: 'Portfolio Development - Localhost',
      description: 'Development portfolio page',
    }
  }

  // For production subdomains
  const resolution = await domainService.resolveDomain(domain)

  if (!resolution || resolution.appType !== 'portfolio') {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found',
    }
  }

  return {
    title: `${resolution.user.fullName} - Portfolio`,
    description:
      resolution.user.bio || `${resolution.user.fullName}'s portfolio`,
    openGraph: {
      title: `${resolution.user.fullName} - Portfolio`,
      description:
        resolution.user.bio || `${resolution.user.fullName}'s portfolio`,
      images: resolution.user.profilePictureUrl
        ? [resolution.user.profilePictureUrl]
        : [],
    },
  }
}
