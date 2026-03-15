import {
  createElement,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react'
import './App.css'

const INSIGHTS_URL =
  import.meta.env.VITE_INSIGHTS_URL ?? 'https://unihackjira.vercel.app'
const ORCHESTRA_URL =
  import.meta.env.VITE_ORCHESTRA_URL ?? 'https://commit4commit-vscode-clone.vercel.app'
const WAITLIST_API_URL = import.meta.env.VITE_WAITLIST_API_URL ?? ''

const problemStats = [
  {
    number: '40%',
    label: 'of engineering manager time is coordination, not strategy',
  },
  {
    number: '68%',
    label: 'average sprint delivery rate. Teams miss 1 in 3 commitments',
  },
  {
    number: '2.4d',
    label: "average time a blocker sits undiscovered before it's flagged",
  },
  {
    number: '23%',
    label: 'of engineering rework comes from misallocated tasks',
  },
]

const capabilityChips = [
  '✳ SELF-LEARNING',
  '✳ BIAS-FREE ALLOCATION',
  '✳ REAL-TIME TRANSLATION',
]

const teamMembers = [
  {
    name: 'Alex',
    role: 'Frontend',
    tag: 'FRONTEND',
    color: '#2563eb',
    status: 'READY',
    task: 'Build login UI components',
    reportColor: '#059669',
    reporterProgress: '80% COMPLETE',
    reporterState: 'GREEN',
    dashboardStatus: 'GREEN',
    dashboardMeta: '71%',
    x: 86,
    y: 312,
    mobileX: 140,
    mobileY: 210,
  },
  {
    name: 'Sam',
    role: 'Backend',
    tag: 'BACKEND',
    color: '#7c3aed',
    status: 'READY',
    task: 'Session endpoint logic',
    reportColor: '#059669',
    reporterProgress: '75% COMPLETE',
    reporterState: 'GREEN',
    dashboardStatus: 'GREEN',
    dashboardMeta: '75%',
    x: 196,
    y: 312,
    mobileX: 360,
    mobileY: 210,
  },
  {
    name: 'Jordan',
    role: 'Auth',
    tag: 'AUTH',
    color: '#d97706',
    status: 'READY',
    task: 'OAuth2 flow implementation',
    reportColor: '#d97706',
    reporterProgress: '45% COMPLETE',
    reporterState: 'BLOCKED',
    dashboardStatus: 'BLOCKED',
    dashboardMeta: '45%',
    x: 306,
    y: 312,
    mobileX: 580,
    mobileY: 210,
  },
  {
    name: 'Casey',
    role: 'Database',
    tag: 'DATABASE',
    color: '#059669',
    status: 'READY',
    task: 'Session storage schema',
    reportColor: '#dc2626',
    reporterProgress: '30% COMPLETE',
    reporterState: 'AT RISK',
    dashboardStatus: 'AT RISK',
    dashboardMeta: '30%',
    x: 416,
    y: 312,
    mobileX: 140,
    mobileY: 330,
  },
  {
    name: 'Morgan',
    role: 'Testing',
    tag: 'TESTING',
    color: '#dc2626',
    status: 'READY',
    task: 'Auth integration tests',
    reportColor: '#2563eb',
    reporterProgress: 'READY',
    reporterState: 'WAITING',
    dashboardStatus: 'READY',
    dashboardMeta: '93%',
    x: 526,
    y: 312,
    mobileX: 360,
    mobileY: 330,
  },
  {
    name: 'Riley',
    role: 'DevOps',
    tag: 'DEVOPS',
    color: '#0891b2',
    status: 'READY',
    task: 'Deploy auth service',
    reportColor: '#059669',
    reporterProgress: 'READY',
    reporterState: 'WAITING',
    dashboardStatus: 'GREEN',
    dashboardMeta: '99.97%',
    x: 636,
    y: 312,
    mobileX: 580,
    mobileY: 330,
  },
]

const demoSteps = [
  {
    shortLabel: 'THE TEAM',
    title: 'The team. The roles. Decided once.',
    body: 'The manager sets up their engineering team in Orchestra Insights. Each developer is assigned a role. Orchestra remembers this forever — every future decision is based on it.',
  },
  {
    shortLabel: 'PRD UPLOAD',
    title: 'The manager feeds the PRD into Insights.',
    body: 'One document. The full product requirements. Orchestra Insights ingests it and immediately starts breaking it down into work.',
  },
  {
    shortLabel: 'BREAKDOWN',
    title: 'The PRD is broken down into executable tasks automatically.',
    body: "Big Boss Agent reads every requirement and converts it into structured, assignable tasks — each one matched to a specific developer's capabilities.",
  },
  {
    shortLabel: 'DISTRIBUTION',
    title: 'Tasks are sent to each developer via the VS Code plugin.',
    body: 'The Product Task Manager Agent matches every task to the right developer based on their role and capabilities. Tasks arrive directly inside their VS Code — no Slack message, no meeting invite.',
  },
  {
    shortLabel: 'AGENT SCANS',
    title: 'The dev makes a commit. The agent reads it.',
    body: 'Every time a developer commits code, the agent scans the commit message and the code diff. It understands what changed, what it means, and how much progress was made.',
  },
  {
    shortLabel: 'REPORTER',
    title: 'The manager asks. The Reporter Agent answers.',
    body: 'The manager asks the Reporter Agent directly about developer progress. The agent pulls real-time data from every individual agent — commit history, task completion, blockers — and translates it into plain English.',
  },
  {
    shortLabel: 'INSIGHTS',
    title: 'Everything the manager needs. One screen.',
    body: 'Orchestra Insights updates in real time. Sprint health, developer progress, active blockers — all translated from code into plain English. No technical knowledge required.',
    detail: 'step7-ctas',
  },
]

const breakdownRequirements = [
  {
    label: 'REQ 01 · JWT Authentication Flow',
    subtasks: ['Implement JWT', 'Refresh rotation', 'Session storage'],
  },
  {
    label: 'REQ 02 · OAuth Google Login',
    subtasks: ['OAuth callback', 'Provider exchange'],
  },
  {
    label: 'REQ 03 · Session Persistence',
    subtasks: ['Redis cache', 'Cookie renewal'],
  },
  {
    label: 'REQ 04 · Password Reset',
    subtasks: ['Token mailer', 'Reset route'],
  },
  {
    label: 'REQ 05 · Role-Based Access',
    subtasks: ['Permission middleware', 'Role model'],
  },
  {
    label: 'REQ 06 · Audit Logging',
    subtasks: ['Event logger', 'Log schema'],
  },
]

const srsStatusLines = [
  '> Reading requirements_v2.pdf...',
  '> Identified 6 feature requirements',
  '> Checking team capacity...',
  '> Sprint 2 has 82% capacity available',
  '> FEASIBILITY: CONFIRMED ✓',
  '> Breaking down into executable tasks...',
]

const commitTerminalLines = [
  '$ git add auth/useAuth.js',
  '$ git commit -m "implement JWT refresh token rotation"',
  '[sprint-2 a4f3d2c] implement JWT refresh token rotation',
  ' 2 files changed, 47 insertions(+), 12 deletions(-)',
]

const agentScanLines = [
  '> Commit: "implement JWT refresh token rotation"',
  '> Files changed: auth/useAuth.js, auth/api.js',
  '> Lines added: 47  Lines removed: 12',
  '> Function detected: refreshToken()',
  '> Task match: "Implement JWT" ✓',
  '> Progress update: 65% → 80%',
  '> Blocker status: NONE',
  '> Sending report to Insights...',
]

const reporterSummary =
  "Sprint 2 is at 68%. Jordan is blocked by Casey's database schema. Casey estimates completion tomorrow. If that holds — you hit the deadline."

const reporterBars = [
  {
    label: 'Sprint 1',
    value: '100%',
    state: 'COMPLETE',
    className: 'is-complete',
  },
  {
    label: 'Sprint 2',
    value: '68%',
    state: 'IN PROGRESS',
    className: 'is-live',
  },
]

const insightsTiles = [
  ['FEATURES ON TRACK', '12'],
  ['SPRINT HEALTH', '68%'],
  ['UPTIME', '99.97%'],
  ['INCIDENTS', '01'],
]

const insightsCallouts = [
  {
    chip: '✳ BIG BOSS CHAT',
    text: 'Plain English Q&A about your entire engineering team. Ask anything. Get honest answers. Powered by Claude.',
  },
  {
    chip: '✳ SRS UPLOAD',
    text: 'Upload your requirements doc. Tasks are created and distributed automatically within 60 seconds.',
  },
  {
    chip: '✳ DEV PROFILES',
    text: "Every developer's status, sprint progress, and blocker state visible without asking anyone.",
  },
  {
    chip: '✳ HONEST CAPACITY',
    text: 'Ask if a feature is achievable. Get a yes or a no with the data to back it up.',
  },
]

const developerTabs = [
  {
    id: 'chat',
    label: 'ORCHESTRA CHAT',
    description:
      'Role-scoped AI assistant. Knows your files. Powered by Claude. Gives you the answer for your specific code, not a generic response.',
  },
  {
    id: 'dashboard',
    label: 'DEV DASHBOARD',
    description:
      "Your sprint at a glance. Task load, code activity, workload ring, blockers. The information you need without the meeting you don't.",
  },
  {
    id: 'tasks',
    label: 'TASK LIST',
    description:
      'Your inbox from the manager. Tasks created from the SRS or Boss Chat, distributed to you automatically based on your role and capacity.',
  },
]

const advantages = [
  {
    number: '01',
    title: 'SELF-LEARNING PER-DEV MODELS',
    body: 'Every sprint, Orchestra learns more about how each developer works. Peak hours, estimate accuracy, blocker tendency, technology strengths. The longer it runs, the smarter it gets and the more accurate every future sprint becomes.',
  },
  {
    number: '02',
    title: 'BIAS-FREE PRECISION ALLOCATION',
    body: 'Tasks are matched to developers based on objective performance data, not who speaks up in the meeting or who the manager likes. The right task goes to the right person every time, with measurable improvement sprint over sprint.',
  },
  {
    number: '03',
    title: 'THE TRANSLATION LAYER',
    body: "Manager speaks English in. Developer gets a technical task. Code comes out the other end. Business insights come back to the manager. Nobody needs to learn the other person's language. Orchestra speaks both.",
  },
  {
    number: '04',
    title: 'HONEST CAPACITY PLANNING',
    body: 'When the manager asks for too much, the system says no with data. Not filtered by a nervous PM. Not softened by a people-pleasing engineer. The truth, backed by six months of team velocity history.',
  },
  {
    number: '05',
    title: 'AUTONOMOUS DEADLINE ENFORCEMENT',
    body: "Agents don't just track. They intervene. Roadblocker devs are flagged. Overloaded devs are rebalanced. Blockers are surfaced before they become emergencies. The system manages the delivery so you don't have to.",
  },
  {
    number: '06',
    title: 'HR-GRADE PERFORMANCE INTELLIGENCE',
    body: "Every developer's behavioral profile is downloadable. Objective. Code-grounded. Bias-free. Useful for performance reviews, promotions, PIPs, and hiring decisions without a manager's opinion in the middle.",
  },
]

const audienceCards = [
  {
    eyebrow: '✳ ORCHESTRA INSIGHTS',
    title: 'THE MANAGER',
    body: [
      "The non-technical founder who hired engineers but can't tell if they're working or not.",
      'The CTO managing 4 teams across 3 timezones who only gets filtered information.',
      'The engineering manager drowning in standups, PRs, and status updates that should be automated.',
    ],
    cta: 'OPEN INSIGHTS PREVIEW →',
    action: 'insights',
  },
  {
    eyebrow: '✳ ORCHESTRA',
    title: 'THE DEVELOPER',
    body: [
      "The senior engineer whose mornings are eaten by planning meetings they didn't need to attend.",
      'The dev who wants a coding assistant that knows their actual codebase, not a generic one.',
      'The developer who wants to know what to work on next without waiting for a standup.',
    ],
    cta: 'OPEN VS CODE PREVIEW →',
    action: 'orchestra',
  },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function useScrollReveal({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return [ref, isVisible]
}

function RevealItem({
  as = 'div',
  className = '',
  delay = 0,
  threshold,
  once = true,
  style,
  children,
  ...props
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, once })

  return createElement(
    as,
    {
      ref,
      className: cx(className, isVisible && 'visible'),
      style: { ...style, transitionDelay: `${delay}ms` },
      ...props,
    },
    children,
  )
}

function SectionNumber({ children }) {
  return <p className="section-num">{children}</p>
}

function ArrowRightIcon({ size = 16 }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  )
}

function ExternalLinkIcon({ size = 14 }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 5h5v5" />
      <path d="m10 14 9-9" />
      <path d="M19 14v5H5V5h5" />
    </svg>
  )
}

