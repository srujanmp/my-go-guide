export const lessonDeepDive = {
  "What is Go?": {
    concept: "Go is designed for readable, maintainable systems programming with fast compile times and simple concurrency.",
    realWorld: "Teams choose Go for backend APIs, CLIs, and microservices where reliability and low operational cost matter.",
    nextSteps: [
      "Install Go locally and run `go version` + `go run main.go`.",
      "Learn package naming and file organization in a tiny project.",
      "Read Go's official tour for language fundamentals."
    ]
  },
  "Variables & Types": {
    concept: "Strong static typing catches many mistakes at compile time and makes refactoring safer.",
    realWorld: "Clear types improve API contracts and help teammates understand data shape quickly.",
    nextSteps: [
      "Practice converting between int, float64, and string.",
      "Use zero values intentionally in small examples.",
      "Explore custom types for domain concepts."
    ]
  },
  "Functions": {
    concept: "Multiple return values (value + error) are central to Go error-first design.",
    realWorld: "Most production functions return `(result, error)` to make failure handling explicit.",
    nextSteps: [
      "Write a function that returns `(User, error)`.",
      "Use `_` blank identifier only when safe.",
      "Refactor repeated logic into small helper functions."
    ]
  },
  "Structs (like Objects)": {
    concept: "Structs model data, while methods attach behavior without inheritance-heavy design.",
    realWorld: "Service, repository, and request/response models are typically represented by structs.",
    nextSteps: [
      "Create a struct with JSON tags and print it.",
      "Practice pointer receiver vs value receiver.",
      "Compose structs to model nested data."
    ]
  },
  "Error Handling": {
    concept: "Go favors explicit error checks over exceptions to keep control flow visible.",
    realWorld: "Error wrapping and typed errors help map technical failures to user-friendly API responses.",
    nextSteps: [
      "Use fmt.Errorf with wrapping (e.g., %w) to preserve root errors.",
      "Differentiate validation vs internal errors.",
      "Return early when error is detected."
    ]
  },
  "What is Gin & Setup": {
    concept: "Gin provides a minimal HTTP framework with routing, middleware chains, and JSON helpers.",
    realWorld: "Gin is commonly used for REST APIs that need performance and simple ergonomics.",
    nextSteps: [
      "Create `/health` and `/version` endpoints.",
      "Try `gin.New()` vs `gin.Default()` and compare middleware.",
      "Add environment-based port configuration."
    ]
  },
  "Routes & Parameters": {
    concept: "Path params identify resources, query params refine retrieval/filter behavior.",
    realWorld: "Clean route design improves API discoverability and reduces frontend confusion.",
    nextSteps: [
      "Add pagination params (`page`, `limit`) to a list endpoint.",
      "Validate and convert string params to integers safely.",
      "Group admin routes under `/api/v1/admin`."
    ]
  },
  "Request Body & JSON": {
    concept: "Binding + validation protect services from malformed or incomplete input.",
    realWorld: "Strict request DTOs reduce downstream bugs and keep DB data clean.",
    nextSteps: [
      "Add custom validation rule for password strength.",
      "Return field-specific validation messages.",
      "Create separate request and response structs."
    ]
  },
  Middleware: {
    concept: "Middleware enforces cross-cutting concerns once, instead of repeating logic in every handler.",
    realWorld: "Auth, tracing, CORS, request IDs, and rate limits are usually middleware concerns.",
    nextSteps: [
      "Create request-id middleware and attach to response headers.",
      "Log latency and status for each request.",
      "Abort unauthorized requests early."
    ]
  },
  "Connecting to PostgreSQL": {
    concept: "Connection pooling reuses DB connections, improving throughput and stability.",
    realWorld: "Production apps keep one shared pool and monitor connection/timeout settings.",
    nextSteps: [
      "Move connection string to env variables.",
      "Set max open/idle connections in pool config.",
      "Add startup health check (`Ping`)."
    ]
  },
  "CRUD Operations": {
    concept: "CRUD forms the baseline for persistent state management in backend services.",
    realWorld: "Repositories wrap CRUD to isolate SQL from business rules.",
    nextSteps: [
      "Return `rows affected` in update/delete paths.",
      "Handle `no rows` separately from other SQL errors.",
      "Add transaction for related writes."
    ]
  },
  "Full API with Postgres": {
    concept: "App structs bundle dependencies, making handlers testable and explicit.",
    realWorld: "Most APIs pass DB/repo clients through structs rather than globals.",
    nextSteps: [
      "Add repository layer between handler and DB calls.",
      "Add context timeouts for each DB query.",
      "Return consistent error response schema."
    ]
  },
  "What is Redis & Setup": {
    concept: "Redis stores hot data in memory for ultra-fast reads/writes with optional expiration.",
    realWorld: "It's used for cache, token/session data, feature flags, and rate-limiting counters.",
    nextSteps: [
      "Configure Redis host/port via env.",
      "Test key TTL behavior using `TTL` command.",
      "Handle Redis unavailable paths gracefully."
    ]
  },
  "Caching Pattern": {
    concept: "Cache-aside checks cache first, then DB, and writes result back to cache.",
    realWorld: "This reduces DB pressure and improves response latency for frequent reads.",
    nextSteps: [
      "Set sensible TTL per entity type.",
      "Invalidate cache on update/delete operations.",
      "Track cache hit ratio in logs/metrics."
    ]
  },
  "Sessions & Rate Limiting": {
    concept: "Session keys map users to temporary server-side state; counters enforce fairness.",
    realWorld: "Auth systems use this for refresh revocation and abuse prevention.",
    nextSteps: [
      "Namespace keys (`session:*`, `ratelimit:*`).",
      "Apply route-specific limit windows.",
      "Return clear 429 responses with retry hints."
    ]
  },
  "What is RabbitMQ?": {
    concept: "RabbitMQ decouples producers and consumers via exchanges, bindings, and queues.",
    realWorld: "Useful for emails, profile sync, webhooks, and long-running background tasks.",
    nextSteps: [
      "Create topic exchange and bind one queue.",
      "Publish a JSON message and inspect queue.",
      "Track unacked message count while consuming."
    ]
  },
  "Publishing Messages": {
    concept: "Publishing writes events/jobs without blocking API response time on heavy processing.",
    realWorld: "APIs enqueue work (email, invoice generation) and return quickly.",
    nextSteps: [
      "Set `DeliveryMode: Persistent` for durability.",
      "Include event IDs for traceability.",
      "Use routing keys to target multiple consumers."
    ]
  },
  "Consuming Messages": {
    concept: "Consumers process messages asynchronously and acknowledge only on success.",
    realWorld: "Manual ack + retry strategy prevents message loss during transient failures.",
    nextSteps: [
      "Implement backoff retry before Nack requeue.",
      "Add dead-letter queue for poison messages.",
      "Make handlers idempotent using event IDs."
    ]
  },
  "Full Async API Pattern": {
    concept: "API accepts request, enqueues task, then worker executes side effects later.",
    realWorld: "This pattern keeps APIs responsive under heavy load and slow downstream services.",
    nextSteps: [
      "Return `202 Accepted` with job/event identifier.",
      "Add status endpoint for async job tracking.",
      "Separate API and worker deploy units."
    ]
  },
  "Gin in This Project (Mental Model)": {
    concept: "Layer boundaries keep transport, domain logic, and persistence responsibilities clean.",
    realWorld: "This separation makes code easier to test and scale as features grow.",
    nextSteps: [
      "Follow one request from route to repository.",
      "Write interface for service dependency injection.",
      "Document each layer responsibility in README."
    ]
  },
  "Register + Login Flow (Production-ish)": {
    concept: "Secure auth flow validates uniqueness, hashes passwords, and returns short-lived access tokens.",
    realWorld: "These checks are mandatory for account safety and predictable API behavior.",
    nextSteps: [
      "Add account lockout after repeated failed attempts.",
      "Implement email verification step.",
      "Log security-relevant auth events."
    ]
  },
  "Redis: Refresh Tokens + Rate Limiting": {
    concept: "Refresh tokens in Redis enable immediate revocation and rotating session control.",
    realWorld: "Logout/delete actions can invalidate sessions instantly across devices.",
    nextSteps: [
      "Store one token per device or session ID.",
      "Rotate refresh token on each refresh call.",
      "Attach IP/user-agent metadata to refresh entries."
    ]
  },
  "RabbitMQ: Event-Driven Profile Sync": {
    concept: "Event-driven sync ensures profile service reacts to auth lifecycle without tight coupling.",
    realWorld: "This enables independent service deployments and fault isolation.",
    nextSteps: [
      "Version event payloads for forward compatibility.",
      "Add correlation IDs across auth->consumer logs.",
      "Create DLQ alert when failures spike."
    ]
  },
  "Beginner Roadmap: Build It Step by Step": {
    concept: "Incremental delivery reduces cognitive load and helps verify each subsystem independently.",
    realWorld: "Teams ship in small milestones: auth core, then cache/session, then event integrations.",
    nextSteps: [
      "Create weekly milestone checklist for each step.",
      "Record curl collections for each endpoint.",
      "Write one integration test before each milestone close."
    ]
  }
};
