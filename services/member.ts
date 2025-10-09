import { createClient } from '@/lib/supabase/client'
import type { AddMemberSchema, MemberWithProfileSchema, UpdateMemberSchema } from '@/schemas/member'

const supabase = createClient()

export async function addMember(member: AddMemberSchema, organization_id: number) {
  const { data: userId, error: userError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', member.email)
    .maybeSingle()

  if (userError) {
    throw new Error(userError.message)
  }

  if (!userId) {
    throw new Error('No hay un usuario registrado con este correo electrónico')
  }

  const { data, error } = await supabase.from('members').insert({
    role: member.role,
    organization_id: organization_id,
    id: userId.id,
    is_admin: member.is_admin
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getMembers(organization_id: number): Promise<MemberWithProfileSchema[]> {
  const { data, error } = await supabase
    .from('members')
    .select(
      `
      id,
      role,
      is_admin,
      created_at,
      updated_at,
      profiles (
        name,
        last_name,
        email,
        phone
      )
    `
    )
    .eq('organization_id', organization_id)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getMemberById(memberId: string): Promise<MemberWithProfileSchema> {
  const { data, error } = await supabase
    .from('members')
    .select(
      `
      id,
      role,
      is_admin,
      created_at,
      updated_at,
      profiles (
        name,
        last_name,
        email,
        phone
      )
    `
    )
    .eq('id', memberId)
    .single()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function updateMember(memberUpdated: UpdateMemberSchema, memberId: string) {
  const { data, error } = await supabase
    .from('members')
    .update(memberUpdated)
    .eq('id', memberId)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteMember(memberId: string) {
  const { data, error } = await supabase
    .from('members')
    .delete()
    .eq('id', memberId)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
