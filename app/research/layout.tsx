export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        {[
          '/tags/analysis-icon.jpg', '/tags/analysis.jpg',
          '/tags/diffgeo-icon.jpg', '/tags/diffgeo.jpg',
          '/tags/functional-icon.jpg', '/tags/functional.jpg',
          '/tags/GMT.jpg', '/tags/measure-icon.jpg', '/tags/measure.jpg',
          '/tags/metric-icon.jpg', '/tags/metric.jpg',
          '/tags/olympiad.jpg', '/tags/pde.jpg',
          '/tags/physics-icon.jpg', '/tags/physics.jpg',
          '/subareas/elliptic.jpg', '/subareas/fractal-icon.jpg',
          '/subareas/fractal.jpg', '/subareas/minimal-icon.jpg',
          '/subareas/minimal.jpg', '/subareas/ricci-icon.jpg',
          '/subareas/ricci.jpg', '/subareas/variation-icon.jpg',
          '/subareas/variation.jpg',
        ].map(src => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </head>
      {children}
    </>
  )
}