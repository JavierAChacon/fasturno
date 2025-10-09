import { MEMBERS_KEY } from '@/constants/queryKeys'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useGetOrganization } from './organization'
import { addMember, getMemberById, getMembers, updateMember, deleteMember } from '@/services/member'
import type { AddMemberSchema, UpdateMemberSchema } from '@/schemas/member'

export function useAddMember() {
  const { data: organization } = useGetOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (member: AddMemberSchema) => {
      if (!organization?.id) throw new Error('No organization found')
      return addMember(member, organization.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MEMBERS_KEY.MEMBERS]
      })
    }
  })
}

export function useGetMembers() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [MEMBERS_KEY.MEMBERS],
    queryFn: () => getMembers(organization.id),
    enabled: !!organization?.id
  })
}

export function useGetMemberById(memberId: string) {
  return useQuery({
    queryKey: [MEMBERS_KEY.MEMBERS, memberId],
    queryFn: () => getMemberById(memberId),
    enabled: !!memberId
  })
}

export function useUpdateMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      memberUpdated,
      memberId
    }: {
      memberUpdated: UpdateMemberSchema
      memberId: string
    }) => updateMember(memberUpdated, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MEMBERS_KEY.MEMBERS]
      })
    }
  })
}

export function useDeleteMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (memberId: string) => deleteMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MEMBERS_KEY.MEMBERS]
      })
    }
  })
}
