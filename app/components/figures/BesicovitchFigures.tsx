const ArrowMarker = ({ id }: { id: string }) => (
  <marker id={id} viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </marker>
);

const BG = ({ w, h }: { w: number; h: number }) => (
  <rect x={0} y={0} width={w} height={h} fill="#ffffff" rx={12} />
);

const S = {
  text: "#222222",
  muted: "#6b7280",
  line: "#b8b8b8",
  border: "#cfcfcf",
  blueFill: "#eef4ff",
  blueStroke: "#4c6ef5",
  greenFill: "#edf9f1",
  greenStroke: "#2f9e44",
  orangeFill: "#fff4e6",
  orangeStroke: "#f08c00",
  violetFill: "#f3f0ff",
  violetStroke: "#7048e8",
};

export function FigureOverlap() {
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" style={{ display: "block", margin: "1.25rem 0" }}>
      <title>Decomposition of I into K and I∖K</title>
      <defs><ArrowMarker id="arr-a" /></defs>
      <BG w={680} h={210} />

      <rect x={240} y={18} width={200} height={46} rx={10} fill="#f8f8f8" stroke={S.border} strokeWidth={0.8} />
      <text x={340} y={41} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 14, fontWeight: 500, fill: S.text }}>
        I = &#123;i &lt; k | Bᵢ ∩ Bₖ ≠ ∅&#125;
      </text>

      <line x1={300} y1={64} x2={200} y2={112} stroke={S.line} strokeWidth={1} markerEnd="url(#arr-a)" />
      <line x1={380} y1={64} x2={480} y2={112} stroke={S.line} strokeWidth={1} markerEnd="url(#arr-a)" />

      <rect x={80} y={112} width={220} height={58} rx={10} fill={S.greenFill} stroke={S.greenStroke} strokeWidth={0.9} />
      <text x={190} y={136} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 14, fontWeight: 600, fill: S.text }}>
        K
      </text>
      <text x={190} y={156} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>
        rᵢ ≤ 3rₖ,  Card(K) ≤ 20ⁿ
      </text>

      <rect x={380} y={112} width={220} height={58} rx={10} fill={S.orangeFill} stroke={S.orangeStroke} strokeWidth={0.9} />
      <text x={490} y={136} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 14, fontWeight: 600, fill: S.text }}>
        I∖K
      </text>
      <text x={490} y={156} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>
        rᵢ &gt; 3rₖ,  Card(I∖K) ≤ Lₙ
      </text>

      <line x1={190} y1={170} x2={300} y2={192} stroke={S.line} strokeWidth={0.9} markerEnd="url(#arr-a)" />
      <line x1={490} y1={170} x2={380} y2={192} stroke={S.line} strokeWidth={0.9} markerEnd="url(#arr-a)" />

      <rect x={215} y={188} width={250} height={18} rx={8} fill="#f8f8f8" stroke={S.border} strokeWidth={0.8} />
      <text x={340} y={198} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fill: S.text }}>
        Card(I) ≤ 20ⁿ + Lₙ = Mₙ
      </text>
    </svg>
  );
}

export function FigureCaseK() {
  return (
    <svg width="100%" viewBox="0 0 680 250" role="img" style={{ display: "block", margin: "1.25rem 0" }}>
      <title>Case K volume argument</title>
      <defs><ArrowMarker id="arr-b" /></defs>
      <BG w={680} h={250} />

      <circle cx={300} cy={130} r={118} fill={S.blueFill} fillOpacity={0.45} stroke={S.blueStroke} strokeWidth={1} strokeDasharray="6 4" />
      <text x={300} y={24} textAnchor="middle" style={{ fontSize: 14, fontWeight: 500, fill: S.text }}>
        B(aₖ, 5rₖ)
      </text>

      <circle cx={300} cy={130} r={38} fill="#dbeafe" fillOpacity={0.9} stroke={S.blueStroke} strokeWidth={1.4} />
      <circle cx={300} cy={130} r={3} fill={S.text} />
      <text x={300} y={126} textAnchor="middle" style={{ fontSize: 12, fill: S.text }}>aₖ</text>
      <text x={300} y={141} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>rₖ</text>

      <line x1={300} y1={130} x2={418} y2={130} stroke={S.line} strokeWidth={0.9} markerEnd="url(#arr-b)" />
      <text x={365} y={121} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>5rₖ</text>

      {([
        [208, 88, 20, "a₁"],
        [268, 194, 24, "a₂"],
        [372, 86, 18, "a₃"],
        [384, 186, 16, "a₄"],
      ] as [number, number, number, string][]).map(([cx, cy, r, label]) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={r} fill={S.greenFill} stroke={S.greenStroke} strokeWidth={1} />
          <circle cx={cx} cy={cy} r={2.5} fill={S.text} />
          <text x={cx} y={cy + 4} textAnchor="middle" style={{ fontSize: 11, fill: S.text }}>{label}</text>
        </g>
      ))}

      <text x={520} y={88} style={{ fontSize: 12, fill: S.muted }}>disjoint balls</text>
      <text x={520} y={106} style={{ fontSize: 12, fill: S.muted }}>of radius rᵢ / 3</text>
      <text x={520} y={152} style={{ fontSize: 12, fill: S.text }}>⇒ Card(K) ≤ 20ⁿ</text>
    </svg>
  );
}

