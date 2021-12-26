import { useRouter } from 'next/router';
import { useGetResponse } from '@frontend/shared/hooks/response';
import { useGetForm } from '@frontend/shared/hooks/form';
import Response from '../../src/components/form2/Response';
import ErrorLoading from '../../src/components/common/ErrorLoading';
import UserLayout from '../../src/components/common/UserLayout';

export default function Page() {
  const router = useRouter();
  const { _id } = router.query;
  const { data, error } = useGetResponse(_id?.toString());
  const { data: formData, error: formError } = useGetForm(data?.getResponse?.formId);

  if (error || !data || !data?.getResponse || formError || !formData) {
    return <ErrorLoading error={error} />;
  }
  return (
    <UserLayout authRequired>
      <Response form={formData?.getForm} response={data?.getResponse} />
    </UserLayout>
  );
}