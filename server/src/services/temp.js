const jobDescription = `Company: FinFlow Technologies
Role: Senior Full Stack Engineer
Location: Bengaluru, India (Hybrid)

About the Role:
We are looking for a Senior Full Stack Engineer to join our Payments & Infrastructure team. You will own end-to-end development of our merchant-facing dashboard and backend services that process millions of transactions daily.

Responsibilities:
- Design and build scalable REST and GraphQL APIs using Node.js
- Develop performant React frontends with a focus on UX and accessibility
- Architect and maintain PostgreSQL schemas and write optimized queries
- Integrate third-party payment gateways (Razorpay, Stripe)
- Set up and monitor services on AWS (EC2, RDS, S3, Lambda)
- Participate in code reviews, define engineering standards, and mentor junior developers
- Collaborate with product and design in an agile sprint cycle

Requirements:
- 4+ years of full stack development experience
- Strong proficiency in React, Node.js (Express or Fastify), and TypeScript
- Solid understanding of relational databases (PostgreSQL preferred)
- Experience with Redis for caching and job queues (BullMQ)
- Hands-on with Docker and CI/CD pipelines (GitHub Actions or similar)
- Familiarity with microservices architecture
- Exposure to payment systems or fintech domain is a strong plus
- Excellent communication and ownership mindset`;

const resumeText = `Arjun Mehta
Bengaluru, India | arjun.mehta@gmail.com | github.com/arjunmehta | linkedin.com/in/arjunmehta

EXPERIENCE

Software Engineer — Razorpay, Bengaluru (Jan 2022 – Present)
- Built and maintained internal tooling dashboard using React and TypeScript served to 200+ internal ops users
- Developed Node.js (Express) microservices for reconciliation pipelines handling ~500K daily transactions
- Wrote and optimized PostgreSQL queries, reducing report generation time by 40%
- Integrated webhook systems for payment status updates across 15+ merchant partners
- Participated in on-call rotation and resolved P1 production incidents

Software Engineer — Groww, Bengaluru (Jul 2020 – Dec 2021)
- Developed React components for the mutual funds investment flow used by 1M+ users
- Built REST APIs in Node.js for portfolio analytics and transaction history
- Worked with MongoDB for user portfolio storage; migrated critical collections to PostgreSQL
- Set up GitHub Actions pipelines for automated testing and deployment

SKILLS
Languages: JavaScript, TypeScript, Python (basic)
Frontend: React, Next.js, Tailwind CSS, Redux
Backend: Node.js, Express, REST APIs
Databases: PostgreSQL, MongoDB, basic Redis usage
DevOps: Docker, GitHub Actions, basic AWS (S3, EC2)
Tools: Git, Postman, Jira, Figma (reading designs)

EDUCATION
B.E. Computer Science — BITS Pilani (2016 – 2020) | CGPA: 8.1

PROJECTS
- OpenSplit: A React + Node.js expense splitting app with real-time updates via WebSockets (side project, 200+ GitHub stars)`;

const selfDescription = `I have around 4 years of experience as a full stack developer, mostly in the fintech space. I've been at Razorpay for about 2.5 years now, working on internal dashboards and backend services related to payment reconciliation. Before that I was at Groww where I worked on the investment platform frontend.

I'm comfortable with React and Node.js and have used TypeScript for most of my recent work. On the backend I mostly work with Express and PostgreSQL. I've used Redis a bit for caching but haven't worked deeply with job queues like BullMQ. AWS I've used S3 and EC2 for deployments but I haven't worked with Lambda much.

I haven't worked on a customer-facing payment gateway integration from scratch — at Razorpay I was on the internal tooling side rather than the core payments API team, so my exposure to Stripe or building gateway integrations is limited.

I enjoy system design and I've been reading up on microservices patterns. I'm looking to move into a role where I can take more ownership and work closer to core product. I'm also interested in improving my DevOps knowledge since I feel that's a gap in my current role.`;

module.exports = { jobDescription, resumeText, selfDescription };

