import { createClient } from '../lib/supabase/client'
import type { OrganizationSchema } from '@/schemas/organization'

const supabase = createClient()

export async function getOrganizationByMemberId(memberId: string) {
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('organization_id')
    .eq('id', memberId)
    .single()

  if (memberError) throw new Error(memberError.message)

  const { data: organization, error: orgError } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', member.organization_id)
    .single()

  if (orgError) throw new Error(orgError.message)
  return organization
}

export async function updateOrganizationById(id: number, data: OrganizationSchema) {
  const { data: updatedOrganization, error } = await supabase
    .from('organizations')
    .update(data)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) throw new Error(error.message)

  return updatedOrganization
}
