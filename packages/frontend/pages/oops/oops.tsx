import { ErrorOops } from '@components/errors/oops';
import { Layout } from '@components/layout';

export default function OopsPage() {
  return (
    <Layout>
      <ErrorOops />
    </Layout>
  );
}