const response = {
    matchScore: 80,
    technicalQuestions: [
        `question": "You've worked on reconciliation pipelines at Razorpay handling ~500K daily transactions. Can you describe a challenging aspect of ensuring data consistency in such a high-volume distributed system, and how you would approach handling idempotent operations for payment updates?",\n` +
        '      "intention": "To assess understanding of distributed systems, data consistency, idempotency, and error handling in high-volume financial transactions.",\n' +
        `      "answer": "Key points: Discuss idempotency keys (e.g., unique request IDs), transaction logs, ensuring 'exactly once' processing for critical operations. Mention eventual consistency patterns, retry mechanisms with exponential backoff, dead-letter queues, and database transaction management. Cite: Your experience at Razorpay with reconciliation pipelines and high transaction volumes."`,
        'question": "The role requires architecting and maintaining PostgreSQL schemas and writing optimized queries. Can you walk us through a scenario where you had to significantly optimize a complex PostgreSQL query or redesign a schema for performance, and what factors you considered?",\n' +
        '      "intention": "To evaluate deep PostgreSQL knowledge, performance tuning, and data modeling skills.",\n' +
        '      "answer": "Key points: Explain use of EXPLAIN ANALYZE for query profiling. Discuss index types (B-tree, GIN/GIST), partial indexes, or covering indexes. Mention query rewrites (e.g., avoiding subqueries, using JOINs effectively), denormalization vs. normalization trade-offs, partitioning for large tables, appropriate data types, and constraint usage. Cite: Your experience at Razorpay reducing report generation time by 40% and migrating MongoDB to PostgreSQL at Groww."',
        'question": "You mentioned basic Redis usage and the JD requires experience with Redis for caching and job queues (like BullMQ). How would you leverage Redis for both caching frequently accessed data (e.g., merchant configurations) and managing asynchronous tasks via job queues in a high-throughput payments system?",\n' +
        '      "intention": "To assess practical application of Redis beyond basic key-value, specifically for caching strategies and job queue architecture.",\n' +
        '      "answer": "Key points: For caching, discuss TTLs, eviction policies (e.g., LRU), cache invalidation strategies (write-through, write-behind, refresh-ahead). For job queues, explain producers pushing tasks, consumers pulling, acknowledgements, retries, delayed jobs, and dead-letter queues. Acknowledge limited direct experience with BullMQ but articulate the underlying concepts and how Redis capabilities support them."',
        'question": "The role explicitly involves integrating third-party payment gateways like Stripe or Razorpay. If you were to design a service to abstract multiple payment gateway integrations, what core components would it have, and what challenges would you anticipate in ensuring a consistent and reliable experience for merchants?",\n' +
        '      "intention": "To probe understanding of payment gateway APIs, common integration challenges (webhooks, error handling, idempotency, PCI compliance).",\n' +
        '      "answer": "Key points: Discuss a unified API interface, gateway-specific adapters, standardized webhook handling, robust retry logic for transient failures, error mapping to common internal codes, security considerations (tokenization, PCI DSS compliance awareness), and handling different payment methods. Acknowledge your self-described limited direct experience but outline a conceptual design and potential challenges like API versioning, varying data models, and asynchronous notifications."',
        `question": "As a Senior Full Stack Engineer, you'll be designing and building scalable REST and GraphQL APIs. Given your strong experience with REST APIs, how would you approach designing a new GraphQL API for a complex merchant-facing dashboard, highlighting its advantages and any potential challenges compared to REST?",\n` +
        '      "intention": "To assess understanding of GraphQL principles, schema design, and its trade-offs compared to REST, reflecting a senior engineering perspective.",\n' +
        '      "answer": "Key points: Advantages include fewer round-trips (fetching only needed data), improved frontend flexibility, strong typing with schema. Challenges include N+1 problem, caching complexities, potential for over-fetching on the backend, and learning curve. Discuss schema-first design, defining types, queries, mutations, and subscriptions. Mention tools like Apollo Server/Client and DataLoader for efficiency."',
        `question": "You've set up GitHub Actions and used Docker. How would you design a CI/CD pipeline for a Node.js microservice that integrates with AWS services (EC2, Lambda, RDS, S3) to ensure reliable deployments and rollbacks?",\n` +
        '      "intention": "To evaluate practical DevOps experience, knowledge of CI/CD best practices, and AWS deployment strategies for a microservice.",\n' +
        '      "answer": "Key points: Discuss stages like build, test (unit, integration), security scanning, containerization (Docker image build/push to ECR). For deployment, mention strategies like blue/green or canary for EC2/Lambda, using Infrastructure as Code (Terraform/CloudFormation) for provisioning AWS resources (RDS, S3 buckets), environment variables, secrets management (AWS Secrets Manager), and automated rollbacks triggered by monitoring alerts."',
        'question": "For a merchant-facing dashboard handling complex financial data, how do you ensure the React frontend is performant and provides a great user experience? What tools or techniques do you use for debugging and optimizing rendering performance?",\n' +
        '      "intention": "To assess deep React knowledge, performance optimization techniques, and UX considerations for data-intensive applications.",\n' +
        '      "answer": "Key points: Discuss memoization (React.memo, useCallback, useMemo) to prevent unnecessary re-renders, virtualized lists for large datasets, lazy loading components/code splitting, efficient state management (e.g., Redux selectors), bundle size optimization. For debugging, mention React Dev Tools Profiler, Lighthouse audits, and network tab analysis for API calls. Cite: Your experience building internal tooling dashboards and mutual funds investment flows."'
    ],
    behavioralQuestions: [
        `question": "Tell me about a time you identified a significant problem or opportunity in a project you were working on, and you took the initiative to address it, even if it wasn't explicitly assigned to you. What was the outcome?",\n` +
        '      "intention": "To evaluate proactiveness, problem-solving skills, and a strong sense of ownership and initiative.",\n' +
        `      "answer": "Structure: Use the STAR method (Situation, Task, Action, Result). Talking points: Candidate can discuss identifying a performance bottleneck (e.g., slow reports at Razorpay), proposing a solution (PostgreSQL query optimization), or recognizing a need for migration (MongoDB to PostgreSQL at Groww). Example: 'At Razorpay, I noticed report generation times were impacting internal ops. While not explicitly my task, I investigated and found specific PostgreSQL queries were inefficient. I researched and applied indexing and query rewrites, reducing generation time by 40%, which significantly improved user experience for our ops team.' Pitfalls: Blaming others, not focusing on the 'I' in initiative, exaggerating impact."`,
        `question": "In this role, you'll be working on integrating new payment gateways and potentially new technologies like GraphQL or more advanced AWS services. Describe a situation where you had to quickly learn and apply a new technology or concept to deliver on a project. How did you approach it?",\n` +
        '      "intention": "To assess adaptability, learning agility, resourcefulness, and a growth mindset.",\n' +
        `      "answer": "Structure: STAR method. Talking points: Candidate can talk about adopting TypeScript for recent work, learning React/Node.js for projects, or setting up GitHub Actions. Example: 'When we decided to adopt TypeScript for a new service at Razorpay, it was new to me. I took the initiative to go through documentation, online courses, and experimented with small projects. I then applied this knowledge to build new features, constantly seeking feedback from more experienced peers during code reviews, which helped us quickly get up to speed with best practices.' Pitfalls: Not showing a structured learning process, failing to demonstrate application of new knowledge."`,
        `question": "As a Senior Engineer, you'll be expected to collaborate closely with product and design, and potentially mentor junior developers. Describe a challenging situation where you had to communicate a complex technical limitation or a difficult technical decision to non-technical stakeholders (product/design) or guide a less experienced team member. How did you ensure effective communication and reach a successful outcome?",\n` +
        '      "intention": "To evaluate communication skills, ability to manage stakeholder expectations, collaboration, and informal leadership/mentorship potential.",\n' +
        `      "answer": "Structure: STAR method. Talking points: Candidate can discuss a trade-off discussion on the internal tooling dashboard or the mutual funds investment flow with product/design, or guiding a peer during a code review or troubleshooting. Example: 'When building a new feature for the mutual funds flow at Groww, the design team proposed a real-time analytics component that had significant performance implications. I scheduled a meeting to explain the technical complexity and potential latency issues using analogies and visual aids, presenting alternative approaches with their pros and cons. We ultimately agreed on an iterative approach, delivering core functionality first and enhancing real-time aspects later, ensuring a good user experience while managing technical debt.' Pitfalls: Using overly technical jargon, not focusing on collaboration, not demonstrating empathy or clear explanations."`,
        `question": "You've participated in on-call rotations and resolved P1 production incidents. Describe a particularly critical incident you managed. What was your role, how did you troubleshoot, and what did you learn from the experience to prevent recurrence?",\n` +
        '      "intention": "To assess resilience, problem-solving under pressure, diagnostic skills, communication during crisis, and commitment to root cause analysis.",\n' +
        `      "answer": "Structure: STAR method. Talking points: Detail a specific P1 incident (even if generic description of a payment processing error or service outage). Explain your role, diagnostic steps (checking logs, metrics, recent deployments), communication with stakeholders, resolution steps, and post-mortem actions (e.g., adding monitoring, improving alerts, implementing a code fix, improving documentation). Example: 'During an on-call shift, we had a P1 incident where our payment status update webhooks were failing for a critical merchant. My role was to diagnose. I immediately checked logs for recent errors, saw a spike in 5xx responses from the third-party partner. I initiated a rollback of a recent deployment and concurrently contacted the partner for status. The rollback stabilized the system, and further investigation revealed a breaking change in the partner's API that our service wasn't handling. We deployed a fix the next day and added proactive health checks for partner APIs.' Pitfalls: Getting lost in technical details without focusing on the 'story,' not demonstrating learning or preventative measures."`
    ],
    skillGaps: [
        'skill": "Job Queues (BullMQ/Redis advanced usage)",\n' +
        '      "severity": "High",\n' +
        `      "reason": "The job description explicitly mentions 'Experience with Redis for caching and job queues (BullMQ)'. Candidate has 'basic Redis usage' and states 'haven't worked deeply with job queues like BullMQ'. This is crucial for handling millions of transactions asynchronously."`,
        'skill": "Third-party Payment Gateway Integration (Stripe/Razorpay from scratch)",\n' +
        '      "severity": "High",\n' +
        `      "reason": "A core responsibility is to 'Integrate third-party payment gateways (Razorpay, Stripe)'. Candidate explicitly states 'haven't worked on a customer-facing payment gateway integration from scratch — my exposure to Stripe or building gateway integrations is limited'. This is a direct gap against a primary responsibility."`,
        'skill": "AWS Services (Lambda, RDS, comprehensive monitoring)",\n' +
        '      "severity": "Medium",\n' +
        `      "reason": "JD requires 'Set up and monitor services on AWS (EC2, RDS, S3, Lambda)'. Candidate has 'basic AWS (S3, EC2)' and 'haven't worked with Lambda much'. While some familiarity exists, deeper knowledge of Lambda, RDS management, and comprehensive AWS monitoring is needed."`,
        'skill": "GraphQL API Design and Implementation",\n' +
        '      "severity": "Medium",\n' +
        `      "reason": "The JD mentions 'Design and build scalable REST and GraphQL APIs'. Candidate has strong REST API experience but does not mention GraphQL in skills or experience. This is a specific requirement that needs to be addressed."`
    ],
    preparationPlan: [
        'day": 1,\n' +
        '      "focus": "Job Queues with BullMQ & Redis",\n' +
        '      "tasks": [\n' +
        '        "Read official BullMQ documentation and tutorials.",\n' +
        '        "Implement a basic Node.js application using BullMQ for background processing (e.g., email sending, data crunching) with producers, consumers, and basic error handling.",\n' +
        '        "Understand Redis data structures relevant to job queues (e.g., Lists, Sorted Sets) and concepts like Pub/Sub for worker communication."\n' +
        '      ]',
        'day": 2,\n' +
        '      "focus": "Payment Gateway Integration - Theory & Concepts",\n' +
        '      "tasks": [\n' +
        '        "Research common architectural patterns for integrating multiple payment gateways (e.g., adapter pattern, unified API layer).",\n' +
        '        "Understand concepts like idempotency keys, webhook security (signatures, replay attacks), tokenization, and basic PCI DSS compliance principles.",\n' +
        '        "Read documentation for Stripe Connect/Razorpay Partner APIs to understand merchant onboarding and transaction flows."\n' +
        '      ]',
        'day": 3,\n' +
        '      "focus": "Payment Gateway Integration - Hands-on",\n' +
        '      "tasks": [\n' +
        `        "Create a developer account with Stripe (or use Razorpay's test mode).",\n` +
        '        "Implement a simple Node.js backend to initiate a payment (e.g., creating a checkout session) and handle successful/failed payment webhooks.",\n' +
        '        "Focus on securing webhooks and verifying signatures."\n' +
        '      ]',
        'day": 4,\n' +
        '      "focus": "AWS Lambda - Basics & API Gateway",\n' +
        '      "tasks": [\n' +
        '        "Complete an AWS tutorial for deploying a simple Node.js Lambda function.",\n' +
        '        "Learn how to integrate Lambda with API Gateway for exposing serverless REST endpoints.",\n' +
        `        "Understand Lambda's event-driven model and common triggers (e.g., S3 events, DynamoDB streams)."\n` +
        '      ]',
        'day": 5,\n' +
        '      "focus": "GraphQL - Introduction",\n' +
        '      "tasks": [\n' +
        '        "Understand GraphQL Schema Definition Language (SDL), types, queries, mutations, and subscriptions.",\n' +
        '        "Build a basic GraphQL API using Apollo Server (Node.js) to serve a simple data model.",\n' +
        '        "Practice writing queries and mutations against your local GraphQL API."\n' +
        '      ]',
        'day": 6,\n' +
        '      "focus": "Advanced PostgreSQL & System Design Review",\n' +
        '      "tasks": [\n' +
        '        "Review PostgreSQL advanced indexing strategies (partial, covering, GIN/GIST) and their use cases.",\n' +
        '        "Practice optimizing complex SQL queries using EXPLAIN ANALYZE; consider partitioning large tables.",\n' +
        '        "Review microservices communication patterns (sync vs. async) and strategies for data consistency in distributed systems."\n' +
        '      ]',
        'day": 7,\n' +
        '      "focus": "CI/CD & Deployment Strategies",\n' +
        '      "tasks": [\n' +
        '        "Research Blue/Green and Canary deployment strategies; understand their benefits and drawbacks for microservices.",\n' +
        '        "Explore basic Infrastructure as Code (e.g., Terraform or CloudFormation) by provisioning a simple EC2 instance or RDS database.",\n' +
        '        "Review best practices for managing environment variables and secrets in CI/CD pipelines for AWS deployments."\n' +
        '      ]',
        'day": 8,\n' +
        '      "focus": "AWS Lambda - Advanced & Monitoring",\n' +
        '      "tasks": [\n' +
        '        "Learn about Lambda cold starts, concurrency controls, provisioned concurrency, and versioning/aliases.",\n' +
        '        "Explore AWS CloudWatch for monitoring Lambda functions (logs, metrics, alarms) and setting up dashboards for service health.",\n' +
        '        "Understand basic cost optimization for serverless architectures."\n' +
        '      ]',
        'day": 9,\n' +
        '      "focus": "GraphQL - Advanced & Client Integration",\n' +
        '      "tasks": [\n' +
        '        "Implement GraphQL subscriptions (using WebSockets) in your sample GraphQL API.",\n' +
        '        "Integrate a simple React frontend with your GraphQL API using Apollo Client or Relay, practicing queries, mutations, and subscriptions.",\n' +
        '        "Understand the N+1 problem in GraphQL and solutions like DataLoader."\n' +
        '      ]',
        'day": 10,\n' +
        '      "focus": "Behavioral Interview Prep - Ownership & Leadership",\n' +
        '      "tasks": [\n' +
        '        "Prepare specific STAR-format stories demonstrating initiative, problem-solving, and taking ownership (e.g., PostgreSQL optimization, MongoDB migration).",\n' +
        `        "Reflect on informal instances where you guided peers or improved team processes to address the 'mentoring' aspect of a senior role."\n` +
        '      ]',
        'day": 11,\n' +
        '      "focus": "Payment Gateway Integration - Edge Cases & Reconciliation",\n' +
        '      "tasks": [\n' +
        '        "Deep dive into handling refunds, chargebacks, and partial payments through a payment gateway API.",\n' +
        '        "Understand the technical challenges and processes for transaction reconciliation between your system, the gateway, and the bank.",\n' +
        '        "Consider error handling and retry mechanisms for outbound calls to payment gateways."\n' +
        '      ]',
        'day": 12,\n' +
        '      "focus": "System Design Practice & Behavioral Prep - Collaboration",\n' +
        '      "tasks": [\n' +
        '        "Work through a typical system design interview question (e.g., Design a notification system for millions of users) focusing on scalability, reliability, and fault tolerance.",\n' +
        '        "Prepare STAR stories demonstrating effective collaboration with product, design, and other engineering teams, especially in resolving technical constraints."\n' +
        '      ]',
        'day": 13,\n' +
        '      "focus": "Comprehensive Technical Review & Mock Interview",\n' +
        '      "tasks": [\n' +
        '        "Review all technical concepts, focusing on definitions, trade-offs, and practical application.",\n' +
        '        "Perform a self-mock interview covering both technical and behavioral questions; record and critique your answers for clarity, conciseness, and relevance.",\n' +
        '        "Practice explaining complex technical topics in simple terms."\n' +
        '      ]',
        'day": 14,\n' +
        '      "focus": "Final Review & Rest",\n' +
        '      "tasks": [\n' +
        '        "Quickly review key concepts, common algorithms, and data structures (if applicable).",\n' +
        '        "Review your resume and self-description to ensure you can articulate your experience and aspirations confidently.",\n' +
        '        "Prioritize rest and mental preparation for the interview."\n' +
        '      ]'
    ]
}