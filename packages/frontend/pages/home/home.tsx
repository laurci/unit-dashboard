import { useQuery } from '@apollo/client';
import { ClientCard } from '@components/client-card';
import { ErrorOops } from '@components/errors/oops';
import { Loading } from '@components/loading/loading';
import { TopbarPortal } from '@components/topbar';
import { useMemo } from 'react';
import { GetClients } from './home-queries.gql';

export default function Home() {
  const { data, loading, error } = useQuery(GetClients);

  const cards = useMemo(() => {
    return data?.clients.map((client) => <ClientCard data={client} key={client.id} />);
  }, [data?.clients]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorOops />;
  }

  return (
    <>
      <TopbarPortal>
        <h1 className="mb-2">Homepage</h1>
      </TopbarPortal>
      <div className="grid grid-cols-2 gap-6">{cards}</div>
    </>
  );
}
