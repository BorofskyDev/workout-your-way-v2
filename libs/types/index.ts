// libs/types.ts



export interface Option {
  value: string
  label: string
}

export interface PhaseTemplate {
  phaseName: string
  applicableWeeks: number[]
  days: {
    day: string // e.g., "Day 1"
    routine: Option | null
  }[]
}

export interface Program {
  name: string
  numberOfWeeks: number
  numberOfPhases: number
  description: string
  phases: PhaseTemplate[]
  ownerId: string
}

