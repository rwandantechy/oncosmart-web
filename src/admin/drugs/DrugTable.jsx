import { DRUGS } from "../../content/drugs";

export default function DrugTable({ drugs, loading }) {
  const copy = DRUGS.table;

  if (loading) {
    return <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">Loading…</p>;
  }

  return (
    <div className="drug-table-wrap">
      <table className="drug-table">
        <thead>
          <tr>
            <th scope="col">{copy.name}</th>
            <th scope="col">{copy.info}</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug.id}>
              <td>
                <strong>{drug.name}</strong>
                <span className="drug-table-slug">{drug.id}</span>
              </td>
              <td>
                <a href={drug.info_url} target="_blank" rel="noopener noreferrer">
                  {copy.openLabel}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
