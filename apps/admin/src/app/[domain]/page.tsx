import { notFound } from 'next/navigation'
import { domainService } from '../../../../../packages/shared/src/services/domainService'
import AdminDashboard from '../../components/admin/AdminDashboard'

interface AdminPageProps {
  params: Promise<{
    domain: string
  }>
}

export default async function DomainAdminPage({ params }: AdminPageProps) {
  const { domain } = await params

  // Resolve the domain to get user data
  const resolution = await domainService.resolveDomain(domain)

  if (!resolution || resolution.appType !== 'admin') {
    notFound()
  }

  return <AdminDashboard user={resolution.user} domain={domain} />
}

export async function generateMetadata({ params }: AdminPageProps) {
  const { domain } = await params
  const resolution = await domainService.resolveDomain(domain)

  if (!resolution || resolution.appType !== 'admin') {
    return {
      title: 'Dashboard Not Found',
    }
  }

  return {
    title: `${resolution.user.fullName} - Dashboard`,
    description: `Admin dashboard for ${resolution.user.fullName}`,
  }
}
