import { ApolloQueryResult, useQuery } from '@apollo/client';
import { Loading } from '@components/loading';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { auth } from '@lib/auth';
import OopsPage from '@pages/oops/oops';
import { PropsWithChildren, useRef, useState } from 'react';
import { TryLogin, TryLoginQuery } from './login.gql';

interface LoginProps {
  tryAuth: () => Promise<ApolloQueryResult<TryLoginQuery>>;
}

export function Login(props: LoginProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalidToken, setInvalidToken] = useState(false);

  const setToken = async () => {
    const token = inputRef.current?.value;

    if (!token) {
      return setInvalidToken(true);
    }

    auth.setToken(token);

    const result = await props.tryAuth();

    if (result.data.tryLogin !== true) {
      setInvalidToken(true);
    }
  };

  return (
    <div className="flex min-w-screen min-h-screen">
      <Card className="m-auto p-4 flex flex-col w-96">
        <p className="mb-4">Login</p>
        <Input ref={inputRef} className="" placeholder="Token" />
        <Button className="mt-4 ml-auto" onClick={setToken}>
          Login
        </Button>
      </Card>
    </div>
  );
}

export function LoginProvider(props: PropsWithChildren) {
  const { loading, data, error, refetch } = useQuery(TryLogin);

  if (loading) {
    return <Loading />;
  }

  if (data?.tryLogin !== true) {
    return <Login tryAuth={refetch} />;
  }

  if (error) {
    return <OopsPage />;
  }

  return <>{props.children}</>;
}
