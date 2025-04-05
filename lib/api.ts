// Types for tracking data
export interface TrackingEvent {
  timestamp: string
  location: string
  description: string
}

export interface TrackingData {
  containerNumber: string
  status: string
  currentLocation: string
  lastUpdated: string
  estimatedArrival: string
  vessel: string
  destination: string
  trackingHistory: TrackingEvent[]
}

// Helper function to generate a random date within a range
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

// Helper function to generate a random time
function randomTime(): string {
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0')
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0')
  return `${hours}:${minutes}`
}

// Mock API function to track a container
export async function trackContainer(containerNumber: string): Promise<TrackingData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Validate container number format
  if (!/^[A-Z]{3}U[0-9]{7}$/.test(containerNumber)) {
    throw new Error("Invalid container number format")
  }
  
  // Simulate API error for specific container numbers (for testing)
  if (containerNumber === "TESUERROR") {
    throw new Error("Container not found in our system")
  }
  
  // Generate random tracking data
  const now = new Date()
  const twoMonthsAgo = new Date(now)
  twoMonthsAgo.setMonth(now.getMonth() - 2)
  
  const oneMonthFromNow = new Date(now)
  oneMonthFromNow.setMonth(now.getMonth() + 1)
  
  // Generate random tracking history
  const historyCount = 3 + Math.floor(Math.random() * 5) // 3-7 events
  const trackingHistory: TrackingEvent[] = []
  
  const ports = [
    "Shanghai, China",
    "Singapore",
    "Rotterdam, Netherlands",
    "Antwerp, Belgium",
    "Los Angeles, USA",
    "New York, USA",
    "Hamburg, Germany",
    "Busan, South Korea",
    "Hong Kong, China",
    "Dubai, UAE"
  ]
  
  const vessels = [
    "MSC Oscar",
    "OOCL Hong Kong",
    "CMA CGM Antoine de Saint Exupery",
    "Maersk Mc-Kinney Moller",
    "Ever Golden",
    "HMM Algeciras",
    "MOL Triumph"
  ]
  
  const vessel = vessels[Math.floor(Math.random() * vessels.length)]
  
  // Create events from oldest to newest
  for (let i = 0; i < historyCount; i++) {
    const eventDate = new Date(twoMonthsAgo)
    eventDate.setDate(twoMonthsAgo.getDate() + Math.floor((now.getTime() - twoMonthsAgo.getTime()) / (historyCount + 1) * i) / (1000 * 60 * 60 * 24))
    
    const port = ports[Math.floor(Math.random() * ports.length)]
    
    let description = ""
    if (i === 0) {
      description = "Container loaded onto vessel"
    } else if (i === historyCount - 1) {
      description = "Container arrived at port"
    } else {
      const events = [
        "Container discharged from vessel",
        "Container loaded onto vessel",
        "Container in transit",
        "Container cleared customs",
        "Container departed from port"
      ]
      description = events[Math.floor(Math.random() * events.length)]
    }
    
    trackingHistory.push({
      timestamp: `${randomDate(eventDate, eventDate)} ${randomTime()}`,
      location: port,
      description
    })
  }
  
  // Sort history by timestamp (oldest first)
  trackingHistory.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  })
  
  // Determine current status
  const statuses = ["In Transit", "At Port", "Customs Hold", "Delivered"]
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
  
  // Current location is the location of the most recent event
  const currentLocation = trackingHistory[trackingHistory.length - 1].location
  
  // Random destination that's different from current location
  let destination
  do {
    destination = ports[Math.floor(Math.random() * ports.length)]
  } while (destination === currentLocation)
  
  return {
    containerNumber,
    status: randomStatus,
    currentLocation,
    lastUpdated: `${randomDate(new Date(now.setDate(now.getDate() - 2)), now)} ${randomTime()}`,
    estimatedArrival: randomDate(now, oneMonthFromNow),
    vessel,
    destination,
    trackingHistory
  }
}