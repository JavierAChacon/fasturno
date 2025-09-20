import { Button } from '@/components/ui/button'
import React from 'react'
import Spinner from '@/components/Spinner'

interface SubmitButtonProps {
  loading: boolean
  text: string
}

export default function SubmitButton({ text, loading }: SubmitButtonProps) {
  return (
    <>
      <Button type="submit" className="w-full bg-purple-400 hover:bg-purple-500" disabled={loading}>
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          text
        )}
      </Button>
    </>
  )
}
