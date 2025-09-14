import { Button } from "@/components/ui/button";
import React from "react";

function Spinner() {
  return (
    <span
      className="inline-block w-5 h-5 border-2 border-t-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-2 align-middle"
      aria-label="Cargando"
    />
  );
}

interface SubmitButtonProps {
  loading: boolean;
  text: string;
  error: string | null;
}

export default function SubmitButton({
  text,
  loading,
  error,
}: SubmitButtonProps) {
  return (
    <>
      <Button
        type="submit"
        className="w-full bg-purple-400 hover:bg-purple-500"
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          text
        )}
      </Button>
      {error && <p className="text-red-500 text-center text=xs">{error}</p>}
    </>
  );
}
