import { Skeleton } from '@/components/ui/skeleton'

export function OrganizationSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl rounded-xl bg-white p-10 shadow-md">
        {/* Título */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Descripción (textarea) */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>

          {/* Botón Guardar */}
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  )
}
