# Deuna Negocios

Web app Next.js 16 para dueñ@s de negocios de barrio. En este primer pase sólo
está implementado el módulo **Promociones** (lanzar campañas de descuentos y
ver el alcance estimado). Inspirado en la estética de YaPass.

## Pantallas

| Ruta | Estado | Descripción |
| --- | --- | --- |
| `/` | stub | Inicio (balance + accesos rápidos) — pendiente |
| `/mi-caja` | stub | Teclado + QR de cobro — pendiente |
| **`/promociones`** | ✅ | Lanza Tu Próxima Campaña (4 tipos a elegir) |
| **`/promociones/alcance`** | ✅ | Alcance De Tu Campaña (estadísticas + estimación) |
| `/tu` | stub | Perfil del administrador |

## Atomic Design

```
src/components/deuna/
  atoms/       → AmountText · Avatar · Badge · BusinessMascot · Button
                 Divider · Emoji · IconButton · Input · PercentPill
                 ProgressBar · SpinnerRing
  molecules/   → CampaignTypeCard · Card · PeopleStack · StatsChart
  organisms/   → BusinessHeader · PopupModal
```

Los tokens de color viven en `src/app/globals.css` (`@theme`). Cambiar
`--color-primary` re-brandea toda la app.

## PNGs pendientes

Los siguientes slots ya están cableados y aceptan `src` — basta con dejar los
PNG en `public/assets/` y pasar la ruta:

1. **Mascota con canasta** (`<BusinessMascot src="/assets/mascot-basket.png" />`)
2. **Gráfico de estadísticas** (`<StatsChart src="/assets/stats-hero.png" />`)
3. **Pirámide de personas** (`<PeopleStack src="/assets/people-stack.png" />`)

Sin los PNGs se muestran fallbacks SVG inline.

## Dev

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # producción
npm run lint
```
