export interface TrackingData {
  containerNumber: string
  status: string
  lastUpdated: string
  currentLocation: {
    port: string
    country: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  estimatedArrival: string | null
  vessel: {
    name: string
    imo: string
  } | null
  cargoType: string | null
  trackingHistory: Array<{
    timestamp: string
    location: string
    description: string
  }>
}

// Mock API function - in a real app, this would call actual tracking APIs
export async function trackContainer(containerNumber: string): Promise<TrackingData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real implementation, this would call multiple APIs and handle failures
  // For demo purposes, we're returning mock data

  // Randomly fail sometimes to demonstrate error handling
  if (Math.random() < 0.1) {
    throw new Error("API request failed. Please try again.")
  }

  // Generate mock data based on container number
  return {
    containerNumber,
    status: getRandomStatus(),
    lastUpdated: new Date().toISOString(),
    currentLocation: {
      port: getRandomPort(),
      country: getRandomCountry(),
      coordinates: {
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
      },
    },
    estimatedArrival: getFutureDate(Math.floor(Math.random() * 30) + 1),
    vessel: {
      name: getRandomVesselName(),
      imo: `${Math.floor(Math.random() * 10000000) + 1000000}`,
    },
    cargoType: getRandomCargoType(),
    trackingHistory: generateTrackingHistory(),
  }
}

// Helper functions to generate mock data
function getRandomStatus() {
  const statuses = ["In Transit", "Customs", "Delivered", "Delayed", "Loading"]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

function getRandomPort() {
  const ports = ["Rotterdam", "Singapore", "Shanghai", "Los Angeles", "Hamburg", "Busan", "Antwerp", "New York"]
  return ports[Math.floor(Math.random() * ports.length)]
}

function getRandomCountry() {
  const countries = ["Netherlands", "Singapore", "China", "USA", "Germany", "South Korea", "Belgium", "USA"]
  return countries[Math.floor(Math.random() * countries.length)]
}

function getRandomVesselName() {
  const prefixes = ["MSC", "MAERSK", "CMA CGM", "COSCO", "EVERGREEN", "OOCL"]
  const names = ["ANTARES", "BEIJING", "COLUMBUS", "DESTINY", "EXPLORER", "FORTUNE", "GLORY", "HORIZON"]
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${names[Math.floor(Math.random() * names.length)]}`
}

function getRandomCargoType() {
  const types = ["General Cargo", "Dry Bulk", "Liquid Bulk", "Refrigerated Goods", "Hazardous Materials", null]
  return types[Math.floor(Math.random() * types.length)]
}

function getFutureDate(daysAhead: number) {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  return date.toISOString()
}

function generateTrackingHistory() {
  const history = []
  const now = new Date()

  // Generate 3-6 random events
  const eventCount = Math.floor(Math.random() * 4) + 3

  for (let i = 0; i < eventCount; i++) {
    const daysAgo = eventCount - i
    const date = new Date()
    date.setDate(now.getDate() - daysAgo)

    history.push({
      timestamp: date.toISOString(),
      location: getRandomPort() + ", " + getRandomCountry(),
      description: getRandomEvent(i, eventCount),
    })
  }

  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

function getRandomEvent(index: number, total: number) {
  if (index === 0) {
    return "Container departed from origin port"
  } else if (index === total - 1) {
    return "Container arrived at current location"
  } else {
    const events = [
      "Container loaded onto vessel",
      "Container discharged from vessel",
      "Container cleared customs",
      "Container in transit to next port",
      "Container undergoing inspection",
      "Container transferred to another vessel",
    ]
    return events[Math.floor(Math.random() * events.length)]
  }
}

// In a real implementation, we would have functions to call multiple APIs
// For example:
/*
async function tryMultipleAPIs(containerNumber: string) {
  try {
    return await callPrimaryAPI(containerNumber)
  } catch (error) {
    console.log("Primary API failed, trying secondary API")
    try {
      return await callSecondaryAPI(containerNumber)
    } catch (secondError) {
      console.log("Secondary API failed, trying tertiary API")
      return await callTertiaryAPI(containerNumber)
    }
  }
}
*/