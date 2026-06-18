"use client";

import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/utils";

interface RegionFeature {
  type: string;
  properties: {
    id: string;
    nome: string;
    populacao: number;
    densidade: number;
    renda_media: number;
    area_km2: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface GeoJSON {
  type: string;
  features: RegionFeature[];
}

const METRIC_CONFIG = {
  densidade: {
    label: "Densidade demográfica",
    unit: "hab/km²",
    min: 1850,
    max: 13800,
    format: (v: number) => `${formatNumber(v)} hab/km²`,
  },
  populacao: {
    label: "População estimada",
    unit: "habitantes",
    min: 29000,
    max: 52000,
    format: (v: number) => `${formatNumber(v)} hab.`,
  },
};

type Metric = keyof typeof METRIC_CONFIG;

function lerp(t: number, low: string, high: string): string {
  const hexToRgb = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  });
  const lo = hexToRgb(low);
  const hi = hexToRgb(high);
  const r = Math.round(lo.r + (hi.r - lo.r) * t);
  const g = Math.round(lo.g + (hi.g - lo.g) * t);
  const b = Math.round(lo.b + (hi.b - lo.b) * t);
  return `rgb(${r},${g},${b})`;
}

function getColor(value: number, min: number, max: number): string {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return lerp(t, "#a8edce", "#0A4F3C");
}

interface Props {
  metric?: Metric;
}

export default function BarueriMap({ metric = "densidade" }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    let L: typeof import("leaflet");
    let map: import("leaflet").Map;

    (async () => {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      map = L.map(mapRef.current!, {
        center: [-23.508, -46.876],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      instanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        opacity: 0.3,
      }).addTo(map);

      const geojson: GeoJSON = await fetch("/barueri-geojson.json").then((r) => r.json());
      const cfg = METRIC_CONFIG[metric];

      L.geoJSON(geojson as never, {
        style: (feature) => {
          const val = (feature as RegionFeature).properties[metric];
          return {
            fillColor: getColor(val, cfg.min, cfg.max),
            fillOpacity: 0.82,
            color: "#ffffff",
            weight: 2,
          };
        },
        onEachFeature: (feature, layer) => {
          const p = (feature as RegionFeature).properties;
          const val = p[metric];
          layer.bindTooltip(
            `<div style="font-family:Inter,sans-serif;min-width:160px">
              <strong style="font-size:13px">${p.nome}</strong><br/>
              <span style="color:#6B7280;font-size:11px">${cfg.label}</span><br/>
              <span style="font-size:15px;font-weight:700;color:#0A4F3C">${cfg.format(val)}</span><br/>
              <hr style="margin:4px 0;border-color:#e5e7eb"/>
              <span style="font-size:11px;color:#6B7280">Pop.: ${formatNumber(p.populacao)} hab.</span><br/>
              <span style="font-size:11px;color:#6B7280">Área: ${p.area_km2} km²</span>
            </div>`,
            { sticky: true, opacity: 1, className: "barueri-tooltip" }
          );
          layer.on({
            mouseover: (e) => {
              e.target.setStyle({ fillOpacity: 1, weight: 3, color: "#00C896" });
            },
            mouseout: (e) => {
              e.target.setStyle({ fillOpacity: 0.82, weight: 2, color: "#ffffff" });
            },
          });
        },
      }).addTo(map);
    })();

    return () => {
      if (instanceRef.current) {
        (instanceRef.current as import("leaflet").Map).remove();
        instanceRef.current = null;
      }
    };
  }, [metric]);

  const cfg = METRIC_CONFIG[metric];

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height: 380, borderRadius: 12, overflow: "hidden" }} />

      {/* Legenda */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow-md z-[1000]">
        <p className="text-[10px] text-[var(--color-muted)] mb-1.5 font-medium uppercase tracking-wide">
          {cfg.label}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-muted)]">Menor</span>
          <div
            className="w-24 h-3 rounded-full"
            style={{ background: "linear-gradient(to right, #a8edce, #0A4F3C)" }}
          />
          <span className="text-[10px] text-[var(--color-muted)]">Maior</span>
        </div>
        <div className="flex justify-between text-[10px] text-[var(--color-muted)] mt-0.5">
          <span>{formatNumber(cfg.min)}</span>
          <span>{formatNumber(cfg.max)} {cfg.unit}</span>
        </div>
      </div>

      {/* Hint scroll */}
      <p className="text-[10px] text-[var(--color-muted)] text-center mt-2">
        Passe o cursor sobre cada região para ver detalhes
      </p>
    </div>
  );
}
