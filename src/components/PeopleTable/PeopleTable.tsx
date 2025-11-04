import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
  byName: Map<string, Person>;
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  byName,
  selectedSlug,
  onSelectSlug,
}) => {
  const getMother = (p: Person) =>
    p.mother ?? (p.motherName ? byName.get(p.motherName!) : null);

  const getFather = (p: Person) =>
    p.father ?? (p.fatherName ? byName.get(p.fatherName!) : null);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((p) => {
          const mother = getMother(p);
          const father = getFather(p);

          return (
            <tr
              key={p.slug}
              data-cy="person"
              className={p.slug === selectedSlug ? 'has-background-warning' : ''}
            >
              <td onClick={() => onSelectSlug(p.slug)}>
                <Link
                  to={`/people/${p.slug}`}
                  className={p.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {p.name}
                </Link>
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>

              <td>
                {mother ? (
                  <Link to={`/people/${mother.slug}`} className="has-text-danger">
                    {mother.name}
                  </Link>
                ) : (
                  p.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{father.name}</Link>
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
