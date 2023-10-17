import { useQuery } from '@apollo/client';
import { Loading } from '@components/loading/loading';
import { TopbarPortal } from '@components/topbar';
import { GetClients } from './home.gql';

export default function Home() {
  const { data, loading, error } = useQuery(GetClients);

  if (loading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <>
      <TopbarPortal>
        <h1 className="mb-2">Home page</h1>
      </TopbarPortal>

      
    </>
  );
}
