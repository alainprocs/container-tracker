import { CalendarClock, MapPin, Ship, Package } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { TrackingData } from "@/lib/api"

interface TrackingResultProps {
  data: TrackingData
}

export function TrackingResult({ data }: TrackingResultProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Container {data.containerNumber}</CardTitle>
            <CardDescription>Last updated: {new Date(data.lastUpdated).toLocaleString()}</CardDescription>
          </div>
          <Badge variant={getStatusVariant(data.status)}>{data.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Current Location</h3>
                <p>
                  {data.currentLocation.port}, {data.currentLocation.country}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CalendarClock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Estimated Arrival</h3>
                <p>{data.estimatedArrival ? new Date(data.estimatedArrival).toLocaleDateString() : "Not available"}</p>
                {data.estimatedArrival && (
                  <p className="text-sm text-muted-foreground">{getTimeRemaining(data.estimatedArrival)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Ship className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Vessel Details</h3>
                {data.vessel ? (
                  <>
                    <p>{data.vessel.name}</p>
                    <p className="text-sm text-muted-foreground">IMO: {data.vessel.imo}</p>
                  </>
                ) : (
                  <p>Not available</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Cargo Details</h3>
                <p>{data.cargoType || "Not available"}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Tracking History</h3>
          <div className="space-y-3">
            {data.trackingHistory.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-full border">
                  <div className={`h-2 w-2 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{event.location}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "in transit":
      return "default"
    case "delivered":
      return "success"
    case "delayed":
      return "destructive"
    case "customs":
      return "warning"
    default:
      return "secondary"
  }
}

function getTimeRemaining(dateString: string) {
  const estimatedDate = new Date(dateString)
  const now = new Date()
  const diffTime = estimatedDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return "Arrived"
  if (diffDays === 0) return "Arriving today"
  if (diffDays === 1) return "Arriving tomorrow"
  return `${diffDays} days remaining`
}