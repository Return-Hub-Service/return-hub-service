"use client";

import Card from "@/src/components/Card";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Return Hub</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Schedule a Pickup"
            actions={<Button variant="filled">Get Started</Button>}
          >
            Easily schedule a return pickup at your convenience.
          </Card>

          <Card
            title="Track Returns"
            actions={<Button variant="filled">View Returns</Button>}
          >
            Monitor the status of all your returns in one place.
          </Card>

          <Card
            title="Help & Support"
            actions={<Button variant="outline">Learn More</Button>}
          >
            Get assistance with your returns and find answers to common
            questions.
          </Card>
        </div>
      </div>
    </div>
  );
}