function AgentNode({ name, role, className = '', icon = '✳' }) {
  return (
    <div className={cx('agent-node', className)}>
      <span className="agent-node-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="agent-node-name">{name}</span>
      <span className="agent-node-role">{role}</span>
    </div>
  )
}

function AgentDiagram() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.25 })

  return (
    <div ref={ref} className={cx('agent-diagram', isVisible && 'is-active')}>
      <div className="diagram-stage">
        <svg
          className="diagram-connections"
          viewBox="0 0 1100 580"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="distribute-line" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="report-line" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="1" />
            </linearGradient>
          </defs>

          <path
            className="diagram-path diagram-path--tier2"
            d="M550 132 L370 220"
            style={{ '--path-length': 230, '--path-delay': '300ms' }}
          />
          <path
            className="diagram-path diagram-path--tier2"
            d="M550 132 L730 220"
            style={{ '--path-length': 230, '--path-delay': '420ms' }}
          />
          <path
            className="diagram-path diagram-path--workers"
            d="M338 280 L185 420"
            style={{ '--path-length': 230, '--path-delay': '900ms' }}
          />
          <path
            className="diagram-path diagram-path--workers"
            d="M370 280 L405 420"
            style={{ '--path-length': 170, '--path-delay': '1000ms' }}
          />
          <path
            className="diagram-path diagram-path--workers"
            d="M730 280 L625 420"
            style={{ '--path-length': 210, '--path-delay': '1100ms' }}
          />
          <path
            className="diagram-path diagram-path--workers"
            d="M730 280 L845 420"
            style={{ '--path-length': 210, '--path-delay': '1200ms' }}
          />
          <path
            className="diagram-path diagram-path--report"
            d="M185 420 L698 280"
            style={{ '--path-length': 560, '--path-delay': '900ms' }}
          />
          <path
            className="diagram-path diagram-path--report"
            d="M405 420 L698 280"
            style={{ '--path-length': 360, '--path-delay': '980ms' }}
          />
          <path
            className="diagram-path diagram-path--report"
            d="M625 420 L762 280"
            style={{ '--path-length': 210, '--path-delay': '1060ms' }}
          />
          <path
            className="diagram-path diagram-path--report"
            d="M845 420 L762 280"
            style={{ '--path-length': 200, '--path-delay': '1140ms' }}
          />

          <text className="diagram-label" x="423" y="168">
            TASK DISTRIBUTION
          </text>
          <text className="diagram-label" x="610" y="168">
            PROGRESS QUERY
          </text>
          <text className="diagram-label" x="556" y="334">
            LIVE STATUS
          </text>

          <g className="signal-layer signal-layer--purple">
            <circle className="diagram-signal diagram-signal--purple" r="4">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M550 132 L370 220" />
            </circle>
            <circle className="diagram-signal diagram-signal--purple" r="4">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M550 132 L730 220" />
            </circle>
            <circle className="diagram-signal diagram-signal--purple" r="4">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M338 280 L185 420" />
            </circle>
            <circle className="diagram-signal diagram-signal--purple" r="4">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M370 280 L405 420" />
            </circle>
            <circle className="diagram-signal diagram-signal--purple" r="4">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M730 280 L625 420" />
            </circle>
            <circle className="diagram-signal diagram-signal--purple" r="4">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M730 280 L845 420" />
            </circle>
          </g>

          <g className="signal-layer signal-layer--blue">
            <circle className="diagram-signal diagram-signal--blue" r="4">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M185 420 L698 280" />
            </circle>
            <circle className="diagram-signal diagram-signal--blue" r="4">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M405 420 L698 280" />
            </circle>
            <circle className="diagram-signal diagram-signal--blue" r="4">
              <animateMotion dur="1.9s" repeatCount="indefinite" path="M625 420 L762 280" />
            </circle>
            <circle className="diagram-signal diagram-signal--blue" r="4">
              <animateMotion dur="2.3s" repeatCount="indefinite" path="M845 420 L762 280" />
            </circle>
          </g>
        </svg>

        <AgentNode
          className="agent-node--boss"
          name="BIG BOSS AGENT"
          role="SCOPE ANALYSIS / ORCHESTRATION"
        />
        <AgentNode
          className="agent-node--manager"
          name="PRODUCT TASK MANAGER"
          role="BREAKDOWN / DISTRIBUTION"
        />
        <AgentNode
          className="agent-node--reporter"
          name="REPORTER AGENT"
          role="SYNTHESIS / TRANSLATION"
        />
        <AgentNode
          className="agent-node--frontend"
          name="FRONTEND AGENT"
          role="UI / DELIVERY"
        />
        <AgentNode
          className="agent-node--backend"
          name="BACKEND AGENT"
          role="SERVICES / LOGIC"
        />
        <AgentNode className="agent-node--auth" name="AUTH AGENT" role="IDENTITY / ACCESS" />
        <AgentNode
          className="agent-node--database"
          name="DATABASE AGENT"
          role="MODELS / STATE"
        />
      </div>

      <div className="capability-row">
        {capabilityChips.map((chip, index) => (
          <div
            key={chip}
            className="capability-chip"
            style={{ transitionDelay: `${2000 + index * 120}ms` }}
          >
            {chip}
          </div>
        ))}
      </div>
    </div>
  )
}

