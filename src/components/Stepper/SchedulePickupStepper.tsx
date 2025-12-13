"use client";

import { useState } from "react";
import { Stepper, Button, Group, TextInput, Textarea } from "@mantine/core";

export default function SchedulePickupStepper() {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Select Items" description="What to return">
          <div className="py-4">
            <TextInput
              label="Item Name"
              placeholder="Enter item name"
              mb="md"
            />
            <Textarea
              label="Description"
              placeholder="Describe the item you want to return"
              minRows={3}
            />
          </div>
        </Stepper.Step>

        <Stepper.Step label="Choose Date/Time" description="Pickup schedule">
          <div className="py-4">
            <TextInput
              label="Preferred Date"
              placeholder="Select date"
              type="date"
              mb="md"
            />
            <TextInput
              label="Preferred Time"
              placeholder="Select time"
              type="time"
            />
          </div>
        </Stepper.Step>

        <Stepper.Step label="Confirm" description="Review details">
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Please review your pickup details before submitting.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="font-medium">Summary:</p>
              <ul className="mt-2 text-sm">
                <li>• Item details entered</li>
                <li>• Pickup date and time selected</li>
                <li>• Ready for confirmation</li>
              </ul>
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Completed>
          <div className="py-4">
            <p className="text-lg font-medium text-green-600">
              Pickup Scheduled! 🎉
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Your return pickup has been successfully scheduled. You will
              receive a confirmation email shortly.
            </p>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={active === 3}>
          {active === 2 ? "Submit" : "Next"}
        </Button>
      </Group>
    </div>
  );
}
