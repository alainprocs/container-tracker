"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrackingResult } from "@/components/tracking-result"
import { trackContainer } from "@/lib/api"

// Container number validation schema
const containerSchema = z.string().regex(/^[A-Z]{3}U[0-9]{7}$/, "Invalid container number format. Example: ABCU1234567")

export default function ContainerTracker() {
  const [containerNumber, setContainerNumber] = useState("")
  const [validationError, setValidationError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const {
    data: trackingData,
    error,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["containerTracking", containerNumber],
    queryFn: () => trackContainer(containerNumber),
    enabled: false,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const handleSearch = async () => {
    try {
      // Validate container number
      containerSchema.parse(containerNumber)
      setValidationError("")
      setIsSearching(true)
      await refetch()
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message)
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleClear = () => {
    setContainerNumber("")
    setValidationError("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Track Container</CardTitle>
          <CardDescription>Enter a container number to track its current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Input
                  placeholder="Container number (e.g., ABCU1234567)"
                  value={containerNumber}
                  onChange={(e) => setContainerNumber(e.target.value.toUpperCase())}
                  className="flex-1"
                  maxLength={11}
                />
                <Button variant="outline" onClick={handleClear} disabled={!containerNumber}>
                  Clear
                </Button>
                <Button onClick={handleSearch} disabled={isLoading || !containerNumber}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    "Track"
                  )}
                </Button>
              </div>
              {validationError && <p className="text-sm text-destructive">{validationError}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Enter a valid container number in the format ABCU1234567
        </CardFooter>
      </Card>

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to track container. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {trackingData && <TrackingResult data={trackingData} />}
    </div>
  )
}