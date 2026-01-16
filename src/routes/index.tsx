import MultiStepForm from '@/components/multi-step-form.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div >
        <MultiStepForm />
    </div>
  )
}