function FileTextIcon({ size = 32, color = '#444444' }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16l7-3 7 3V9Z" />
      <path d="M14 2v7h7" />
      <path d="M9 12h6" />
      <path d="M9 15h6" />
    </svg>
  )
}

function CheckCircleIcon({ size = 14, color = '#059669' }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.3 2.2 2.2 4.8-5.1" />
    </svg>
  )
}

function useTypewriterText(text, { speed = 30, delay = 0 } = {}) {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    let timeoutId
    let intervalId
    let index = 0

    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1
        setTypedText(text.slice(0, index))

        if (index >= text.length) {
          window.clearInterval(intervalId)
        }
      }, speed)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [delay, speed, text])

  return typedText
}

function useIsMobileLayout(maxWidth = 767) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= maxWidth : false,
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= maxWidth)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [maxWidth])

  return isMobile
}

function DemoStepDetail({ stepIndex, openPreview }) {
  if (demoSteps[stepIndex].detail !== 'step7-ctas') {
    return null
  }

  return (
    <div className="step7-ctas">
      <button type="button" className="s7-btn-primary" onClick={() => openPreview(INSIGHTS_URL)}>
        OPEN INSIGHTS PREVIEW →
      </button>
      <button type="button" className="s7-btn-secondary" onClick={() => openPreview(ORCHESTRA_URL)}>
        OPEN VS CODE PREVIEW →
      </button>
    </div>
  )
}

function TeamSetupVisual() {
  return (
    <div className="demo-visual demo-visual--team">
      <div className="demo-team-grid">
        {teamMembers.map((developer, index) => (
          <div
            key={developer.name}
            className="demo-team-card"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="demo-team-card-top">
              <div className="demo-team-avatar" style={{ background: developer.color }}>
                {developer.name[0]}
              </div>
              <div className="demo-team-copy">
                <strong>{developer.name}</strong>
                <span>{developer.role}</span>
              </div>
            </div>
            <div className="demo-team-card-bottom">
              <span className="demo-team-role-chip">{developer.tag}</span>
              <span className="demo-team-status">READY</span>
            </div>
          </div>
        ))}
      </div>
      <div className="demo-team-meta">
        1 AGENT PER DEVELOPER · ROLE-SCOPED · SELF-LEARNING
      </div>
    </div>
  )
}

