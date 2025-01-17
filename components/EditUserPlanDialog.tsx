import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface EditUserPlanDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (plan: string, billingCycle: string) => void
  currentPlan: string
  currentBillingCycle: string
}

export function EditUserPlanDialog({
  isOpen,
  onClose,
  onSubmit,
  currentPlan,
  currentBillingCycle
}: EditUserPlanDialogProps) {
  const [plan, setPlan] = React.useState(currentPlan)
  const [billingCycle, setBillingCycle] = React.useState(currentBillingCycle)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(plan, billingCycle)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Plan</DialogTitle>
          <DialogDescription>
            Update the user's subscription plan and billing cycle.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan">Subscription Plan</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingCycle">Billing Cycle</Label>
            <Select value={billingCycle} onValueChange={setBillingCycle}>
              <SelectTrigger>
                <SelectValue placeholder="Select billing cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15days">15 Days</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Update Plan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

