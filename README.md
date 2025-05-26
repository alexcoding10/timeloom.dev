# 📚 Trabajo de Fin de Grado (TFG)

## 🗂️ Índice

1. [Introducción](#1-introducción)  
    1.1 [TimeLoom — ¿De dónde viene?](#11-timeloom--de-dónde-viene)  
    1.2 [Metodología](#12-metodología)

2. [Estado del Arte / Marco Teórico](#2-estado-del-arte--marco-teórico)

3. [Requisitos](#3-requisitos)  
    3.1 [Requisitos funcionales](#31-requisitos-funcionales-rf)  
    3.2 [Requisitos no funcionales](#32-requisitos-no-funcionales-rnf)

4. [Diseño](#4-diseño)  
    4.1 [Arquitectura General](#41-arquitectura-general)  
    4.2 [Diseño de Datos](#42-diseño-de-datos)  
    4.3 [Diseño de la Interfaz](#43-diseño-de-la-interfaz)

5. [Implementación](#5-implementación)  
6. [Pruebas](#6-pruebas)  
7. [Conclusiones](#7-conclusiones)  
8. [Líneas de Investigación Futuras](#8-líneas-de-investigación-futuras)  
9. [Anexos](#9-anexos)  
10. [Bibliografía](#10-bibliografía)


---
## 📌 1 Introducción

### 1.1 TimeLoom — De dónde viene

**TimeLoom** nace de la idea de gestionar la difícil tarea del control del cumplimiento del turno laboral de los trabajadores de una empresa. Está pensado para que sea accesible a cualquier empresa, garantizando el cumplimiento de horarios y optimizando la administración del personal.

En su versión final, este sistema debería facilitar la gestión de nóminas, el monitoreo del cumplimiento horario y la comunicación interna entre los trabajadores.

---

## 🧪 1.2 Metodología

El desarrollo del proyecto se abordó mediante una metodología práctica, centrada en la solución de un problema real relacionado con la gestión del control horario. Las etapas fueron:

1. **Definición del problema:**  
   Identifiqué que muchas empresas necesitan una herramienta para controlar de forma eficiente que sus empleados cumplan con los horarios establecidos.

2. **Selección del stack tecnológico:**  
   Esta etapa fue clave. Realicé una búsqueda intensiva de información para elegir tecnologías que me permitieran crear, escalar, mantener y optimizar el proyecto de forma segura y eficiente.

3. **Diseño:**  
   Se diseñaron tanto las estructuras de datos mínimas viables para la primera versión, como el aspecto gráfico de la aplicación. Investigué sobre paletas de color, tipografías, tipos de iconos, y enfoqué el diseño en ofrecer una experiencia clara e intuitiva.

4. **Implementación del software:**  
   El desarrollo del código se realizó de forma iterativa. Me aseguré de conectar backend y frontend desde el inicio, aplicando buenas prácticas de modularización y control de versiones con GitHub.

5. **Pruebas:**  
   Realicé pruebas funcionales centradas en formularios y algoritmos internos clave para asegurar que los datos importantes se mostraran correctamente al usuario final.

6. **Despliegue:**  
   Esta etapa aún está en proceso. Será la fase final, junto con el mantenimiento y posibles mejoras futuras.

En este documento encontrarás todo el proceso que me llevó a crear esta primera versión de **TimeLoom**.

---

## 🧠 2 Estado del Arte / Marco Teórico

El control horario y la gestión del cumplimiento de turnos laborales es un reto común en empresas de todos los tamaños. A lo largo de los años han surgido distintas soluciones tecnológicas para automatizar este proceso, mejorar la eficiencia y cumplir con normativas laborales.

Actualmente existen plataformas como **Factorial**, **Sesame** o **Kronos**, que ofrecen servicios avanzados de gestión de personal. Estas herramientas suelen estar orientadas a empresas medianas o grandes, y requieren suscripciones de pago, lo que puede suponer una barrera para pequeñas empresas.

Por otro lado, la mayoría de estas soluciones priorizan la gestión administrativa pero dejan de lado la experiencia del trabajador.

En cuanto a tecnologías, predominan las aplicaciones web desarrolladas con stacks como **React o Angular en el frontend** y **Node.js o Java en el backend**, con bases de datos relacionales y arquitecturas RESTful.

En cambio, se optó por un **stack moderno y flexible basado en JavaScript**, lo que permite rapidez en el desarrollo, modularidad, y una comunidad amplia. La arquitectura del sistema se basa en:

- **NestJS**: un framework backend para Node.js que sigue principios de diseño similares a los de Angular, ideal para crear APIs estructuradas y mantenibles.
- **NextJS**: framework frontend y full-stack basado en React, que permite renderizado híbrido (SSR/SSG), una gran experiencia de desarrollo y rendimiento óptimo.
- **Turborepo**: herramienta de alto rendimiento para organizar múltiples paquetes en un monorepositorio, facilitando el desarrollo modular, la compartición de código entre frontend y backend, y optimizando los tiempos de ejecución de scripts y builds.

Este stack permite construir una aplicación escalable, fácil de mantener y con una excelente experiencia de usuario, al mismo tiempo que se reduce la complejidad de despliegue gracias a la unificación del lenguaje (JavaScript/TypeScript) en todo el proyecto.

**TimeLoom** se posiciona como una solución ligera, accesible y personalizable para empresas que buscan cubrir sus necesidades básicas de control horario, comunicación y eventualmente, gestión de nóminas, sin depender de sistemas complejos o costosos.

Este proyecto busca aportar valor mediante una interfaz cuidada, un diseño funcional y una arquitectura modular que pueda escalar en el futuro.

---

## 📋 3 Requisitos

El sistema propuesto, TimeLoom, debe cumplir una serie de requisitos funcionales y no funcionales para garantizar su utilidad, escalabilidad y facilidad de uso.

### 3.1 Requisitos funcionales (RF)

- RF1: El sistema debe permitir a los trabajadores registrar su hora de entrada, pausas y salida.
- RF2: Los administradores deben poder visualizar el historial de fichajes de cada trabajador.
- RF3: El sistema debe generar reportes con las horas trabajadas por cada empleado.
- RF4: El sistema debe permitir la creación de bonus y deducciones de cada contrato.
- RF5: El sistema debe incluir un sistema básico de autenticación de usuarios.
- RF6: El sistema debe permitir la comunicación interna entre empleados (mensajería interna o notificaciones).
- RF7: El sistema debe guardar y mostrar correctamente el estado de cumplimiento del horario por parte de cada trabajador.

### 3.2 Requisitos no funcionales (RNF)

- RNF1: El sistema debe tener una interfaz intuitiva y fácil de usar.
- RNF2: La aplicación debe ser accesible desde dispositivos móviles y de escritorio.
- RNF3: El backend debe ofrecer una API REST estructurada y segura.
- RNF4: Los tiempos de respuesta del sistema no deben superar los 500ms en condiciones normales de uso.
- RNF5: El sistema debe seguir una arquitectura modular, facilitando su mantenimiento y escalabilidad.
---

## 🧱 4 Diseño

El diseño de TimeLoom se ha centrado en modularidad, escalabilidad y claridad. El modelo de datos se construyó con Prisma y PostgreSQL, organizado en torno a una arquitectura de empresa que gestiona trabajadores, turnos, horarios, incidencias, nóminas y roles.

### 4.1 Arquitectura General

El proyecto está estructurado como un monorepositorio utilizando **Turborepo**, con separación entre:

- **Frontend (NextJS):** interfaz de usuario moderna, responsive y de alto rendimiento.
- **Backend (NestJS):** API REST modular con TypeScript, usando Prisma para la capa de acceso a datos.
- **Base de datos PostgreSQL:** modelada en Prisma con relaciones fuertes y soporte para lógica empresarial compleja.

```mermaid
graph TD
    UI[Usuario]
    FE[Frontend (Next.js)]
    BE[Backend (Nest.js)]
    DB[(PostgreSQL)]
    UI --> FE
    FE --> BE
    BE --> DB
```

### 4.2 Diseño de Datos
Las entidades principales se agrupan en áreas funcionales del sistema:

🏢 **Empresa y estructura organizativa**
- Company: entidad central del sistema. Cada empresa puede tener múltiples oficinas, empleados, roles y turnos.

- Office: localización física de la empresa.

- Team, Rol, TeamRolUser, GlobalRol: gestión de equipos y roles asignados a empleados.

👥 **Gestión de empleados y contratos**
- User: representa al empleado, incluyendo perfil, oficina asignada y empresa.

- Contract: almacena información contractual como salario, tipo de contrato (FIXED, TEMPORARY, FREELANCE).

- WorkWeek, WorkHour: control de planificación y horas trabajadas (normales y extra).

⏱️ **Control horario y pausas**
- TimeEntry: registro de entrada y salida diaria de los empleados.

- TimeBreak: pausas dentro de una jornada, con duración, tipo (PauseType) y localización opcional.

🔔 **Notificaciones e incidencias**
- Notification: avisos entre responsables y empleados, con estados (PENDING, READ, etc.).

- Indicent: registro de incidencias (llegadas tarde, ausencias, etc.), con tipo (IncidentType) y estado de revisión (IncidentStatus).

💰 **Nómina y deducciones**
- Payroll: gestiona cada período de pago, incluyendo salario bruto, bonificaciones, deducciones y neto.

- Deduction y Bonus: elementos asociados al contrato que afectan el salario final.

### 4.3 Diseño de la Interfaz

Para el diseño de la interfaz se llevó a cabo un estudio exhaustivo utilizando la herramienta Figma, donde se construyó un sistema de diseño completo. A partir de este sistema se generaron varios prototipos interactivos, evaluando múltiples combinaciones de paletas de colores con el objetivo de lograr una estética profesional que transmita confianza, claridad y modernidad al usuario final.

El diseño de la UI se basa en los siguientes principios:

- ✅ **Estructura clara** con navegación lateral que permite acceder fácilmente a las secciones principales: Dashboard, Fichajes, Turnos, Nóminas, etc.

- 🎨 **Paleta de colores profesional**, seleccionada tras varias iteraciones para favorecer la legibilidad y generar una identidad visual sólida.

- 🔤 **Tipografía accesible y jerárquica**, junto a componentes visuales reutilizables que garantizan coherencia en toda la interfaz.

- 👥**Interfaces adaptadas al rol del usuario**, diferenciando entre trabajadores, administradores y responsables de RRHH, mostrando solo la información relevante en cada caso.

- 📱 **Diseño responsive** desde el inicio, asegurando la correcta visualización y usabilidad en dispositivos móviles y de escritorio.