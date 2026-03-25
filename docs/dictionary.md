## USER
| Field | Type | Key | Constraints | Description |
|------|------|------|-------------|-------------|
| id_user | INT | PK | AUTO_INCREMENT | Unique user identifier |
| name | VARCHAR(100) | | NOT NULL | User full name |
| mail | VARCHAR(150) | | NOT NULL, UNIQUE | User email |
| phone | VARCHAR(20) | | | User phone number |
| password | VARCHAR(255) | | NOT NULL | Encrypted password |
---
## AFFILIATION
| Field | Type | Key | Constraints | Description |
|------|------|------|-------------|-------------|
| id_affiliation | INT | PK | AUTO_INCREMENT | Plan identifier || plan_type | VARCHAR(50) | | NOT NULL | Plan name |
| description | TEXT | | | Plan details |
| price | DECIMAL(10,2) | | NOT NULL | Plan price |
---
## SUBSCRIPTION
| Field | Type | Key | Constraints | Description |
|------|------|------|-------------|-------------|
| id_subscription | INT | PK | AUTO_INCREMENT | Subscription identifier |
| start_date | DATE | | NOT NULL | Subscription start |
| finish_date | DATE | | | Subscription end |
| state | VARCHAR(20) | | NOT NULL | Status of subscription |
| id_user | INT | FK | NOT NULL | User owner |
| id_affiliation | INT | FK | NOT NULL | Selected plan | 
---
## PAY
| Field | Type | Key | Constraints | Description |
|------|------|------|-------------|-------------|
| id_pay | INT | PK | AUTO_INCREMENT | Payment identifier |
| card_last4 | CHAR(4) | | NOT NULL | Last 4 digits of card |
| pay_date | DATE | | NOT NULL | Payment date |
| amount | DECIMAL(10,2) | | NOT NULL | Amount paid |
| id_subscription | INT | FK | NOT NULL | Related subscription |