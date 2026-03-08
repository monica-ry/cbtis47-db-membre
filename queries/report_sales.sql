Consultas de análisis de datos, mostrar usuarios con su plan
SELECT
 u.name AS user_name,
 a.plan_type AS affliation_plan,
 s.state
FROM USER u
JOIN SUBSCRIPTION s ON u.id_user = s.id_user
JOIN AFFILIATION a ON s.id_affliation = a.id_affliation;
total de ingresos
SELECT
 SUM(amount) AS total_revenue
FROM PAY;
pagos por usuario
SELECT
 u.name,
 SUM(p.amount) AS total_paid
FROM USER u
JOIN SUBSCRIPTION s ON u.id_user = s.id_user
JOIN PAY p ON s.id_subscription = p.id_subscription
GROUP BY u.name;
