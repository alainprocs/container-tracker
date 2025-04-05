import ContainerTracker from "@/components/container-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Container Tracker</h1>
          <p className="text-muted-foreground">Track your shipping containers with real-time updates</p>
        </div>
        <ContainerTracker />
      </div>
    </main>
  )
}