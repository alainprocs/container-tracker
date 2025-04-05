import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrackingData } from "@/lib/api"

export function TrackingResult({ data }: { data: TrackingData }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Container {data.containerNumber}</CardTitle>
            <CardDescription>Last updated: {data.lastUpdated}</CardDescription>
          </div>
          <Badge variant={data.status === "In Transit" ? "default" : "outline"}>
            {data.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Current Location</h4>
              <p className="text-sm">{data.currentLocation}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Estimated Arrival</h4>
              <p className="text-sm">{data.estimatedArrival}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Vessel</h4>
              <p className="text-sm">{data.vessel}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Destination</h4>
              <p className="text-sm">{data.destination}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Tracking History</h4>
            <div className="space-y-4">
              {data.trackingHistory.map((event, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium">{event.location}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                  </div>
                  {index < data.trackingHistory.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}