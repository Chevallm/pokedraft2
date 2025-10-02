import React, {useMemo} from "react";

/**
 * Kiviat / Radar chart as an SVG React component.
 * - Draws a radial gradient background from 0 -> maxValue
 * - Draws concentric polygon grid (levels)
 * - Draws the polygon representing the provided stats
 * - Re-renders when `stats` changes (so it "écoute" un state React)
 *
 * Usage:
 * <KiviatRadar stats={myState} size={360} maxValue={31} levels={6} />
 */
export default function KiviatRadar({
                                        stats,
                                        selectStat,
                                        size = 450,
                                        maxValue = 255,
                                        levels = 6,
                                        className = "",
                                        gradientFrom = "#0ea5e9",
                                        gradientTo = "#1e293b",
                                    }) {
    const padding = 28; // leave space for labels
    const cx = size / 2;
    const cy = size / 2;
    const radius = Math.max(24, (size / 2) - padding);

    const axes = useMemo(() => ["hp", "atk", "def", "spa", "spd", "spe"], []);

    const values = useMemo(() => [
        stats.hp.value ?? 0,
        stats.atk.value ?? 0,
        stats.def.value ?? 0,
        stats.spa.value ?? 0,
        stats.spd.value ?? 0,
        stats.spe.value ?? 0,
    ], [stats]);

    const count = axes.length;

    const angleForIndex = (i) => (Math.PI * 2 * i) / count - Math.PI / 2; // start at top

    const pointAt = (value, i) => {
        const angle = angleForIndex(i);
        const r = Math.max(0, Math.min(1, value / maxValue)) * radius;
        return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    };

    const polygonPoints = useMemo(() => values.map((v, i) => pointAt(v, i).join(",")).join(" "), [values.join('|'), size]);

    // grid polygons for each level
    const gridPolygons = new Array(levels).fill(0).map((_, levelIndex) => {
        const levelValue = ((levelIndex + 1) / levels) * maxValue; // >0..max
        const pts = new Array(count).fill(0).map((__, i) => pointAt(levelValue, i).join(",")).join(" ");
        return {pts, value: Math.round(levelValue)};
    });

    // labels at the ends of axes
    const axisLabels = axes.map((label, i) => {
        const [x, y] = pointAt(maxValue, i);
        // push labels a bit further out
        const angle = angleForIndex(i);
        const labelRadius = radius + 12;
        const lx = cx + labelRadius * Math.cos(angle);
        const ly = cy + labelRadius * Math.sin(angle);
        const display = {
            hp: "HP",
            atk: "ATK",
            def: "DEF",
            spa: "SPA",
            spd: "SPD",
            spe: "SPE",
        };
        return {
            label: display[label] ?? label,
            x: lx,
            y: ly,
            anchor: Math.abs(Math.cos(angle)) < 0.2 ? "middle" : (Math.cos(angle) > 0 ? "start" : "end")
        };
    });

    return (
        <div className={`inline-block ${className}`}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Kiviat radar chart">
                <defs>
                    <radialGradient id="kiviat-bg-grad" cx="50%" cy="50%" r="70%">
                        <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.12"/>
                        <stop offset="70%" stopColor={gradientTo} stopOpacity="0.24"/>
                        <stop offset="100%" stopColor={gradientTo} stopOpacity="0.36"/>
                    </radialGradient>

                    <linearGradient id="kiviat-fill-grad" x1="0%" x2="100%">
                        <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.66"/>
                        <stop offset="100%" stopColor={gradientTo} stopOpacity="0.34"/>
                    </linearGradient>

                    <filter id="kiviat-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12"/>
                    </filter>
                </defs>

                {/* background circle with radial gradient
                <circle cx={cx} cy={cy} r={radius + 6} fill="url(#kiviat-bg-grad)" />
                */}
                {/* grid polygons */}
                <g strokeWidth={1} strokeOpacity={0.6} fill="none">
                    {gridPolygons.map((g, idx) => (
                        <polygon key={idx} points={g.pts} stroke="#94a3b8"
                                 strokeOpacity={0.25 + (idx / levels) * 0.25}/>
                    ))}
                </g>

                {/* radial axis lines */}
                <g stroke="#cbd5e1" strokeOpacity={0.2}>
                    {new Array(count).fill(0).map((_, i) => {
                        const [x, y] = pointAt(maxValue, i);
                        return <line key={i} x1={cx} y1={cy} x2={x} y2={y}/>;
                    })}
                </g>

                {/* axis end small ticks and numeric labels (maxValue) */}
                <g>
                    {axisLabels.map((a, i) => (
                        <g key={i}>
                            <text
                                x={a.x}
                                y={a.y}
                                className="cursor-pointer"
                                onClick={() => selectStat(a.name)}
                                textAnchor={a.anchor}
                                fontSize={12}
                                fontFamily="Inter, system-ui, sans-serif"
                                fill="#0f172a">
                                {a.label}
                            </text>
                        </g>
                    ))}
                </g>

                {/* filled polygon representing the stats */}
                <g>
                    <polygon
                        points={polygonPoints}
                        fill="url(#kiviat-fill-grad)"
                        stroke={gradientFrom}
                        strokeWidth={2}
                        fillOpacity={0.56}
                        filter="url(#kiviat-shadow)"
                    />

                    {/* small nodes on vertices */}
                    {values.map((v, i) => {
                        const [x, y] = pointAt(v, i);
                        return <circle key={i} cx={x} cy={y} r={2} fill="#fff" stroke={gradientFrom}
                                       strokeWidth={1.5}/>;
                    })}
                </g>

                {/* tooltip-ish values near each vertex */}
                <g>
                    {values.map((v, i) => {
                        const angle = angleForIndex(i);
                        const [x, y] = pointAt(v, i);
                        const offset = 14;
                        const tx = x + Math.cos(angle) * offset;
                        const ty = y + Math.sin(angle) * offset + 4;
                        return (
                            <text key={i} x={tx} y={ty} fontSize={10} textAnchor="middle"
                                  fill="#0b1220">{Math.round(v)}</text>
                        );
                    })}
                </g>

            </svg>
        </div>
    );
}
