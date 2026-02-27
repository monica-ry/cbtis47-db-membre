USER 
| Field    | Type   | Key |
| -------- | ------ | --- |
| id_user  | int    | PK  |
| name     | string |     |
| mail     | string |     |
| phone    | string |     |
| password | string |     |


AFFILIATION
| Field          | Type    | Key |
| -------------- | ------- | --- |
| id_affiliation | int     | PK  |
| plan_type      | string  |     |
| description    | string  |     |
| pay            | decimal |     |


SUBSCRIPTION
| Field           | Type   | Key                              |
| --------------- | ------ | -------------------------------- |
| id_subscription | int    | PK                               |
| start_date      | date   |                                  |
| finish_date     | date   |                                  |
| state           | string |                                  |
| id_user         | int    | FK → USER(id_user)               |
| id_affiliation  | int    | FK → AFFILIATION(id_affiliation) |


PAY
| Field           | Type    | Key                                |
| --------------- | ------- | ---------------------------------- |
| id_pay          | int     | PK                                 |
| card_number     | string  |                                    |
| pay_date        | date    |                                    |
| amount          | decimal |                                    |
| id_subscription | int     | FK → SUBSCRIPTION(id_subscription) |
