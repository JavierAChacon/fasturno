'use client'

import React from 'react'
import {
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table
} from '@/components/ui/table'
import { useGetMembers } from '@/queries/member'
import { AddMember } from './components/addMember'
import { EditMember } from './components/editMember'
import { DeleteMember } from './components/deleteMember'

const MiembrosPage = () => {
  const { data: members, isPending: isLoading } = useGetMembers()

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Miembros</h1>
        <AddMember />
      </div>
      <div className="w-full"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Administrador</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Fecha de actualización</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member) => (
            <TableRow key={member.id} className="group relative text-gray-600 hover:bg-purple-100">
              <TableCell>{member.profiles?.name ?? '—'}</TableCell>
              <TableCell>{member.profiles?.last_name ?? '—'}</TableCell>
              <TableCell>{member.profiles?.email ?? '—'}</TableCell>
              <TableCell>{member.is_admin ? 'Sí' : 'No'}</TableCell>
              <TableCell>{member.role ?? '—'}</TableCell>
              <TableCell>{member.profiles?.phone ?? '—'}</TableCell>

              <TableCell>
                {new Date(member.created_at).toLocaleString('es-VE', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>

              <TableCell>
                {member.updated_at
                  ? new Date(member.updated_at).toLocaleString('es-VE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : '—'}
              </TableCell>

              <TableCell className="relative w-0 p-0">
                <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-2 group-hover:flex">
                  <EditMember memberId={member.id} />
                  <DeleteMember memberId={member.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MiembrosPage
