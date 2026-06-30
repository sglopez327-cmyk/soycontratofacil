# SoyContratoFacil — App móvil

Aplicación móvil de [soycontratofacil.es](https://soycontratofacil.es) con **Expo** y **React Native**.

## Requisitos

- Node.js 20+
- [Expo Go](https://expo.dev/go) en el teléfono

## Comandos

```bash
cd app-mobile
npm install
npm start
```

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor Metro |
| `npm run android` | Android |
| `npm run ios` | iOS (macOS) |

## Arquitectura

- **UI y navegación:** solo en `app-mobile/`
- **Lógica compartida:** `../src/lib/` (configuración, validaciones, formatos)
- **Dependencias npm:** aisladas en `app-mobile/node_modules/`

Metro y Babel resuelven `@/lib/*` hacia `../src/lib/*` sin modificar la web.

## Funcionalidad

- Inicio + catálogo de 10 contratos
- Formularios nativos paso a paso
- Resumen con validación idéntica a la web
- PDF vía web (descarga nativa pendiente)

## Rama

Desarrollar en `feature/app-mobile`. La web en `main` no incluye esta carpeta.