export function FigureCaseIK() {
  return (
    <svg width="100%" viewBox="0 0 680 270" role="img" style={{ display: "block", margin: "1.25rem 0" }}>
      <title>Case I∖K angle argument</title>
      <defs><ArrowMarker id="arr-c" /></defs>
      <BG w={680} h={270} />

      <circle cx={300} cy={180} r={30} fill="#dbeafe" stroke={S.blueStroke} strokeWidth={1.4} />
      <circle cx={300} cy={180} r={3} fill={S.text} />
      <text x={300} y={175} textAnchor="middle" style={{ fontSize: 12, fill: S.text }}>aₖ</text>
      <text x={300} y={190} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>rₖ</text>

      <line x1={300} y1={180} x2={148} y2={82} stroke={S.line} strokeWidth={0.9} strokeDasharray="4 3" markerEnd="url(#arr-c)" />
      <line x1={300} y1={180} x2={468} y2={68} stroke={S.line} strokeWidth={0.9} strokeDasharray="4 3" markerEnd="url(#arr-c)" />
      <line x1={300} y1={180} x2={538} y2={150} stroke={S.line} strokeWidth={0.9} strokeDasharray="4 3" markerEnd="url(#arr-c)" />

      <circle cx={148} cy={82} r={48} fill={S.orangeFill} stroke={S.orangeStroke} strokeWidth={1} />
      <circle cx={148} cy={82} r={3} fill={S.text} />
      <text x={148} y={86} textAnchor="middle" style={{ fontSize: 12, fill: S.text }}>aᵢ</text>

      <circle cx={468} cy={68} r={42} fill={S.orangeFill} stroke={S.orangeStroke} strokeWidth={1} />
      <circle cx={468} cy={68} r={3} fill={S.text} />
      <text x={468} y={72} textAnchor="middle" style={{ fontSize: 12, fill: S.text }}>aⱼ</text>

      <circle cx={538} cy={150} r={36} fill={S.orangeFill} stroke={S.orangeStroke} strokeWidth={1} />
      <circle cx={538} cy={150} r={3} fill={S.text} />
      <text x={565} y={154} style={{ fontSize: 12, fill: S.text }}>aₘ</text>

      <path d="M 268 162 A 38 38 0 0 1 288 146" fill="none" stroke="#c92a2a" strokeWidth={1.2} />
      <text x={242} y={148} style={{ fontSize: 12, fill: "#c92a2a" }}>θ ≥ θ₀</text>

      <path d="M 322 146 A 38 38 0 0 1 337 154" fill="none" stroke="#c92a2a" strokeWidth={1.2} />
      <text x={342} y={140} style={{ fontSize: 12, fill: "#c92a2a" }}>θ ≥ θ₀</text>

      <text x={470} y={228} style={{ fontSize: 12, fill: S.text }}>Card(I∖K) ≤ Lₙ</text>
      <text x={470} y={246} style={{ fontSize: 12, fill: S.muted }}>separation by angle</text>
    </svg>
  );
}

