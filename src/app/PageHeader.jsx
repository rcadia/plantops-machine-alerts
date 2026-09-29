export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="page-header">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </header>
  );
}
