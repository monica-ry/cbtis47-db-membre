The SQL Tester (QA / Breaker)
Su tarea es verificar que la base de datos funcione correctamente y que no se puedan hacer operaciones 
que rompan la integridad de los datos.
Debe intentar “romper” la base de datos para encontrar errores lógicos, violaciones de llaves foráneas, 
duplicados o inserciones inválidas.
Explicación de la estrategia
Para cumplir la función, creamos un archivo de pruebas test_cases.sql, donde insertamos datos que 
deberían fallar debido a las restricciones de la base de datos, como:
• Usuarios duplicados (campo email es UNIQUE)
• Suscripciones asignadas a usuarios que no existen (FOREIGN KEY)
• Pagos con IDs de suscripción que no existen (FOREIGN KEY)
• Usuarios sin campos obligatorios (NOT NULL) como username
Esto nos permite verificar que las restricciones realmente protegen la integridad de la 
información.”
*Lo que está en paréntesis sería lo que se encarga de que eso no pase.
Explicación del objetivo
• El objetivo de estas pruebas no es romper la base de datos sin sentido, sino garantizar que los 
datos inválidos no puedan entrar, asegurando consistencia y confiabilidad de nuestro sistema. 
Esto es clave para evitar errores en producción, como pagos registrados a usuarios que no 
existen o planes duplicados.”
Así es como se ve en mysql
Por ejemplo, cuando intentamos agregar un usuario con un email ya existente (liz@mail.com), MySQL 
nos devolvió un error Duplicate entry, mostrando que la restricción UNIQUE funciona correctamente.
Al intentar agregar una suscripción para un usuario que no existe (id_user = 999), MySQL bloqueó la 
inserción con un error de FOREIGN KEY. Lo mismo sucedió al intentar un pago con una suscripción 
inexistente.
Incluso al intentar insertar un usuario sin username, MySQL nos dio un warning indicando que este 
campo no tiene valor por defecto. Esto demuestra que nuestras restricciones NOT NULL también están 
funcionando.