function SrsUploadVisual({ uploadState, uploadProgress, onTriggerUpload }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (uploadState !== 'uploaded') {
      return undefined
    }

    const timers = srsStatusLines.map((_, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), index * 400),
    )

    return () => timers.forEach((timerId) => window.clearTimeout(timerId))
  }, [uploadState])

  return (
    <div className="demo-visual demo-visual--upload">
      <div className="prd-upload-stage">
        {uploadState !== 'uploaded' ? (
          <div className={cx('prd-doc-card', uploadState === 'uploading' && 'is-uploading')}>
            <FileTextIcon size={40} color="#444444" />
            <span className="prd-doc-name">requirements_v2.pdf</span>
            <span className="prd-doc-meta">2.4 MB · PDF</span>
          </div>
        ) : (
          <div className="prd-absorbed">
            <CheckCircleIcon size={16} color="#059669" />
            <span>ABSORBED</span>
          </div>
        )}

        {uploadState === 'idle' && (
          <button type="button" className="upload-trigger-btn" onClick={onTriggerUpload}>
            CLICK TO UPLOAD
          </button>
        )}

        {uploadState === 'uploading' && (
          <div className="prd-upload-progress">
            <div className="upload-bar">
              <div className="upload-fill" style={{ width: `${uploadProgress}%` }} />
            </div>
            <span className="upload-pct">{uploadProgress}%</span>
          </div>
        )}

        {uploadState === 'uploaded' && (
          <div className="terminal-box">
            {srsStatusLines.map((line, index) => (
              <span
                key={line}
                className={cx('terminal-line', index < visibleLines && 'is-visible')}
                style={{ animationDelay: `${index * 400}ms` }}
              >
                {line}
              </span>
            ))}
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  )
}

function BigBossBreakdownVisual() {
  return (
    <div className="demo-visual demo-visual--boss">
      <div className="breakdown-stage">
        <div className="breakdown-node">
          <span className="breakdown-node-icon">⬡</span>
          <span className="breakdown-node-title">BIG BOSS AGENT</span>
          <span className="breakdown-node-sub">READING PRD</span>
        </div>

        <div className="breakdown-rows">
          {breakdownRequirements.map((requirement, index) => (
            <div key={requirement.label} className="breakdown-row">
              <div className="breakdown-req-block" style={{ animationDelay: `${index * 300}ms` }}>
                {requirement.label}
              </div>
              <div className="breakdown-task-chips">
                {requirement.subtasks.map((subtask, subtaskIndex) => (
                  <span
                    key={subtask}
                    className="breakdown-task-chip"
                    style={{ animationDelay: `${index * 300 + 150 + subtaskIndex * 100}ms` }}
                  >
                    {subtask}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="breakdown-summary" style={{ animationDelay: '2500ms' }}>
          12 TASKS GENERATED · DISTRIBUTING NOW
        </div>
      </div>
    </div>
  )
}

function DistributionVisual() {
  const isMobile = useIsMobileLayout()
  const devs = [
    {
      name: 'Alex',
      initial: 'A',
      color: '#2563eb',
      role: 'FRONTEND',
      task: 'Build login UI components',
    },
    {
      name: 'Sam',
      initial: 'S',
      color: '#7c3aed',
      role: 'BACKEND',
      task: 'Session endpoint logic',
    },
    {
      name: 'Jordan',
      initial: 'J',
      color: '#d97706',
      role: 'AUTH',
      task: 'OAuth2 flow implementation',
    },
    {
      name: 'Casey',
      initial: 'C',
      color: '#059669',
      role: 'DATABASE',
      task: 'Session storage schema',
    },
    {
      name: 'Morgan',
      initial: 'M',
      color: '#dc2626',
      role: 'TESTING',
      task: 'Auth integration tests',
    },
    {
      name: 'Riley',
      initial: 'R',
      color: '#0891b2',
      role: 'DEVOPS',
      task: 'Deploy auth service',
    },
  ]
  const lineXs = [50, 150, 250, 350, 450, 550]

  return (
    <div className="demo-visual demo-visual--distribution">
      <div className={cx('s4-container', isMobile && 'is-mobile')}>
        <div className="s4-ptm-node">
          <div className="s4-ptm-hex">⬡</div>
          <span className="s4-ptm-name">PTM AGENT</span>
          <span className="s4-ptm-sub">TASK DISTRIBUTION</span>
        </div>

        <svg className="s4-lines" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          {lineXs.map((x, index) => (
            <g key={devs[index].name}>
              <line
                x1="300"
                y1="0"
                x2={x}
                y2="60"
                stroke="#1a1a1a"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <circle r="3" fill={devs[index].color} opacity="0.9">
                <animateMotion
                  dur={`${1.4 + index * 0.15}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.2}s`}
                  path={`M 300,0 L ${x},60`}
                />
              </circle>
            </g>
          ))}
        </svg>

        <div className="s4-devs-row">
          {devs.map((dev, index) => (
            <div key={dev.name} className="s4-dev-col" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="s4-avatar" style={{ background: dev.color }}>
                {dev.initial}
              </div>
              <span className="s4-dev-name">{dev.name}</span>
              <span className="s4-dev-role">{dev.role}</span>

              <div
                className="s4-task-card"
                style={{
                  borderLeftColor: dev.color,
                  animationDelay: `${index * 150 + 400}ms`,
                }}
              >
                <span className="s4-task-text">{dev.task}</span>
                <span className="s4-task-vscode">⬡ VS CODE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DevAgentVisual() {
  return (
    <div className="demo-visual demo-visual--dev-agent">
      <div className="commit-scan-stage">
        <div className="commit-vscode">
          <div className="commit-vscode-titlebar">
            <div className="vscode-mini-dots">
              <span />
              <span />
              <span />
            </div>
            <span>Orchestra — VS Code · Jordan · Auth Agent</span>
          </div>
          <div className="commit-vscode-body">
            <div className="commit-code-area">
              <div className="commit-code-line">
                <span className="commit-line-num">1</span>
                <code>const refreshToken = async (token) =&gt; {'{'}</code>
              </div>
              <div className="commit-code-line">
                <span className="commit-line-num">2</span>
                <code>  const response = await api.post('/auth/refresh', {'{'} token {'}'});</code>
              </div>
              <div className="commit-code-line">
                <span className="commit-line-num">3</span>
                <code>  localStorage.setItem('token', response.data.accessToken);</code>
              </div>
              <div className="commit-code-line">
                <span className="commit-line-num">4</span>
                <code>  return response.data.accessToken;</code>
              </div>
              <div className="commit-code-line">
                <span className="commit-line-num">5</span>
                <code>{'}'};</code>
              </div>
            </div>
            <div className="commit-terminal">
              {commitTerminalLines.map((line, index) => (
                <span
                  key={line}
                  className={cx('commit-terminal-line', index === 2 && 'is-hash')}
                  style={{ animationDelay: `${index * 180}ms` }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="agent-scan-stage">
          <div className="agent-scan-header">
            <span className="agent-scan-mark">✳</span>
            <div>
              <strong>ORCHESTRA AGENT</strong>
              <span>SCANNING COMMIT...</span>
            </div>
          </div>
          <div className="agent-scan-box">
            {agentScanLines.map((line, index) => (
              <span
                key={line}
                className="agent-scan-line"
                style={{ animationDelay: `${800 + index * 400}ms` }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ReporterVisual() {
  const reporterAnswer = useTypewriterText(reporterSummary, { speed: 30, delay: 2600 })

  return (
    <div className="demo-visual demo-visual--reporter">
      <div className="reporter-clean-stage">
        <div className="reporter-question-card">
          <span>BIG BOSS · 2:48 PM</span>
          <p>Are we going to hit the Sprint 2 deadline?</p>
        </div>

        <div className="reporter-agent-node" style={{ animationDelay: '600ms' }}>
          <span className="reporter-agent-icon">⬡</span>
          <span className="reporter-agent-title">REPORTER AGENT</span>
          <div className="reporter-agent-query">
            QUERYING 6 DEV AGENTS
            <span className="reporter-query-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        <div className="reporter-grid">
          <div className="reporter-status-board">
            {teamMembers.map((developer, index) => (
              <div
                key={developer.name}
                className="reporter-status-line"
                style={{ animationDelay: `${1400 + index * 150}ms` }}
              >
                <span
                  className="reporter-status-dot"
                  style={{ background: developer.reportColor }}
                />
                <span className="reporter-status-name">{developer.name}</span>
                <span className="reporter-status-role">{developer.tag}</span>
                <span className="reporter-status-progress">{developer.reporterProgress}</span>
                <span
                  className="reporter-status-state"
                  style={{ color: developer.reportColor }}
                >
                  {developer.reporterState}
                </span>
              </div>
            ))}
          </div>

          <div className="reporter-response-stack">
            <div className="reporter-response-card">
              <span>REPORTER AGENT · 2:48 PM</span>
              <p>{reporterAnswer || ' '}</p>
            </div>
            <div className="reporter-bars">
              {reporterBars.map((bar, index) => (
                <div key={bar.label} className="reporter-bar-row">
                  <label>{bar.label}</label>
                  <div className="reporter-bar-track">
                    <div
                      className={cx('reporter-bar-fill-clean', bar.className)}
                      style={{ animationDelay: `${2900 + index * 160}ms` }}
                    />
                  </div>
                  <span>{bar.value}</span>
                  <strong>{bar.state}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="demo-visual demo-visual--dashboard">
      <div className="insights-browser">
        <div className="insights-browser-bar">
          <div className="browser-dots">
            <span className="dot red" />
            <span className="dot amber" />
            <span className="dot green" />
          </div>
          <div className="insights-browser-url">unihackjira.vercel.app</div>
        </div>

        <div className="insights-browser-content">
          <div className="insights-row insights-row--tiles">
            {insightsTiles.map(([label, value], index) => (
              <div
                key={label}
                className="insights-signal-tile"
                style={{ animationDelay: `${180 + index * 100}ms` }}
              >
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="insights-row insights-row--timeline">
            <span className="insights-row-label">SPRINT TIMELINE</span>
            {reporterBars.map((bar, index) => (
              <div key={bar.label} className="insights-timeline-row">
                <label>{bar.label}</label>
                <div className="insights-timeline-track">
                  <div
                    className={cx('insights-timeline-fill', bar.className)}
                    style={{ animationDelay: `${650 + index * 120}ms` }}
                  />
                </div>
                <span>{bar.value}</span>
              </div>
            ))}
          </div>

          <div className="insights-row insights-row--bottom">
            <div className="insights-dev-grid">
              {teamMembers.slice(0, 4).map((developer, index) => (
                <div
                  key={developer.name}
                  className="insights-dev-card"
                  style={{ animationDelay: `${900 + index * 80}ms` }}
                >
                  <div className="insights-dev-avatar" style={{ background: developer.color }}>
                    {developer.name[0]}
                  </div>
                  <div className="insights-dev-copy">
                    <strong>{developer.name}</strong>
                    <span>{developer.dashboardMeta}</span>
                    <small>{developer.dashboardStatus}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="insights-chat-snippet" style={{ animationDelay: '1120ms' }}>
              <span>BIG BOSS CHAT</span>
              <p>
                Sprint 2 is at 68%. One risk: Casey&apos;s DB schema is blocking Jordan&apos;s auth
                work. Casey estimates completion tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepVisual({ step, uploadState, uploadProgress, onTriggerUpload }) {
  switch (step) {
    case 0:
      return <TeamSetupVisual />
    case 1:
      return (
        <SrsUploadVisual
          uploadState={uploadState}
          uploadProgress={uploadProgress}
          onTriggerUpload={onTriggerUpload}
        />
      )
    case 2:
      return <BigBossBreakdownVisual />
    case 3:
      return <DistributionVisual />
    case 4:
      return <DevAgentVisual />
    case 5:
      return <ReporterVisual />
    case 6:
      return <DashboardVisual />
    default:
      return null
  }
}

function WorkflowSection({ openPreview, scrollToSection }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepAnimating, setStepAnimating] = useState(false)
  const [uploadState, setUploadState] = useState('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const transitionTimeoutRef = useRef(null)
  const uploadFrameRef = useRef(null)

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      if (uploadFrameRef.current) {
        window.cancelAnimationFrame(uploadFrameRef.current)
      }
    }
  }, [])

  const resetUploadDemo = () => {
    if (uploadFrameRef.current) {
      window.cancelAnimationFrame(uploadFrameRef.current)
      uploadFrameRef.current = null
    }

    setUploadState('idle')
    setUploadProgress(0)
  }

  const goToStep = (nextStep) => {
    if (
      stepAnimating ||
      nextStep === currentStep ||
      nextStep < 0 ||
      nextStep > demoSteps.length - 1
    ) {
      return
    }

    setStepAnimating(true)

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = window.setTimeout(() => {
      resetUploadDemo()
      setCurrentStep(nextStep)
      window.requestAnimationFrame(() => setStepAnimating(false))
    }, 250)
  }

  const nextStep = () => {
    if (stepAnimating) {
      return
    }

    if (currentStep === demoSteps.length - 1) {
      scrollToSection('#waitlist')
      return
    }

    goToStep(currentStep + 1)
  }

  const prevStep = () => {
    if (stepAnimating || currentStep === 0) {
      return
    }

    goToStep(currentStep - 1)
  }

  const triggerUpload = () => {
    if (currentStep !== 1 || uploadState !== 'idle') {
      return
    }

    setUploadState('uploading')
    setUploadProgress(0)

    const duration = 2000
    const start = performance.now()

    const tick = (now) => {
      const progress = clamp((now - start) / duration, 0, 1)
      const nextProgress = Math.round(progress * 100)

      setUploadProgress(nextProgress)

      if (progress < 1) {
        uploadFrameRef.current = window.requestAnimationFrame(tick)
      } else {
        setUploadState('uploaded')
        uploadFrameRef.current = null
      }
    }

    uploadFrameRef.current = window.requestAnimationFrame(tick)
  }

  const handleKeyboardNavigation = useEffectEvent((event) => {
    const target = event.target

    if (
      target instanceof HTMLElement &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable)
    ) {
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextStep()
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prevStep()
    }
  })

  useEffect(() => {
    const listener = (event) => handleKeyboardNavigation(event)

    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <section id="workflow" className="content-section workflow-section">
      <div className="section-inner">
        <div className="demo-section-header">
          <SectionNumber>03</SectionNumber>
          <h2 className="section-title">See the entire system. One click at a time.</h2>
          <p className="section-sub">
            Seven steps. The complete workflow. Click through it yourself.
          </p>
          <div className="demo-keyboard-hint">
            <span>← →</span> Use arrow keys to navigate
          </div>
        </div>

        <div className="demo-panel">
          <div className="demo-steps-bar">
            {demoSteps.map((step, index) => (
              <button
                key={step.shortLabel}
                type="button"
                className={cx(
                  'demo-step-dot',
                  index === currentStep && 'active',
                  index < currentStep && 'done',
                )}
                onClick={() => goToStep(index)}
                disabled={stepAnimating}
              >
                <span className="dot-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="dot-label">{step.shortLabel}</span>
              </button>
            ))}
          </div>

          <div className="demo-body">
            <div className={cx('demo-left', stepAnimating && 'is-fading')}>
              <div key={currentStep} className="demo-left-content">
                <span className="demo-step-label">
                  STEP {String(currentStep + 1).padStart(2, '0')}
                </span>
                <h2 className="demo-step-title">{demoSteps[currentStep].title}</h2>
                <p className="demo-step-body">{demoSteps[currentStep].body}</p>
                {demoSteps[currentStep].detail && (
                  <div className="demo-step-detail">
                    <DemoStepDetail stepIndex={currentStep} openPreview={openPreview} />
                  </div>
                )}
              </div>
            </div>

            <div className="demo-right-shell">
              <div key={currentStep} className={cx('demo-right', stepAnimating ? 'fading' : 'visible')}>
                <StepVisual
                  step={currentStep}
                  uploadState={uploadState}
                  uploadProgress={uploadProgress}
                  onTriggerUpload={triggerUpload}
                />
              </div>
            </div>
          </div>

          <div className="demo-nav-bar">
            <button
              type="button"
              className="demo-nav-btn demo-prev"
              onClick={prevStep}
              disabled={currentStep === 0 || stepAnimating}
            >
              ← PREV
            </button>
            <span className="demo-nav-counter">STEP {currentStep + 1} OF 7</span>
            <button
              type="button"
              className="demo-nav-btn demo-next"
              onClick={nextStep}
              disabled={stepAnimating}
            >
              {currentStep === demoSteps.length - 1 ? 'JOIN WAITLIST →' : 'NEXT →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InsightsPreview() {
  return (
    <div className="browser-chrome">
      <div className="browser-bar">
        <div className="browser-dots">
          <span className="dot red" />
          <span className="dot amber" />
          <span className="dot green" />
        </div>
        <div className="browser-url">
          <span className="url-lock">LOCK</span>
          <span className="url-text">unihackjira.vercel.app</span>
        </div>
      </div>
      <div className="browser-content">
        <div className="insights-layout">
          <div className="insights-summary-grid">
            <div className="insight-metric">
              <span className="metric-label">SPRINT HEALTH</span>
              <strong>68%</strong>
              <small>1 RISK / 4 TEAMS</small>
            </div>
            <div className="insight-metric">
              <span className="metric-label">CAPACITY TRUTH</span>
              <strong>NO</strong>
              <small>FEATURE PUSHES TEAM TO 140%</small>
            </div>
            <div className="insight-metric">
              <span className="metric-label">ACTIVE BLOCKERS</span>
              <strong>03</strong>
              <small>1 DISCOVERED TODAY</small>
            </div>
            <div className="insight-metric">
              <span className="metric-label">STANDUP SAVED</span>
              <strong>11h</strong>
              <small>THIS SPRINT</small>
            </div>
          </div>

          <div className="insights-main-grid">
            <div className="insights-chat-card">
              <div className="panel-head">
                <span>BIG BOSS CHAT</span>
                <span>LIVE</span>
              </div>
              <div className="chat-thread">
                <div className="chat-row chat-row--question">
                  Are we hitting the Sprint 2 deadline?
                </div>
                <div className="chat-row chat-row--answer">
                  Sprint 2 is at 68%. Casey is blocking Jordan on the database migration. If
                  Casey lands tomorrow, the deadline holds. If not, move admin analytics to Sprint
                  3.
                </div>
              </div>
            </div>

            <div className="insights-side-grid">
              <div className="insights-timeline-card">
                <div className="panel-head">
                  <span>TEAM VELOCITY</span>
                  <span>LAST 6 SPRINTS</span>
                </div>
                <div className="timeline-bars">
                  <span style={{ height: '45%' }} />
                  <span style={{ height: '58%' }} />
                  <span style={{ height: '52%' }} />
                  <span style={{ height: '71%' }} />
                  <span style={{ height: '66%' }} />
                  <span style={{ height: '84%' }} />
                </div>
              </div>
              <div className="dev-profiles-card">
                <div className="panel-head">
                  <span>DEV PROFILES</span>
                  <span>FOUR NUMBERS</span>
                </div>
                <div className="dev-profile-row">
                  <strong>Alex</strong>
                  <span>71% sprint</span>
                  <small>clear</small>
                </div>
                <div className="dev-profile-row">
                  <strong>Jordan</strong>
                  <span>62% sprint</span>
                  <small>blocked</small>
                </div>
                <div className="dev-profile-row">
                  <strong>Casey</strong>
                  <span>59% sprint</span>
                  <small>risk</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrchestraPreview() {
  return (
    <div className="vscode-chrome">
      <div className="vscode-titlebar">
        <div className="vscode-dots">
          <span className="dot red" />
          <span className="dot amber" />
          <span className="dot green" />
        </div>
        <span className="vscode-title">Orchestra - VS Code</span>
      </div>
      <div className="vscode-content">
        <div className="vscode-layout">
          <div className="vscode-activity-bar">
            <span className="activity-pill activity-pill--active" />
            <span className="activity-pill" />
            <span className="activity-pill" />
            <span className="activity-pill" />
          </div>
          <div className="vscode-sidebar">
            <span className="sidebar-label">TASK LIST</span>
            <div className="sidebar-item sidebar-item--active">
              <strong>JWT refresh rotation</strong>
              <small>P1 · due tomorrow</small>
            </div>
            <div className="sidebar-item">
              <strong>Audit logging pass</strong>
              <small>P2 · ready next</small>
            </div>
            <div className="sidebar-item">
              <strong>Admin dashboard polish</strong>
              <small>P2 · waiting on API</small>
            </div>
          </div>
          <div className="vscode-editor">
            <div className="editor-tabs">
              <span className="editor-tab editor-tab--active">auth/session.ts</span>
              <span className="editor-tab">refresh.test.ts</span>
            </div>
            <pre className="editor-code">
              <code>{`export async function rotateRefreshToken(sessionId) {
  const session = await db.session.findUnique({ where: { id: sessionId } })

  if (!session) {
    throw new Error('SESSION_NOT_FOUND')
  }

  await revokeRefreshToken(session.currentRefreshToken)
  return issueRefreshToken(session.userId)
}`}</code>
            </pre>
          </div>
          <div className="vscode-chat">
            <div className="panel-head">
              <span>ORCHESTRA CHAT</span>
              <span>ROLE-SCOPED</span>
            </div>
            <div className="chat-row chat-row--question">
              how should I approach JWT refresh token rotation
            </div>
            <div className="chat-row chat-row--answer">
              Revoke on use. Issue one active refresh token per session. I found the current touch
              points in <code>auth/session.ts</code> and <code>middleware.ts</code>.
            </div>
            <div className="chat-cta-chip">APPLY TO FILE</div>
            <div className="dev-chat-stats">
              <span>47 COMMITS THIS WEEK</span>
              <span>68% SPRINT PROGRESS</span>
              <span>1 BLOCKER DETECTED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const [activeTab, setActiveTab] = useState(developerTabs[0].id)
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [submissions, setSubmissions] = useState([])
  const resetTimerRef = useRef(null)
  const [waitlistRef, waitlistVisible] = useScrollReveal({ threshold: 0.25 })

  useEffect(() => {
    setHeroReady(true)
  }, [])

  useEffect(() => {
    let frameId = 0

    const updateNavState = () => {
      setNavSolid(window.scrollY > 50)
      frameId = 0
    }

    const handleScroll = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(updateNavState)
    }

    updateNavState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const takenSpots = Math.min(23 + submissions.length, 50)
  const remainingSpots = Math.max(50 - takenSpots, 0)

  const scrollToSection = (selector) => {
    const target = document.querySelector(selector)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openPreview = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleWaitlistSubmit = async (event) => {
    event.preventDefault()

    const trimmedEmail = email.trim().toLowerCase()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!isValidEmail) {
      setSubmitState('error')
      setStatusMessage('Enter a valid email address.')
      return
    }

    setSubmitState('loading')
    setStatusMessage('')

    try {
      if (WAITLIST_API_URL) {
        const response = await fetch(WAITLIST_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail }),
        })

        if (!response.ok) {
          throw new Error('WAITLIST_REQUEST_FAILED')
        }
      }

      setSubmissions((currentSubmissions) =>
        currentSubmissions.includes(trimmedEmail)
          ? currentSubmissions
          : [...currentSubmissions, trimmedEmail],
      )
      setEmail('')
      setSubmitState('success')
      setStatusMessage("You're in.")

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current)
      }

      resetTimerRef.current = window.setTimeout(() => {
        setSubmitState('idle')
        setStatusMessage('')
      }, 2000)
    } catch {
      setSubmitState('error')
      setStatusMessage('Could not join right now. Try again.')
    }
  }

  return (
    <div className="page">
      <div className="grain" />
      <div className="scanlines" />
      <div className="orb-1" />
      <div className="orb-2" />

      <nav className={cx('site-nav', navSolid && 'is-solid')}>
        <div className="section-inner nav-shell">
          <div className="nav-left">
            <span className="nav-asterisk">✳</span>
            <span className="nav-name">ORCHESTRA</span>
          </div>
          <div className="nav-center">
            <a href="#workflow">How it works</a>
            <a href="#insights">Insights</a>
            <a href="#orchestra">Extension</a>
            <a href="#advantages">Why Orchestra</a>
          </div>
          <div className="nav-right">
            <span className="nav-badge">BETA · LIMITED ACCESS</span>
            <button
              type="button"
              className="nav-cta"
              onClick={() => scrollToSection('#waitlist')}
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="section-inner hero-shell">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              <span className="eyebrow-text">INTRODUCING ORCHESTRA · PRIVATE BETA</span>
            </div>

            <h1 className={cx('hero-title', heroReady && 'is-ready')}>
              <span className="hero-line hero-line-1">YOUR ENGINEERING TEAM</span>
              <span className="hero-line hero-line-2">FINALLY SPEAKING</span>
              <span className="hero-line hero-line-3">
                THE SAME
                <span className="hero-accent"> LANGUAGE.</span>
              </span>
            </h1>

            <p className={cx('hero-sub', heroReady && 'is-ready')}>
              Orchestra converts your manager&apos;s requirements into distributed engineering tasks,
              monitors every developer&apos;s real-time progress, and translates code output back
              into plain English automatically, continuously, without another standup.
            </p>

            <div className={cx('hero-ctas', heroReady && 'is-ready')}>
              <button
                type="button"
                className="cta-primary"
                onClick={() => scrollToSection('#waitlist')}
              >
                JOIN THE WAITLIST
                <ArrowRightIcon size={16} />
              </button>
              <button
                type="button"
                className="cta-secondary"
                onClick={() => scrollToSection('#workflow')}
              >
                SEE HOW IT WORKS
              </button>
            </div>

            <div className="scroll-indicator" aria-hidden="true">
              <span className="scroll-label">SCROLL</span>
              <div className="scroll-line" />
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-inner">
            <SectionNumber>01</SectionNumber>
            <h2 className="section-title">The coordination tax is eating your team alive.</h2>
            <p className="section-sub">
              Every software company above 5 people pays it. Nobody talks about it.
            </p>

            <div className="stats-grid">
              {problemStats.map((stat, index) => (
                <RevealItem
                  key={stat.number}
                  className="stat-card"
                  delay={index * 100}
                  threshold={0.15}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </RevealItem>
              ))}
            </div>

            <RevealItem className="problem-statement" delay={100} threshold={0.15}>
              <p className="problem-text">
                The manager doesn&apos;t know if the team is on track without asking 6 people. The
                developer doesn&apos;t know what to work on next without a meeting. The SRS document
                sits in a Google Drive folder while engineers guess at requirements. Blockers hide
                until they become emergencies. Tasks go to whoever speaks up, not whoever&apos;s best
                suited.
              </p>
              <p className="problem-punchline">
                This is not an engineering problem. This is a coordination problem. And
                coordination has never had an intelligent layer.
              </p>
              <p className="problem-punchline-2">Until now.</p>
            </RevealItem>
          </div>
        </section>

        <section className="content-section solution-section">
          <div className="section-inner">
            <SectionNumber>02</SectionNumber>
            <p className="solution-eyebrow">THE INTELLIGENCE LAYER</p>
            <h2 className="solution-title">THE INTELLIGENCE LAYER</h2>
            <p className="solution-sub">
              Six AI agents. One seamless system. Zero coordination overhead.
            </p>
            <AgentDiagram />
          </div>
        </section>

        <WorkflowSection openPreview={openPreview} scrollToSection={scrollToSection} />

        <section id="insights" className="content-section">
          <div className="section-inner">
            <SectionNumber>04</SectionNumber>
            <p className="preview-eyebrow">FOR MANAGERS AND EXECUTIVES</p>
            <h2 className="preview-title">ORCHESTRA INSIGHTS</h2>
            <p className="preview-sub">
              The entire engineering org. Four numbers. One honest chat interface.
            </p>

            <InsightsPreview />

            <div className="callouts">
              {insightsCallouts.map((callout, index) => (
                <RevealItem
                  key={callout.chip}
                  className="callout-strip"
                  delay={index * 100}
                  threshold={0.15}
                >
                  <span className="callout-chip">{callout.chip}</span>
                  <p className="callout-text">{callout.text}</p>
                </RevealItem>
              ))}
            </div>

            <button
              type="button"
              className="preview-btn"
              onClick={() => openPreview(INSIGHTS_URL)}
            >
              OPEN LIVE PREVIEW
              <ExternalLinkIcon size={14} />
            </button>
          </div>
        </section>

        <section id="orchestra" className="content-section">
          <div className="section-inner">
            <SectionNumber>05</SectionNumber>
            <p className="preview-eyebrow preview-eyebrow--mono">FOR DEVELOPERS</p>
            <h2 className="preview-title">ORCHESTRA</h2>
            <p className="preview-sub">
              Your AI coding partner. Lives in VS Code. Knows your codebase, your tasks, and how
              you work.
            </p>

            <OrchestraPreview />

            <div className="tabs-shell">
              <div className="tabs-list" role="tablist" aria-label="Orchestra platform details">
                {developerTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={tab.id === activeTab}
                    className={cx('tab-button', tab.id === activeTab && 'is-active')}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="tab-panel" role="tabpanel">
                <p>{developerTabs.find((tab) => tab.id === activeTab)?.description}</p>
              </div>
            </div>

            <button
              type="button"
              className="preview-btn"
              onClick={() => openPreview(ORCHESTRA_URL)}
            >
              OPEN LIVE PREVIEW
              <ExternalLinkIcon size={14} />
            </button>
          </div>
        </section>

        <section id="advantages" className="content-section">
          <div className="section-inner">
            <SectionNumber>06</SectionNumber>
            <h2 className="preview-title">WHY ORCHESTRA</h2>
            <div className="advantages-list">
              {advantages.map((advantage, index) => (
                <RevealItem
                  key={advantage.number}
                  className="advantage-strip"
                  delay={index * 80}
                  threshold={0.12}
                >
                  <span className="advantage-num">{advantage.number}</span>
                  <h3 className="advantage-title">{advantage.title}</h3>
                  <p className="advantage-body">{advantage.body}</p>
                </RevealItem>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-inner">
            <SectionNumber>07</SectionNumber>
            <h2 className="preview-title preview-title--medium">BUILT FOR TWO KINDS OF PEOPLE</h2>
            <div className="for-grid">
              {audienceCards.map((card) => (
                <div key={card.title} className="for-card">
                  <div className="for-card-head">
                    <span className="for-card-eyebrow">{card.eyebrow}</span>
                    <h3 className="for-card-title">{card.title}</h3>
                  </div>
                  <div className="for-card-divider" />
                  <div className="for-card-body">
                    {card.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="for-card-cta"
                    onClick={() =>
                      openPreview(card.action === 'insights' ? INSIGHTS_URL : ORCHESTRA_URL)
                    }
                  >
                    {card.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="content-section waitlist-section">
          <div className="section-inner">
            <SectionNumber>08</SectionNumber>
            <div
              ref={waitlistRef}
              className={cx('waitlist-block', waitlistVisible && 'visible')}
            >
              <p className="waitlist-eyebrow">PRIVATE BETA · LIMITED SPOTS</p>
              <h2 className="waitlist-title">
                BE THE FIRST TEAM
                <br />
                TO RUN ON ORCHESTRA.
              </h2>
              <p className="waitlist-sub">
                We&apos;re onboarding 50 engineering teams. That&apos;s it. Each team gets white-glove
                setup, direct access to the founders, and pricing locked forever.
              </p>

              <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
                <input
                  type="email"
                  className="waitlist-input"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" className="waitlist-btn" disabled={submitState === 'loading'}>
                  {submitState === 'loading' && 'JOINING...'}
                  {submitState === 'success' && '✓ YOU\'RE IN'}
                  {(submitState === 'idle' || submitState === 'error') && 'JOIN WAITLIST →'}
                </button>
              </form>

              <p className="waitlist-note">
                No spam. No pitch deck. Just an honest conversation about your team&apos;s problems.
              </p>
              <p className="waitlist-status" aria-live="polite">
                {statusMessage}
              </p>

              <div className="waitlist-stats">
                <div className="wl-stat">
                  <span className="wl-num">50</span>
                  <span className="wl-label">SPOTS TOTAL</span>
                </div>
                <div className="wl-div" />
                <div className="wl-stat">
                  <span className="wl-num">{takenSpots}</span>
                  <span className="wl-label">ALREADY TAKEN</span>
                </div>
                <div className="wl-div" />
                <div className="wl-stat">
                  <span className="wl-num">{remainingSpots}</span>
                  <span className="wl-label">REMAINING</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-shell">
          <div className="footer-left">
            <span className="footer-brand">✳ ORCHESTRA</span>
            <span className="footer-meta">© 2026 ORCHESTRA. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="footer-center">
            <button type="button" onClick={() => scrollToSection('#workflow')}>
              HOW IT WORKS
            </button>
            <span>·</span>
            <button type="button" onClick={() => scrollToSection('#insights')}>
              INSIGHTS
            </button>
            <span>·</span>
            <button type="button" onClick={() => scrollToSection('#orchestra')}>
              EXTENSION
            </button>
            <span>·</span>
            <button type="button" onClick={() => scrollToSection('#waitlist')}>
              WAITLIST
            </button>
          </div>
          <div className="footer-right">BUILT FOR INCUBATE · UNIVERSITY OF SYDNEY</div>
        </div>
      </footer>
    </div>
  )
}

export default App
