# DIAGRAMA ER (MERMAID)
```mermaid
erDiagram
USERS ||--o{ SUBSCRIPTION : tiene
AFFILIATION ||--o{ SUBSCRIPTION : define
SUBSCRIPTION ||--o{ PAYMENTS : genera
USERS ||--o{ MESSAGES : envía
USERS {
int id
string username
string email
string phone
string password
string role
datetime created_at
}
AFFILIATION {
int id
string name
decimal price
string duration
string description
string benefits
datetime created_at
}
SUBSCRIPTION {
int id
date start_date
date finish_date
string state
int id_user
int id_affiliation
boolean used
datetime used_at
datetime created_at
}
PAYMENTS {
int id
decimal amount
int id_subscription
datetime payment_date
datetime created_at
}
MESSAGES {
int id
int user_id
string message
datetime timestamp
boolean from_admin
string response
string status
datetime answered_at
}
GAMES {
int id
string name
string description
string image
string status
datetime created_at
}
RESTAURANTS {
int id
string name
string type
string description
string image
}
EVENTS {
int id
string name
date start_date
date end_date
string description
string image
datetime created_at
}
PARK_INFO {
int id
string park_name
string location
string description
string open_time
string close_time
string open_days
string phone
string email
datetime updated_at
}
