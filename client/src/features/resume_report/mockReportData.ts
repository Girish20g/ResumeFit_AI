export const mockReportData = {
  matchScore: 78,
  title: "Senior Frontend Engineer Match Analysis",
  technicalQuestions: [
    {
      question: "Can you explain the virtual DOM and how React's reconciliation algorithm works?",
      intention: "To assess deep understanding of React's core mechanics and performance implications.",
      answer: "Start by defining the Virtual DOM as a lightweight JavaScript representation of the actual DOM. Explain how React uses it to batch updates. Discuss the diffing algorithm (reconciliation) and the importance of 'keys' in lists. Avoid getting bogged down in source code specifics; focus on the conceptual 'why'."
    },
    {
      question: "How do you handle state management in a large React application?",
      intention: "To evaluate architectural decision-making and experience with complex state requirements.",
      answer: "Mention your experience with tools like Redux, Zustand, or Context API. Explain that the choice depends on the scale (e.g., Context for theme/auth, Zustand/Redux for complex shared state). Use a specific project example. Avoid saying 'I always use Redux' without justifying why."
    }
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a time you disagreed with a technical decision made by your team.",
      intention: "To gauge communication skills, conflict resolution, and ability to collaborate.",
      answer: "Use the STAR method (Situation, Task, Action, Result). Describe a specific instance where you presented evidence or data to support your alternative approach. Highlight how you reached a consensus and moved forward professionally. Avoid speaking negatively about former colleagues."
    },
    {
      question: "Describe a situation where you had to meet a tight deadline with changing requirements.",
      intention: "To understand adaptability, prioritization, and stress management.",
      answer: "Explain how you triaged tasks, communicated with stakeholders about trade-offs, and focused on delivering the MVP. Give an example of an Agile pivot. Avoid sounding flustered or blaming management for the changes."
    }
  ],
  skillGaps: [
    {
      skill: "GraphQL",
      severity: "High",
      reason: "The job description heavily emphasizes GraphQL for API integrations, but your resume only mentions REST."
    },
    {
      skill: "Docker/Containerization",
      severity: "Medium",
      reason: "Experience with Docker is listed as a 'nice to have', which is missing from your profile."
    },
    {
      skill: "Framer Motion",
      severity: "Low",
      reason: "The role involves building complex animations. While you have CSS experience, dedicated animation libraries are not listed."
    }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "GraphQL Fundamentals",
      tasks: [
        "Complete a 2-hour tutorial on GraphQL queries and mutations.",
        "Set up a basic Apollo Client in a sandbox React app.",
        "Compare GraphQL vs REST principles."
      ]
    },
    {
      day: 2,
      focus: "Advanced React Patterns",
      tasks: [
        "Review custom hooks, HOCs, and render props.",
        "Practice building a complex component using Context and useReducer.",
        "Read articles on React performance optimization (useMemo, useCallback)."
      ]
    },
    {
      day: 3,
      focus: "Mock Interviews & Behavioral Prep",
      tasks: [
        "Draft STAR stories for top 5 behavioral questions.",
        "Do a 45-minute mock technical interview with a peer or AI tool.",
        "Review your responses and refine clarity."
      ]
    }
  ]
};