export function FigureGraphColoring() {
  const edges: [number, number, number, number][] = [
    [120, 120, 230, 80],
    [120, 120, 260, 180],
    [230, 80, 370, 70],
    [230, 80, 260, 180],
    [370, 70, 480, 110],
    [260, 180, 380, 220],
    [480, 110, 560, 190],
    [380, 220, 560, 190],
    [480, 110, 380, 220],
  ];

  const nodes = [
    { cx: 120, cy: 120, label: "B₁", fill: S.violetFill, stroke: S.violetStroke },
    { cx: 370, cy: 70, label: "B₄", fill: S.violetFill, stroke: S.violetStroke },
    { cx: 560, cy: 190, label: "B₇", fill: S.violetFill, stroke: S.violetStroke },
    { cx: 230, cy: 80, label: "B₂", fill: S.greenFill, stroke: S.greenStroke },
    { cx: 380, cy: 220, label: "B₅", fill: S.greenFill, stroke: S.greenStroke },
    { cx: 260, cy: 180, label: "B₃", fill: S.orangeFill, stroke: S.orangeStroke },
    { cx: 480, cy: 110, label: "B₆", fill: S.orangeFill, stroke: S.orangeStroke },
  ];

  return (
    <svg width="100%" viewBox="0 0 680 270" role="img" style={{ display: "block", margin: "1.25rem 0" }}>
      <title>Graph coloring into disjoint families</title>
      <BG w={680} h={270} />

      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d6d6d6" strokeWidth={1} />
      ))}

      {nodes.map(({ cx, cy, label, fill, stroke }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={28} fill={fill} stroke={stroke} strokeWidth={1.2} />
          <text x={cx} y={cy + 5} textAnchor="middle" style={{ fontSize: 14, fontWeight: 600, fill: S.text }}>
            {label}
          </text>
        </g>
      ))}

      <text x={40} y={244} style={{ fontSize: 12, fill: S.muted }}>
        same color ⇒ no edge ⇒ disjoint family
      </text>
    </svg>
  );
}

export function FigureAnnuli() {
  return (
    <svg width="100%" viewBox="0 0 680 280" role="img" style={{ display: "block", margin: "1.25rem 0" }}>
      <title>Annuli decomposition for unbounded A</title>
      <defs><ArrowMarker id="arr-e" /></defs>
      <BG w={680} h={280} />

      <circle cx={300} cy={150} r={138} fill={S.blueFill} fillOpacity={0.2} stroke={S.border} strokeWidth={0.8} strokeDasharray="5 4" />
      <circle cx={300} cy={150} r={92} fill={S.orangeFill} fillOpacity={0.35} stroke={S.border} strokeWidth={0.8} strokeDasharray="5 4" />
      <circle cx={300} cy={150} r={46} fill={S.blueFill} fillOpacity={0.45} stroke={S.border} strokeWidth={0.8} strokeDasharray="5 4" />
      <circle cx={300} cy={150} r={7} fill="#ffffff" />
      <circle cx={300} cy={150} r={3} fill={S.text} />
      <text x={300} y={168} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>O</text>

      {([
        [300, 116, 254, 116, "3D", 277],
        [254, 116, 208, 116, "3D", 231],
        [208, 116, 162, 116, "3D", 185],
      ] as [number, number, number, number, string, number][]).map(([x1, y1, x2, y2, label, lx], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={S.line} strokeWidth={0.9} markerEnd="url(#arr-e)" markerStart="url(#arr-e)" />
          <text x={lx} y={y1 - 8} textAnchor="middle" style={{ fontSize: 12, fill: S.muted }}>{label}</text>
        </g>
      ))}

      <line x1={345} y1={150} x2={458} y2={106} stroke={S.line} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={464} y={104} style={{ fontSize: 13, fontWeight: 600, fill: S.text }}>A₁</text>
      <text x={464} y={120} style={{ fontSize: 12, fill: S.muted }}>0 ≤ |x| &lt; 3D</text>

      <line x1={388} y1={118} x2={458} y2={160} stroke={S.line} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={464} y={158} style={{ fontSize: 13, fontWeight: 600, fill: S.text }}>A₂</text>
      <text x={464} y={174} style={{ fontSize: 12, fill: S.muted }}>3D ≤ |x| &lt; 6D</text>

      <line x1={428} y1={150} x2={458} y2={214} stroke={S.line} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={464} y={212} style={{ fontSize: 13, fontWeight: 600, fill: S.text }}>A₃</text>
      <text x={464} y={228} style={{ fontSize: 12, fill: S.muted }}>6D ≤ |x| &lt; 9D</text>
    </svg>
  );
}