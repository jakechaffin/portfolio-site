export default function ProjectCard({ p }) {
  return (
    <article className="card">
      <div className="thumb">
        <img src={p.image} alt={p.title} loading="lazy" />
      </div>
      <h3>{p.title}</h3>
      <p className="muted">{p.summary}</p>

      <div className="tags">
        {p.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="actions">
        <a href={p.demo} target="_blank" rel="noopener noreferrer">
          Live
        </a>
        <a href={p.repo} target="_blank" rel="noopener noreferrer">
          Code
        </a>
      </div>
    </article>
  );
}
