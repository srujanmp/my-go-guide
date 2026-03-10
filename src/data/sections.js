export const sections = [
  {
    id: "go-basics",
    title: "Go Basics",
    icon: "🐹",
    color: "#00ADD8",
    lessons: [
      {
        title: "What is Go?",
        content: `Go (Golang) is a programming language created by Google. It's fast, simple, and great for building web servers and APIs. Think of it like a simpler, faster version of Java or C++.`,
        code: `// Every Go program starts with a package declaration
package main

// Import packages you need
import "fmt"

// main() is where your program starts
func main() {
    fmt.Println("Hello, World!")
    
    // Variables
    name := "Gopher"        // Short variable declaration
    age  := 25              // Go figures out the type
    var city string = "NYC" // Explicit type
    
    fmt.Println(name, age, city)
}`
      },
      {
        title: "Variables & Types",
        content: `Go is statically typed — every variable has a type. The most common types are string, int, float64, bool. Go is smart enough to figure out the type from the value (type inference).`,
        code: `package main

import "fmt"

func main() {
    // Basic types
    var name    string  = "Alice"
    var age     int     = 30
    var height  float64 = 5.7
    var isAdmin bool    = true

    // Short syntax (most common)
    name2  := "Bob"
    score  := 100
    active := false

    // Multiple assignment
    x, y := 10, 20

    fmt.Println(name, age, height, isAdmin)
    fmt.Println(name2, score, active)
    fmt.Println(x + y) // 30
    
    // Constants (values that never change)
    const MaxRetries = 3
    const AppName = "MyApp"
    fmt.Println(AppName, MaxRetries)
}`
      },
      {
        title: "Functions",
        content: `Functions in Go can return multiple values — this is a key feature used everywhere. Go functions often return a value AND an error, so you always know if something went wrong.`,
        code: `package main

import (
    "fmt"
    "errors"
)

// Simple function
func greet(name string) string {
    return "Hello, " + name + "!"
}

// Function returning multiple values (very common in Go!)
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil // nil means "no error"
}

func main() {
    msg := greet("Gopher")
    fmt.Println(msg) // Hello, Gopher!

    // Always handle both return values
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result) // Result: 5
    
    // This would give an error
    _, err2 := divide(5, 0)
    if err2 != nil {
        fmt.Println("Error:", err2) // cannot divide by zero
    }
}`
      },
      {
        title: "Structs (like Objects)",
        content: `Go doesn't have classes like Java or Python. Instead it uses structs — simple data containers. You add behavior with methods. This is simpler and cleaner.`,
        code: `package main

import "fmt"

// Define a struct (like a class, but simpler)
type User struct {
    ID    int
    Name  string
    Email string
    Age   int
}

// Method on User struct
func (u User) Greet() string {
    return fmt.Sprintf("Hi, I'm %s!", u.Name)
}

// Method that modifies the struct (uses pointer receiver *)
func (u *User) Birthday() {
    u.Age++
}

func main() {
    // Create a user
    user := User{
        ID:    1,
        Name:  "Alice",
        Email: "alice@example.com",
        Age:   25,
    }

    fmt.Println(user.Name)    // Alice
    fmt.Println(user.Greet()) // Hi, I'm Alice!
    
    user.Birthday()
    fmt.Println(user.Age) // 26
    
    // Slice of users (like an array)
    users := []User{
        {1, "Alice", "alice@example.com", 25},
        {2, "Bob",   "bob@example.com",   30},
    }
    
    for _, u := range users {
        fmt.Println(u.Name, "-", u.Email)
    }
}`
      },
      {
        title: "Error Handling",
        content: `Go's error handling is explicit — you must check errors. No try/catch. This forces you to think about what can go wrong, making your code more reliable.`,
        code: `package main

import (
    "errors"
    "fmt"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on '%s': %s", e.Field, e.Message)
}

func validateAge(age int) error {
    if age < 0 {
        return &ValidationError{Field: "age", Message: "must be positive"}
    }
    if age > 150 {
        return &ValidationError{Field: "age", Message: "unrealistically large"}
    }
    return nil // no error!
}

func main() {
    ages := []int{25, -1, 200}
    
    for _, age := range ages {
        err := validateAge(age)
        if err != nil {
            // Type assertion to get specific error
            var valErr *ValidationError
            if errors.As(err, &valErr) {
                fmt.Printf("Field: %s, Problem: %s\n", valErr.Field, valErr.Message)
            }
        } else {
            fmt.Printf("Age %d is valid!\n", age)
        }
    }
}`
      }
    ]
  },
  {
    id: "gin",
    title: "Gin Web Framework",
    icon: "🍸",
    color: "#FF6B35",
    lessons: [
      {
        title: "What is Gin & Setup",
        content: `Gin is a web framework for Go. It makes building REST APIs super easy and fast. Think of it like Express.js for Node or Flask for Python — but much faster. Mental model: Gin = router + middleware + handlers. Router maps URL -> function, middleware runs shared checks (logging/auth/rate limit), and handlers execute business use-cases.`,
        code: `// First, initialize your Go project:
// $ go mod init myapp

// Install Gin:
// $ go get github.com/gin-gonic/gin

package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    // Create a new Gin router
    r := gin.Default()
    
    // Define a route: GET /hello
    r.GET("/hello", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Hello, World!",
            "status":  "ok",
        })
    })
    
    // Start server on port 8080
    r.Run(":8080")
    
    // Visit http://localhost:8080/hello
    // Response: {"message":"Hello, World!","status":"ok"}
}`
      },
      {
        title: "Routes & Parameters",
        content: `Routes tell your server what to do when someone visits a URL. You can have dynamic parts in the URL (like a user ID) and also query parameters.`,
        code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "strconv"
)

func main() {
    r := gin.Default()
    
    // ── URL Parameters (/users/123) ──
    r.GET("/users/:id", func(c *gin.Context) {
        id := c.Param("id") // "123" as string
        c.JSON(http.StatusOK, gin.H{"user_id": id})
    })
    
    // ── Query Parameters (/search?name=Alice&age=25) ──
    r.GET("/search", func(c *gin.Context) {
        name := c.Query("name")             // "Alice"
        age  := c.DefaultQuery("age", "0")  // "25", default "0"
        
        c.JSON(http.StatusOK, gin.H{
            "name": name,
            "age":  age,
        })
    })
    
    // ── Route Groups (prefix /api/v1) ──
    v1 := r.Group("/api/v1")
    {
        v1.GET("/products",     listProducts)
        v1.GET("/products/:id", getProduct)
        v1.POST("/products",    createProduct)
    }
    
    r.Run(":8080")
}

func listProducts(c *gin.Context)  { c.JSON(200, gin.H{"products": []string{"a", "b"}}) }
func getProduct(c *gin.Context)    { c.JSON(200, gin.H{"product": c.Param("id")}) }
func createProduct(c *gin.Context) { c.JSON(201, gin.H{"created": true}) }`
      },
      {
        title: "Request Body & JSON",
        content: `When a client sends data (like creating a user), they send JSON in the request body. Gin makes it easy to read this data and validate it automatically.`,
        code: `package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

// Define the shape of incoming data
// 'binding' tags = validation rules
type CreateUserRequest struct {
    Name  string \`json:"name"  binding:"required,min=2"\`
    Email string \`json:"email" binding:"required,email"\`
    Age   int    \`json:"age"   binding:"required,min=1,max=150"\`
}

type UserResponse struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

func main() {
    r := gin.Default()
    
    r.POST("/users", func(c *gin.Context) {
        var req CreateUserRequest
        
        // ShouldBindJSON reads the body AND validates
        if err := c.ShouldBindJSON(&req); err != nil {
            // Validation failed — tell the client what's wrong
            c.JSON(http.StatusBadRequest, gin.H{
                "error": err.Error(),
            })
            return
        }
        
        // At this point, req is valid!
        // In a real app you'd save to database here
        response := UserResponse{
            ID:    1, // Would come from DB
            Name:  req.Name,
            Email: req.Email,
        }
        
        c.JSON(http.StatusCreated, response)
    })
    
    r.Run(":8080")
}

// Test with:
// curl -X POST http://localhost:8080/users \\
//   -H "Content-Type: application/json" \\
//   -d '{"name":"Alice","email":"alice@test.com","age":25}'`
      },
      {
        title: "Middleware",
        content: `Middleware is code that runs before your route handlers. Perfect for things like authentication, logging, or rate limiting. Think of it as a checkpoint every request must pass through.`,
        code: `package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "net/http"
    "time"
)

// ── Custom Logger Middleware ──
func LoggerMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start  := time.Now()
        method := c.Request.Method
        path   := c.Request.URL.Path
        
        c.Next() // ← process the request
        
        // This runs AFTER the handler
        duration   := time.Since(start)
        statusCode := c.Writer.Status()
        fmt.Printf("[%s] %s %d %v\n", method, path, statusCode, duration)
    }
}

// ── Auth Middleware ──
func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        
        if token != "Bearer secret-token" {
            c.JSON(http.StatusUnauthorized, gin.H{
                "error": "invalid or missing token",
            })
            c.Abort() // ← Stop processing, don't call next handlers
            return
        }
        
        // Save user info for the handler to use
        c.Set("userID", 42)
        c.Next()
    }
}

func main() {
    r := gin.Default()
    
    // Apply to ALL routes
    r.Use(LoggerMiddleware())
    
    // Public routes (no auth needed)
    r.GET("/public", func(c *gin.Context) {
        c.JSON(200, gin.H{"data": "anyone can see this"})
    })
    
    // Protected routes (auth required)
    protected := r.Group("/api")
    protected.Use(AuthRequired())
    {
        protected.GET("/profile", func(c *gin.Context) {
            userID, _ := c.Get("userID")
            c.JSON(200, gin.H{"user_id": userID})
        })
    }
    
    r.Run(":8080")
}`
      }
    ]
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    icon: "🐘",
    color: "#336791",
    lessons: [
      {
        title: "Connecting to PostgreSQL",
        content: `PostgreSQL is a powerful relational database. We use a library called pgx to connect Go to Postgres. Think of it as a bridge between your Go code and your database.`,
        code: `// Install:
// $ go get github.com/jackc/pgx/v5/pgxpool
// $ go get github.com/jmoiron/sqlx (optional, makes queries easier)

package main

import (
    "context"
    "fmt"
    "log"
    "github.com/jackc/pgx/v5/pgxpool"
)

func main() {
    // Connection string format:
    // postgres://username:password@host:port/database
    connStr := "postgres://postgres:password@localhost:5432/myapp"
    
    // pgxpool creates a pool of connections (much better than single conn)
    // A pool reuses connections instead of creating new ones every time
    pool, err := pgxpool.New(context.Background(), connStr)
    if err != nil {
        log.Fatal("Cannot connect to database:", err)
    }
    defer pool.Close() // Always close when done
    
    // Test the connection
    err = pool.Ping(context.Background())
    if err != nil {
        log.Fatal("Database ping failed:", err)
    }
    
    fmt.Println("✅ Connected to PostgreSQL!")
    
    // Use pool.Query(), pool.QueryRow(), pool.Exec() to run SQL
}`
      },
      {
        title: "CRUD Operations",
        content: `CRUD = Create, Read, Update, Delete. These are the 4 basic database operations. Here's how to do all of them in Go with PostgreSQL.`,
        code: `package main

import (
    "context"
    "fmt"
    "log"
    "github.com/jackc/pgx/v5/pgxpool"
)

type User struct {
    ID    int
    Name  string
    Email string
    Age   int
}

var pool *pgxpool.Pool

// CREATE — Insert a new user
func createUser(name, email string, age int) (int, error) {
    var id int
    // $1, $2, $3 = placeholders (prevents SQL injection!)
    err := pool.QueryRow(context.Background(),
        "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING id",
        name, email, age,
    ).Scan(&id) // Scan reads the returned id into our variable
    return id, err
}

// READ — Get one user by ID
func getUserByID(id int) (User, error) {
    var u User
    err := pool.QueryRow(context.Background(),
        "SELECT id, name, email, age FROM users WHERE id = $1",
        id,
    ).Scan(&u.ID, &u.Name, &u.Email, &u.Age)
    return u, err
}

// READ — Get all users
func getAllUsers() ([]User, error) {
    rows, err := pool.Query(context.Background(),
        "SELECT id, name, email, age FROM users ORDER BY id",
    )
    if err != nil { return nil, err }
    defer rows.Close()
    
    var users []User
    for rows.Next() {
        var u User
        err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.Age)
        if err != nil { return nil, err }
        users = append(users, u)
    }
    return users, nil
}

// UPDATE
func updateUserName(id int, name string) error {
    _, err := pool.Exec(context.Background(),
        "UPDATE users SET name = $1 WHERE id = $2",
        name, id,
    )
    return err
}

// DELETE
func deleteUser(id int) error {
    _, err := pool.Exec(context.Background(),
        "DELETE FROM users WHERE id = $1", id,
    )
    return err
}

func main() {
    // Setup pool...
    id, err := createUser("Alice", "alice@example.com", 25)
    if err != nil { log.Fatal(err) }
    fmt.Println("Created user with ID:", id)
    
    user, _ := getUserByID(id)
    fmt.Printf("Found: %s (%s)\n", user.Name, user.Email)
}`
      },
      {
        title: "Full API with Postgres",
        content: `Now let's wire Gin + PostgreSQL together into a real REST API. This is the pattern you'll use in production applications.`,
        code: `package main

import (
    "context"
    "net/http"
    "strconv"
    "github.com/gin-gonic/gin"
    "github.com/jackc/pgx/v5/pgxpool"
)

type App struct {
    DB *pgxpool.Pool // Store DB pool in our app struct
}

type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email"\`
}

type CreateUserReq struct {
    Name  string \`json:"name"  binding:"required"\`
    Email string \`json:"email" binding:"required,email"\`
}

func (app *App) GetUsers(c *gin.Context) {
    rows, err := app.DB.Query(context.Background(),
        "SELECT id, name, email FROM users")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "db error"})
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        rows.Scan(&u.ID, &u.Name, &u.Email)
        users = append(users, u)
    }
    c.JSON(http.StatusOK, users)
}

func (app *App) CreateUser(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var id int
    err := app.DB.QueryRow(context.Background(),
        "INSERT INTO users(name,email) VALUES($1,$2) RETURNING id",
        req.Name, req.Email,
    ).Scan(&id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create"})
        return
    }
    c.JSON(http.StatusCreated, gin.H{"id": id})
}

func main() {
    pool, _ := pgxpool.New(context.Background(),
        "postgres://postgres:pass@localhost:5432/myapp")
    
    app := &App{DB: pool}
    r := gin.Default()
    
    r.GET("/users",    app.GetUsers)
    r.POST("/users",   app.CreateUser)
    
    r.Run(":8080")
}`
      }
    ]
  },
  {
    id: "redis",
    title: "Redis",
    icon: "⚡",
    color: "#DC382D",
    lessons: [
      {
        title: "What is Redis & Setup",
        content: `Redis is an in-memory database — super fast because everything is in RAM. Use it for caching (storing results so you don't hit Postgres every time), sessions, and real-time features. In auth systems, Redis is also perfect for refresh-token revocation and rate limiting because TTL and atomic counters are built-in.`,
        code: `// Install:
// $ go get github.com/redis/go-redis/v9

package main

import (
    "context"
    "fmt"
    "log"
    "github.com/redis/go-redis/v9"
)

var ctx = context.Background()

func main() {
    // Connect to Redis
    rdb := redis.NewClient(&redis.Options{
        Addr:     "localhost:6379", // Default Redis port
        Password: "",              // No password by default
        DB:       0,               // Use database 0
    })
    
    // Test connection
    pong, err := rdb.Ping(ctx).Result()
    if err != nil {
        log.Fatal("Cannot connect to Redis:", err)
    }
    fmt.Println("Redis response:", pong) // PONG
    
    // Basic SET and GET
    // SET key value with 1 hour expiration
    err = rdb.Set(ctx, "greeting", "Hello Redis!", 0).Err()
    if err != nil { log.Fatal(err) }
    
    val, err := rdb.Get(ctx, "greeting").Result()
    if err != nil { log.Fatal(err) }
    fmt.Println("Value:", val) // Hello Redis!
}`
      },
      {
        title: "Caching Pattern",
        content: `The most common Redis use case: cache database results. First check Redis, if not there get from Postgres and save to Redis. This makes your API dramatically faster.`,
        code: `package main

import (
    "context"
    "encoding/json"
    "fmt"
    "time"
    "github.com/redis/go-redis/v9"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

var rdb *redis.Client
var ctx = context.Background()

// GetUserWithCache demonstrates the Cache-Aside pattern:
// 1. Check Redis first (fast)
// 2. If not found, get from Postgres (slow)  
// 3. Save to Redis for next time
func GetUserWithCache(userID int) (*User, error) {
    cacheKey := fmt.Sprintf("user:%d", userID) // e.g. "user:42"
    
    // Step 1: Try Redis first
    cached, err := rdb.Get(ctx, cacheKey).Result()
    
    if err == nil {
        // Cache HIT! Deserialize and return
        var user User
        json.Unmarshal([]byte(cached), &user)
        fmt.Println("⚡ Cache HIT — served from Redis!")
        return &user, nil
    }
    
    // Cache MISS — get from database
    fmt.Println("🐘 Cache MISS — fetching from Postgres...")
    user := &User{ID: userID, Name: "Alice"} // Imagine this is from Postgres
    
    // Step 3: Save to Redis for next time (expires in 10 minutes)
    data, _ := json.Marshal(user)
    rdb.Set(ctx, cacheKey, data, 10*time.Minute)
    
    return user, nil
}

// DeleteUserCache — call this when user data changes!
func DeleteUserCache(userID int) {
    cacheKey := fmt.Sprintf("user:%d", userID)
    rdb.Del(ctx, cacheKey)
    fmt.Println("🗑️  Cache invalidated for user:", userID)
}

func main() {
    // First call: hits Postgres, saves to Redis
    user, _ := GetUserWithCache(42)
    fmt.Println("Got:", user.Name)
    
    // Second call: instant from Redis!
    user, _ = GetUserWithCache(42)
    fmt.Println("Got:", user.Name)
    
    // After updating user, clear the cache
    DeleteUserCache(42)
}`
      },
      {
        title: "Sessions & Rate Limiting",
        content: `Redis is perfect for user sessions (storing login state) and rate limiting (blocking users who make too many requests). Here's how to implement both.`,
        code: `package main

import (
    "context"
    "fmt"
    "time"
    "github.com/redis/go-redis/v9"
)

var rdb *redis.Client
var ctx = context.Background()

// ── SESSION MANAGEMENT ──
func SaveSession(sessionID, userID string) error {
    key := "session:" + sessionID
    // Store session data, expire in 24 hours
    return rdb.HSet(ctx, key,
        "user_id", userID,
        "created", time.Now().Unix(),
    ).Err()
    rdb.Expire(ctx, key, 24*time.Hour)
    return nil
}

func GetSession(sessionID string) (map[string]string, error) {
    key := "session:" + sessionID
    return rdb.HGetAll(ctx, key).Result()
}

func DeleteSession(sessionID string) error {
    return rdb.Del(ctx, "session:"+sessionID).Err()
}

// ── RATE LIMITING ──
// Returns true if the request should be ALLOWED
func IsAllowed(clientIP string, maxRequests int, window time.Duration) bool {
    key := fmt.Sprintf("ratelimit:%s", clientIP)
    
    // Increment counter (creates key if it doesn't exist)
    count, err := rdb.Incr(ctx, key).Result()
    if err != nil { return true } // fail open
    
    // On first request, set the expiration window
    if count == 1 {
        rdb.Expire(ctx, key, window)
    }
    
    allowed := count <= int64(maxRequests)
    if !allowed {
        fmt.Printf("🚫 Rate limit hit for %s (%d requests)\n", clientIP, count)
    }
    return allowed
}

func main() {
    // Session example
    SaveSession("sess_abc123", "user_42")
    data, _ := GetSession("sess_abc123")
    fmt.Println("Session data:", data)
    
    // Rate limit example: allow 5 requests per minute
    ip := "192.168.1.1"
    for i := 1; i <= 7; i++ {
        allowed := IsAllowed(ip, 5, time.Minute)
        fmt.Printf("Request %d: allowed=%v\n", i, allowed)
    }
}`
      }
    ]
  },
  {
    id: "rabbitmq",
    title: "RabbitMQ",
    icon: "🐇",
    color: "#FF6600",
    lessons: [
      {
        title: "What is RabbitMQ?",
        content: `RabbitMQ is a message broker — a middleman between services. Instead of Service A calling Service B directly, A sends a message to RabbitMQ, and B picks it up when ready. This decouples your services and handles load spikes gracefully. In microservices, this lets auth publish user events while profile/email/analytics services react independently.`,
        code: `// Install:
// $ go get github.com/rabbitmq/amqp091-go

package main

import (
    "fmt"
    "log"
    amqp "github.com/rabbitmq/amqp091-go"
)

func connectRabbitMQ() *amqp.Connection {
    // Connect to RabbitMQ
    conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
    if err != nil {
        log.Fatal("Failed to connect to RabbitMQ:", err)
    }
    fmt.Println("✅ Connected to RabbitMQ!")
    return conn
}

// The flow:
//
//  [Producer]  →  [Exchange]  →  [Queue]  →  [Consumer]
//    your app        router       mailbox      worker
//
// Producer = sends messages
// Exchange = routes messages to the right queue
// Queue    = holds messages until consumed
// Consumer = processes messages
//
// RabbitMQ guarantees delivery — if your consumer crashes,
// the message stays in the queue until it's processed!

func main() {
    conn := connectRabbitMQ()
    defer conn.Close()
    
    // A channel is a lightweight connection inside the main connection
    ch, err := conn.Channel()
    if err != nil { log.Fatal(err) }
    defer ch.Close()
    
    fmt.Println("Channel opened, ready to send/receive messages!")
}`
      },
      {
        title: "Publishing Messages",
        content: `Publishing = sending messages. You create a queue, then publish messages to it. Think of the queue like a to-do list — messages wait there until a worker picks them up.`,
        code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    amqp "github.com/rabbitmq/amqp091-go"
)

type EmailTask struct {
    To      string \`json:"to"\`
    Subject string \`json:"subject"\`
    Body    string \`json:"body"\`
}

func publishEmailTask(ch *amqp.Channel, task EmailTask) error {
    queueName := "email_tasks"
    
    // Declare the queue (creates it if it doesn't exist)
    // durable=true means the queue survives RabbitMQ restart
    _, err := ch.QueueDeclare(
        queueName, // name
        true,      // durable
        false,     // auto-delete
        false,     // exclusive
        false,     // no-wait
        nil,       // arguments
    )
    if err != nil { return err }
    
    // Serialize task to JSON
    body, err := json.Marshal(task)
    if err != nil { return err }
    
    // Publish the message
    err = ch.Publish(
        "",        // exchange (empty = default)
        queueName, // routing key = queue name
        false,     // mandatory
        false,     // immediate
        amqp.Publishing{
            ContentType:  "application/json",
            Body:         body,
            DeliveryMode: amqp.Persistent, // Survive RabbitMQ restart
        },
    )
    
    if err == nil {
        fmt.Printf("📨 Sent email task to %s\n", task.To)
    }
    return err
}

func main() {
    conn, _ := amqp.Dial("amqp://guest:guest@localhost:5672/")
    defer conn.Close()
    ch, _ := conn.Channel()
    defer ch.Close()
    
    // Send 3 email tasks
    tasks := []EmailTask{
        {To: "alice@example.com", Subject: "Welcome!", Body: "Hello Alice"},
        {To: "bob@example.com",   Subject: "Invoice",  Body: "Your invoice..."},
        {To: "carol@example.com", Subject: "Reset pwd", Body: "Click here..."},
    }
    
    for _, task := range tasks {
        if err := publishEmailTask(ch, task); err != nil {
            log.Println("Failed to publish:", err)
        }
    }
    
    fmt.Println("All tasks queued! Workers will pick them up.")
}`
      },
      {
        title: "Consuming Messages",
        content: `Consuming = processing messages. Your consumer runs in the background, waiting for messages. When one arrives, it processes it. If it fails, the message goes back to the queue automatically.`,
        code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "time"
    amqp "github.com/rabbitmq/amqp091-go"
)

type EmailTask struct {
    To      string \`json:"to"\`
    Subject string \`json:"subject"\`
    Body    string \`json:"body"\`
}

func sendEmail(task EmailTask) error {
    // Simulate sending an email (replace with real logic)
    fmt.Printf("📧 Sending email to %s: %s\n", task.To, task.Subject)
    time.Sleep(500 * time.Millisecond) // Simulate work
    return nil
}

func startEmailWorker(ch *amqp.Channel) {
    queueName := "email_tasks"
    
    ch.QueueDeclare(queueName, true, false, false, false, nil)
    
    // Set prefetch = 1: only give this worker 1 message at a time
    // This ensures fair distribution among multiple workers
    ch.Qos(1, 0, false)
    
    // Start consuming
    msgs, err := ch.Consume(
        queueName, // queue
        "",        // consumer tag (auto-generated)
        false,     // auto-ack = false (we manually acknowledge)
        false,     // exclusive
        false,     // no-local
        false,     // no-wait
        nil,
    )
    if err != nil { log.Fatal("Cannot consume:", err) }
    
    fmt.Println("🐇 Email worker started. Waiting for tasks...")
    
    // Process messages one by one
    for msg := range msgs {
        var task EmailTask
        if err := json.Unmarshal(msg.Body, &task); err != nil {
            msg.Nack(false, false) // Reject, don't requeue (bad message)
            continue
        }
        
        if err := sendEmail(task); err != nil {
            fmt.Println("Failed to send, requeuing...")
            msg.Nack(false, true) // Reject AND requeue (try again)
        } else {
            msg.Ack(false) // ✅ Acknowledge success — remove from queue
        }
    }
}

func main() {
    conn, _ := amqp.Dial("amqp://guest:guest@localhost:5672/")
    defer conn.Close()
    ch, _ := conn.Channel()
    defer ch.Close()
    
    startEmailWorker(ch)
    // This blocks forever, processing messages as they arrive
}`
      },
      {
        title: "Full Async API Pattern",
        content: `Here's the real-world pattern: your API receives a request, puts a job on the queue (fast!), and returns immediately. A background worker processes it. This keeps your API responsive.`,
        code: `package main

// This shows the ARCHITECTURE — not all in one file in real life
//
// ┌─────────────┐    POST /send-email    ┌──────────────┐
// │   Client    │ ─────────────────────► │  Gin API     │
// │             │ ◄─────────────────────  │  (port 8080) │
// └─────────────┘  202 Accepted (fast!)  └──────┬───────┘
//                                               │ publish
//                                               ▼
//                                        ┌──────────────┐
//                                        │   RabbitMQ   │
//                                        │  email_tasks │
//                                        └──────┬───────┘
//                                               │ consume
//                                               ▼
//                                        ┌──────────────┐
//                                        │ Email Worker │
//                                        │ (background) │
//                                        └──────────────┘

import (
    "encoding/json"
    "net/http"
    "github.com/gin-gonic/gin"
    amqp "github.com/rabbitmq/amqp091-go"
)

type SendEmailRequest struct {
    To      string \`json:"to"      binding:"required,email"\`
    Subject string \`json:"subject" binding:"required"\`
    Body    string \`json:"body"    binding:"required"\`
}

type App struct {
    MQChannel *amqp.Channel
}

func (app *App) SendEmailHandler(c *gin.Context) {
    var req SendEmailRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    // Don't send email here — that could take seconds!
    // Just put it in the queue and return immediately
    body, _ := json.Marshal(req)
    app.MQChannel.Publish("", "email_tasks", false, false,
        amqp.Publishing{
            ContentType:  "application/json",
            Body:         body,
            DeliveryMode: amqp.Persistent,
        },
    )
    
    // Return 202 Accepted: "I got it, working on it"
    c.JSON(http.StatusAccepted, gin.H{
        "message": "Email queued for delivery",
        "status":  "queued",
    })
}

func main() {
    conn, _ := amqp.Dial("amqp://guest:guest@localhost:5672/")
    ch, _ := conn.Channel()
    ch.QueueDeclare("email_tasks", true, false, false, false, nil)
    
    app := &App{MQChannel: ch}
    r := gin.Default()
    r.POST("/send-email", app.SendEmailHandler)
    r.Run(":8080")
    // The worker runs in a separate process!
}`
      }
    ]
  },
  {
    id: "auth-architecture",
    title: "Auth Service Blueprint",
    icon: "🧭",
    color: "#8b5cf6",
    lessons: [
      {
        title: "Gin in This Project (Mental Model)",
        content: `Use this map when reading auth code: main.go wires dependencies + middleware + routes, handlers handle HTTP, service handles business rules, repository handles database reads/writes. Your route groups (/api/v1 then /auth) make API structure explicit and easy to scale.`,
        code: `// Project mental model
//
// main.go
//   ├─ init config + DB + Redis + RabbitMQ
//   ├─ gin.New() + middleware
//   └─ register routes under /api/v1/auth
//
// handlers/
//   ├─ parse/validate request JSON
//   ├─ call service methods
//   └─ map errors -> HTTP status and response shape
//
// service/
//   ├─ Register/Login/Refresh/Logout logic
//   ├─ password hashing + token issuing
//   └─ publish domain events
//
// repository/
//   ├─ FindByEmail, FindByPhone
//   └─ Create/Update user rows in Postgres
//
// Quick reading order for beginners:
// 1) route registration
// 2) one handler (register)
// 3) matching service method
// 4) repository calls`
      },
      {
        title: "Register + Login Flow (Production-ish)",
        content: `Register flow: validate input, enforce unique email/phone, hash password, persist user, publish USER_CREATED event, then return access+refresh tokens. Login flow: find user by email, reject deleted/invalid credentials, return fresh tokens. This is a realistic backend pattern you can reuse in interviews and production code.`,
        code: `// POST /api/v1/auth/register
// Handler
//   1) ShouldBindJSON(req)
//   2) svc.Register(req)
//   3) map errors: 409 conflict, 400 bad request, 500 internal
//
// Service.Register
//   1) ensure email unique
//   2) ensure phone unique
//   3) bcrypt hash password
//   4) set default role USER + validate
//   5) insert user into DB
//   6) publish user.created event
//   7) buildAuthResponse() -> access + refresh token
//
// POST /api/v1/auth/login
// Handler
//   1) bind request
//   2) svc.Login(req)
//   3) return 401 when credentials invalid/deleted
//
// Service.Login
//   1) find user by email
//   2) reject if missing or soft-deleted
//   3) bcrypt compare hash
//   4) buildAuthResponse() -> new tokens`
      },
      {
        title: "Redis: Refresh Tokens + Rate Limiting",
        content: `Redis solves two auth problems fast: token revocation and request throttling. Store refresh token with TTL (7d for example), verify it during refresh, and delete it on logout to revoke immediately. For rate limiting, increment route+ip counters with an expiry window. If Redis is unavailable, many systems fail open to avoid full outage.`,
        code: `// On login/register
// SET refresh:<userID> <refreshToken> EX 7d
//
// On refresh
// 1) parse refresh JWT
// 2) GET refresh:<userID>
// 3) token must match stored value
// 4) issue new tokens
//
// On logout/delete/ban
// DEL refresh:<userID>
//
// Rate limit middleware (example)
// key = ratelimit:<route>:<ip>
// count = INCR key
// if count == 1 => EXPIRE key window
// if count > limit => block 429
// if Redis error => allow request (fail open)`
      },
      {
        title: "RabbitMQ: Event-Driven Profile Sync",
        content: `Auth service publishes events like user.created and user.deleted. User service consumes them and creates/deletes profile records. This keeps services decoupled: auth doesn't need direct DB access to profile data. Use manual ack/nack and DLQ so failed messages can be retried or inspected safely.`,
        code: `// Publisher (auth-service)
// exchange: user_events (topic)
// routing keys:
//   - user.created
//   - user.deleted
//
// Consumer (user-service)
// 1) declare same exchange
// 2) bind queues:
//    user.created.queue -> user.created
//    user.deleted.queue -> user.deleted
// 3) consume with manual acknowledgements
//
// Handler logic
// on user.created => create profile row
// on user.deleted => delete profile row
// success => Ack
// failure => Nack (optionally dead-letter)`
      },
      {
        title: "Beginner Roadmap: Build It Step by Step",
        content: `Don't build everything at once. Start with auth-only Gin routes, then add Redis refresh tokens, then RabbitMQ events. This incremental path reduces confusion and gives fast wins. Practice each step with curl/Postman before moving to the next one.`,
        code: `// Step A: Minimal Gin auth
// POST /register -> validate, hash, insert user
// POST /login    -> verify password, return JWT
//
// Step B: Add Redis refresh flow
// login/register -> SET refresh:<uid>
// refresh        -> compare token with Redis value
// logout         -> DEL refresh:<uid>
//
// Step C: Add RabbitMQ (single event first)
// register -> publish user.created
// consumer -> log "user created"
// then upgrade consumer -> create profile in DB
//
// Minimal starter structure
// cmd/server/main.go
// internal/handler/auth_handler.go
// internal/service/auth_service.go
// internal/repository/user_repository.go
// internal/middleware/jwt.go
// internal/middleware/rate_limit.go`
      }
    ]
  }
];
