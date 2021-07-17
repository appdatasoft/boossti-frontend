import InitialLoading from './InitialLoading';
import ShowError from './ShowError';

export default function ErrorLoading({ error, loading }: any) {
  if (error) {
    return <ShowError error={error} />;
  }
  return <InitialLoading />;
}
