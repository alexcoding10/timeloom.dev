# 📚 Trabajo de Fin de Grado (TFG)
![Logo](img/LogoTimeLoom.svg 'Logo')


## 🗂️ Índice General

1. **[Introducción](#-1-introducción)**  
   1.1 [TimeLoom — ¿De dónde viene?](#11-timeloom--de-dónde-viene)  
   - 1.1.1 [Instalación y puesta en marcha](#111-🚀-instalación-y-puesta-en-marcha)  
   1.2 [Metodología](#-12-metodología)  

2. **[Estado del Arte / Marco Teórico](#-2-estado-del-arte--marco-teórico)**  

3. **[Requisitos](#-3-requisitos)**  
   3.1 [Requisitos funcionales (RF)](#31-requisitos-funcionales-rf)  
   3.2 [Requisitos no funcionales (RNF)](#32-requisitos-no-funcionales-rnf)  

4. **[Diseño](#-4-diseño)**  
   4.1 [Arquitectura General](#41-arquitectura-general)  
   4.2 [Diseño de Datos](#42-diseño-de-datos)  
   4.3 [Diseño de la Interfaz](#43-diseño-de-la-interfaz)  

5. **[Implementación](#-5-implementación)**  
   - 5.1 [Estructura del proyecto](#51-estructura-del-proyecto)  
   - 5.2 [Backend (NestJS)](#52-backend-nestjs)  
   - 5.3 [Frontend (NextJS)](#53-frontend-nextjs)  
   - 5.4 [Integración entre frontend y backend](#54-integración-entre-frontend-y-backend)  

6. **[Pruebas](#6-pruebas)**  
   - 6.1 [Pruebas en el backend](#61-pruebas-en-el-backend)  
   - 6.2 [Pruebas en el frontend](#62-pruebas-en-el-frontend)  

7. **[Conclusiones](#7-conclusiones)**  

8. **[Líneas de Investigación Futuras](#8-líneas-de-investigación-futuras)**  

9. **[Anexos](#9-anexos)**  
   - Capturas de pantalla  
   - Esquemas de diseño (Figma)  

10. **[Bibliografía](#10-bibliografía)**  

---

### 🔍 Secciones Destacadas
- **Instalación**: Guía paso a paso para configurar el proyecto ([ver sección](#111-🚀-instalación-y-puesta-en-marcha)).  
- **Diseño de datos**: Modelado de entidades como `User`, `TimeEntry`, y `Payroll` ([ver sección](#42-diseño-de-datos)).  
- **Anexos**: Imágenes de la interfaz y esquemas de diseño ([ver sección](#9-anexos)).  

---
## 📌 1 Introducción

### 1.1 TimeLoom — De dónde viene

**TimeLoom** nace de la idea de gestionar la difícil tarea del control del cumplimiento del turno laboral de los trabajadores de una empresa. Está pensado para que sea accesible a cualquier empresa, garantizando el cumplimiento de horarios y optimizando la administración del personal.

En su versión final, este sistema debería facilitar la gestión de nóminas, el monitoreo del cumplimiento horario y la comunicación interna entre los trabajadores.

Perfecto. A continuación tienes una sección profesional de **Proceso de instalación y puesta en marcha del proyecto TimeLoom**, pensada para que cualquier persona (tutor, profesor o colaborador) pueda clonar, instalar y ejecutar el proyecto fácilmente.

Esta sección está pensada para proyectos con estructura monorepo usando **Turborepo**, **Node.js**, **pnpm**, **Prisma** y una base de datos PostgreSQL:

---

### 1.1.1 🚀 Instalación y puesta en marcha

A continuación se detallan los pasos necesarios para clonar y ejecutar el proyecto **TimeLoom** en local.

### 🔧 Requisitos previos

Asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/) (versión 8 o superior)
- [PostgreSQL](https://www.postgresql.org/) en local o una base de datos externa
- [Git](https://git-scm.com/)

---

### 📦 1. Clonar el repositorio

```bash
git clone https://github.com/alexcoding10/timeloom.dev.git
cd timeloom
````

---

### 📂 2. Instalar las dependencias

```bash
pnpm install
```

> ⚠️ El proyecto usa **Turborepo** con múltiples paquetes y aplicaciones. Este comando instalará las dependencias de todo el monorepo.

---

### 🔌 3. Configurar la base de datos

Crea un archivo `.env` en el directorio `apps/backend/` con la variable `DATABASE_URL` que apunte a tu base de datos PostgreSQL. Ejemplo:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/timeloom
```

> 📌 Puedes usar servicios como [Railway](https://railway.app/), [Supabase](https://supabase.com/) o tu instancia local de PostgreSQL.

---

### 🛠️ 4. Configurar Prisma

Entra al directorio del backend y ejecuta las migraciones para preparar la base de datos:

```bash
cd apps/backend

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones y crear tablas
npx prisma migrate dev
```

> Si es la primera vez que ejecutas el proyecto, esto generará el esquema completo definido en `schema.prisma`.

---

### ▶️ 5. Ejecutar el proyecto

Desde la raíz del repositorio, puedes iniciar tanto el frontend como el backend con Turborepo:

```bash
pnpm run dev
```

Este comando lanzará los servicios necesarios en paralelo.

---

### ✅ Verificación

* Backend (NestJS): [http://localhost:3030](http://localhost:3333)
* Frontend (NextJS): [http://localhost:3000](http://localhost:3000)

---

### 🛠 Herramientas útiles durante el desarrollo

* **Prisma Studio** (inspección de datos):

  ```bash
  npx prisma studio
  ```

* **DBeaver**: alternativa visual para gestionar la base de datos PostgreSQL.


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

```
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

   - Ejemplo de Company
   ```prisma
   model Company {
      id          Int         @id @default(autoincrement())
      name        String      @unique
      email       String      @unique
      address     String?
      zipCode     String?
      logoUrl     String?
      coordinates Json?
      users       User[]
      offices     Office[]
      shifts      Shift[]
      pauseTypes  PauseType[]
      rol         Rol[]
      team        Team[]
      Deduction   Deduction[]
      Bonus       Bonus[]
   }
   ```

- Office: localización física de la empresa.

- Team, Rol, TeamRolUser, GlobalRol: gestión de equipos y roles asignados a empleados.

👥 **Gestión de empleados y contratos**
- User: representa al empleado, incluyendo perfil, oficina asignada y empresa.

- Contract: almacena información contractual como salario, tipo de contrato (FIXED, TEMPORARY, FREELANCE).

- WorkWeek, WorkHour: control de planificación y horas trabajadas (normales y extra).

⏱️ **Control horario y pausas**
- TimeEntry: registro de entrada y salida diaria de los empleados.
   - Ejemplo de TimeEntry
   ```prisma
      model TimeEntry {
         id          Int         @id @default(autoincrement())
         userId      Int
         user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
         clockIn     DateTime    @default(now())
         clockOut    DateTime?
         duration    Int?
         coordinates Json?
         timebreaks  TimeBreak[] 
      }
   ```

- TimeBreak: pausas dentro de una jornada, con duración, tipo (PauseType) y localización opcional.
   - Ejemplo de TimeBreak
   ```prisma
   model TimeBreak {
      id          Int       @id @default(autoincrement())
      timeEntryId Int
      timeEntry   TimeEntry @relation(fields: [timeEntryId], references: [id])
      clockIn     DateTime  @default(now())
      clockOut    DateTime?
      duration    Int?
      coordinates Json?
      pauseTypeId Int
      pauseType   PauseType @relation(fields: [pauseTypeId], references: [id])
      description String
   }
   ```

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
---

### 💻 5 Implementación

La implementación de **TimeLoom** se llevó a cabo de forma iterativa, dividiendo el trabajo en distintas fases para asegurar la correcta integración entre los componentes y facilitar el desarrollo modular del sistema.

### 5.1 Estructura del proyecto

El sistema está organizado en un **monorepositorio** utilizando **Turborepo**, lo que permite separar claramente el frontend, el backend y los paquetes compartidos, manteniendo una base de código limpia y escalable.

```
apps/
├── web/ → Aplicación web (NextJS)
└── backend/ → API REST (NestJS)
```

Gracias al uso de un monorepositorio mediante Turborepo, es posible centralizar todos los proyectos relacionados con TimeLoom en un único entorno de desarrollo. Este enfoque no solo facilita la gestión y escalabilidad del sistema actual, sino que también abre la puerta a futuras integraciones, como el desarrollo de una aplicación nativa para Android u otras plataformas, manteniendo una estructura coherente, modular y reutilizable.

### 5.2 Backend (NestJS)

El backend fue desarrollado con **NestJS** usando **TypeScript** y **Prisma ORM** para interactuar con una base de datos PostgreSQL.

Principales características:
- Modularización por funcionalidades (auth, users, payroll, etc.).
- Controladores RESTful con validación y DTOs.
- Uso de servicios y repositorios para mantener una arquitectura limpia.
- Prisma como ORM para manejar las entidades y relaciones del sistema.

### 5.3 Frontend (NextJS)

La interfaz de usuario fue desarrollada con **NextJS**, permitiendo un renderizado híbrido (SSR y SSG), ideal para escalar el proyecto y mejorar la experiencia del usuario.

Características clave:
- Componentes reutilizables construidos con React y TypeScript.
- Manejo del estado local y global.
- Comunicación con el backend a través de llamadas a la API.
- Diseño responsive basado en el sistema definido en Figma.

### 5.4 Integración entre frontend y backend

La integración entre frontend y backend se realizó mediante una **API REST desarrollada en NestJS**, consumida desde el frontend construido en NextJS. Se implementaron rutas seguras con control de autenticación y autorización basado en el rol del usuario.

En cuanto a la seguridad, se prestó especial atención al manejo de sesiones. En el módulo de autenticación, una vez que el backend valida las credenciales del usuario, se genera un **token JWT** que se envía al frontend en forma de **cookie HTTP-only**. Esto garantiza que el token **no sea accesible desde el entorno del navegador**, protegiendo así contra ataques XSS. Todas las peticiones protegidas deben incluir este token como credencial para que el backend las valide mediante los **guards** definidos.

En el frontend, las llamadas a la API están encapsuladas en **hooks personalizados**, que se conectan a **contextos específicos**. Esto permite organizar y reutilizar la lógica de comunicación con el backend en cada componente de React, favoreciendo la modularidad y el mantenimiento del código.

- Hook useAhut, obtiene el usuario autentificado y hace el logout:
  ```typescript
   import { URL_BACKEND_DEV } from "@/utils/config";
   import { useEffect, useState } from "react";

   export const useAuth = () => {
   const [user, setUser] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const logout = () => {
      //elimina el token y el usuario
      //el token se elimina desde el back
      fetch(`${URL_BACKEND_DEV}/auth/logout`,{
         method:'GET',
         credentials:"include"
      })
      setUser(null); // hace que vaya al login
   };

   const fetchUser = async () => {
      setLoading(true);
      try {
         const response = await fetch(`${URL_BACKEND_DEV}/auth/me`, {
         method: "GET",
         credentials: "include",
         });
         const data = await response.json();

         if (data.success) {
         setUser(data.data);
         } else {
         setUser(null);
         setError(data.message);
         }
      } catch (err) {
         setUser(null);
         setError("Error en la autenticación");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchUser();
   }, []);

   return { user, loading, error, fetchUser, logout };
   };

  ```
- UseMemo que crea el dato para las gráficas:
  ```typescript
      const cols: Col[] = useMemo(() => {
      if (!options || options.length === 0) return [];
      const fristDay = options[0].day;

      const numberColsWithInfo =  getCalendarDayDiff(new Date(),new Date(fristDay))
      //console.log(options,numberColsWithInfo)
      return new Array(numberCols).fill(null).map((_, idx) => {
         const day = formatDate(
         new Date(
            new Date().setDate(new Date().getDate() - (numberCols - idx) + 1)
         ).toISOString(),
         "dd/mm/yyyy"
         );

         if (idx >= numberCols - numberColsWithInfo) {
         const option = options.find(option => formatDate(option.day,'dd/mm/yyyy')=== day)
         const timebreaks = option?.timebreaks || [];

         return {
            value: timebreaks.length || 0,
            timebreaks,
            day,
         };
         }
         //esta entrando aqui en el primer render
         return { value: 0, timebreaks: [], day };
      });
   }, [options, numberCols]);
  ```

El proceso de integración incluyó:

- Uso de control de versiones con **Git y GitHub**.
- Pruebas manuales para validar el correcto funcionamiento de los endpoints.
- Gestión y evolución del esquema de datos con **Prisma Migrate**.
- Revisión y supervisión del estado de la base de datos mediante herramientas como **DBeaver** y **Prisma Studio**.

Perfecto. Aquí tienes la sección **Pruebas** redactada de forma profesional, clara y adaptada a tu proyecto. Explica el enfoque de pruebas manuales tanto en el backend como en el frontend, el uso de herramientas como Postman y la validación de los requisitos funcionales.

---

## 6 Pruebas

Durante el desarrollo de **TimeLoom**, se realizaron **pruebas manuales de forma continua** para verificar el cumplimiento de los requisitos funcionales y asegurar la estabilidad general del sistema.

El proceso de pruebas se dividió en dos niveles principales:

### 6.1 Pruebas en el backend

Para validar la correcta implementación de los endpoints de la API REST construida con NestJS, se utilizaron herramientas como **Postman** y **Thunder Client**. Estas pruebas incluyeron:

- Validación de rutas protegidas mediante autenticación JWT.
- Comprobación del correcto manejo de errores (usuarios inexistentes, peticiones mal formateadas, etc.).
- Verificación de relaciones y estructuras de datos complejas (usuarios, turnos, contratos, incidencias...).
- Inspección directa de la base de datos mediante **Prisma Studio** y **DBeaver** para confirmar la persistencia de los datos.

Se probaron todos los módulos críticos como:
- Autenticación y autorización.
- Gestión de fichajes (TimeEntry).
- Registro y actualización de incidencias.

### 6.2 Pruebas en el frontend

En el frontend desarrollado con NextJS, se realizaron pruebas manuales de usabilidad y flujo funcional, centradas en los siguientes aspectos:

- Comprobación del comportamiento esperado en formularios (login, registro de turnos, fichaje...).
- Validación visual y funcional de los distintos roles de usuario (trabajador, administrador, responsable).
- Verificación de navegación, redirecciones protegidas y rutas seguras según el estado de autenticación.
- Observación del manejo del estado global mediante contextos y hooks personalizados para asegurar una correcta sincronización con la API.

Además, se probaron distintos escenarios de uso, incluyendo errores intencionados, cambios de conexión, y uso en distintos dispositivos o tamaños de pantalla para garantizar un comportamiento coherente.


> Estas pruebas permitieron detectar errores en etapas tempranas, refinar flujos de usuario y confirmar que la aplicación cumple con los **requisitos funcionales y no funcionales** definidos previamente.

---
## 7 Conclusiones

El desarrollo de **TimeLoom** ha representado una oportunidad clave para consolidar y aplicar de forma práctica todos los conocimientos técnicos adquiridos durante mi formación en **Cesur**, especialmente en el ámbito del desarrollo web full-stack y la arquitectura de software moderno.

A lo largo del proyecto, he trabajado en la creación de un sistema funcional para el control horario empresarial, accesible, escalable y adaptable a diferentes contextos organizativos. Este proceso no solo me ha permitido profundizar en el uso de tecnologías actuales como **NestJS**, **NextJS**, **Prisma** y **PostgreSQL**, sino también en aspectos clave como la organización del código, la seguridad, el diseño de interfaces y la estructuración de un monorepositorio con **Turborepo**.

Una de las partes más enriquecedoras del desarrollo ha sido la creación de una interfaz clara y profesional, basada en un sistema de diseño desarrollado en **Figma**, que ha servido como guía para mantener la coherencia visual y mejorar la experiencia de usuario. A su vez, el backend fue diseñado con un enfoque modular y seguro, integrando autenticación mediante JWT, validaciones robustas y control de acceso según roles, lo que garantiza una base sólida para su mantenimiento y evolución futura.

Además, he aprendido a estructurar mi trabajo de forma más eficiente, implementando un flujo de desarrollo limpio, versionado con Git y orientado a la escalabilidad. Aunque algunas funcionalidades se encuentran aún en proceso o pendientes de despliegue, el resultado alcanzado representa una base sólida sobre la cual continuar trabajando y mejorando la aplicación.

En definitiva, **TimeLoom** ha sido el reflejo práctico de mi etapa como estudiante, permitiéndome integrar todo lo aprendido en un proyecto real y funcional, que no solo resuelve un problema común en el ámbito empresarial, sino que también me ha preparado para afrontar nuevos retos en el desarrollo de software profesional.


---

## 8 Líneas de Investigación Futuras

Este proyecto, aunque funcional, está concebido como la **primera versión de una plataforma en crecimiento**. Algunas ideas y mejoras que podrían abordarse en futuras iteraciones son:

- 📱 **Desarrollo de una aplicación móvil nativa** (por ejemplo, con React Native) integrada en el mismo monorepositorio, para facilitar el fichaje desde dispositivos móviles.
- 🔐 **Implementación de tests automatizados** (unitarios, de integración y end-to-end) para garantizar la fiabilidad del sistema a medida que crezca.
- 📊 **Panel de análisis y estadísticas** para responsables y administradores, con visualizaciones gráficas del rendimiento, ausencias, y cumplimiento horario.
- 📝 **Sistema avanzado de comunicación interna**, con historial de mensajes, archivos adjuntos y alertas en tiempo real.
- 🌐 **Internacionalización (i18n)** para que la interfaz pueda adaptarse a múltiples idiomas.
- ☁️ **Despliegue en la nube con infraestructura automatizada** (CI/CD con GitHub Actions, Vercel, Railway, Docker...).

Estas líneas de mejora permitirían que **TimeLoom** evolucione desde una herramienta básica de control horario hacia una **solución integral de gestión de personal**, adaptable a entornos empresariales reales.

## 9 Anexos

A continuación se incluyen recursos adicionales que complementan el desarrollo del proyecto:

- Capturas de pantalla de la interfaz en diferentes dispositivos.

### ***Incio sesion web***

![Imagen de regisitro web](img/webinicio.PNG)

### ***Incio sesion movil***

![Imagen de regisitro web](img/webinicioMv.PNG)

### ***Fichaje web***

![Imagen de regisitro web](img/timelom.PNG)

### ***Fichaje  movil***

![Imagen de regisitro web](img/fichajemv.PNG)


- Esquemas visuales del sistema de diseño elaborado en Figma.

### ***Diseño del color***

![Imagen de regisitro web](img/colorDesigner.png)

### ***Diseño del Texto***

![Imagen de regisitro web](img/TextDesigner.png)

### ***Mockup de Dahsboard propuesto***

![Imagen de regisitro web](img/mokupDashboard.PNG)

## 10 Bibliografía

Durante el desarrollo de TimeLoom se consultaron las siguientes fuentes y tecnologías:

- [Prisma](https://www.prisma.io/) – ORM para TypeScript y Node.js
- [Tailwind CSS](https://tailwindcss.com/) – Framework de estilos utilitario para diseño responsive
- [Next.js](https://nextjs.org/) – Framework React para desarrollo frontend y full-stack
- [NestJS](https://nestjs.com/) – Framework backend progresivo basado en Node.js
- [Turborepo](https://turbo.build/repo) – Herramienta para monorepositorios de alto rendimiento
- [ChatGPT](https://chat.openai.com/) – Asistencia en redacción técnica

---
