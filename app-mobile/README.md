# SoyContratoFacil — App móvil

Aplicación móvil de [soycontratofacil.es](https://soycontratofacil.es) construida con **Expo** y **React Native**.

## Requisitos

- Node.js 20+
- [Expo Go](https://expo.dev/go) en tu teléfono (desarrollo) o Android Studio / Xcode (builds nativos)

## Comandos

Desde la carpeta `app-mobile`:

```bash
npm install
npm start
```

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo (Metro) |
| `npm run android` | Abre en emulador o dispositivo Android |
| `npm run ios` | Abre en simulador iOS (solo macOS) |
| `npm run web` | Vista previa en navegador |

## Estructura

```
app-mobile/
├── app/                 # Rutas (Expo Router)
│   ├── (tabs)/          # Pestañas: Inicio y Contratos
│   └── modal.tsx        # Guía de uso
├── components/          # UI reutilizable
├── constants/           # Colores, contratos y config
└── assets/              # Iconos y fuentes
```

## Estado actual

Versión inicial con:

- Pantalla de inicio con marca SoyContratoFacil
- Listado de los 10 tipos de contrato (arrendamientos, compraventa, gestión)
- Enlace a la web para completar formularios y descargar PDF

## Próximos pasos sugeridos

1. Formularios nativos reutilizando la lógica de `src/lib/` de la web
2. Generación y descarga de PDF en el dispositivo
3. Publicación en Google Play y App Store (EAS Build)

## Monorepo

Este proyecto convive con la web Next.js en la raíz del repositorio (`contratos-web`). Cada uno tiene sus propias dependencias en su carpeta.
