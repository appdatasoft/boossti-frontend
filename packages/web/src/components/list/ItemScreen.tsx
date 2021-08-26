import { useState } from 'react';
import { useGetListItemBySlug, useDeleteListItem } from '@frontend/shared/hooks/list';
import { useCRUDListItems } from '@frontend/shared/hooks/list';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import ImageList from '../post/ImageList';
import NotFound from '../common/NotFound';
import FieldValues from '../field/FieldValues';
import ActionButtons from '../list/ActionButtons';
import InlineForm from '../list/InlineForm';
import MediaForm from '../list/MediaForm';
import { onAlert } from '../../utils/alert';

interface IProps {
  slug: any;
  typeSlug: any;
  hideBreadcrumbs?: boolean;
}

export default function Screen({ slug, typeSlug, hideBreadcrumbs = false }: IProps) {
  const router = useRouter();
  const [state, setState] = useState({ fieldName: '' });
  const deleteCallBack = () => {
    router.push(`/types/${typeSlug}`);
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug) {
      router.push(`/types/${typeSlug}/${newSlug}`);
    }
  };
  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });

  const { data, loading, error } = useGetListItemBySlug({ slug });

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    setFormValues,
    CRUDLoading,
  } = useCRUDListItems({
    onAlert,
    updateCallBack,
  });

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  const onEdit = (fieldName) => {
    setFormValues(data.getListItemBySlug);
    setState({ ...state, fieldName });
  };

  if (error || !data) {
    return <ErrorLoading error={error} />;
  } else if (!data.getListItemBySlug) {
    return <NotFound />;
  }

  return (
    <>
      {!hideBreadcrumbs && (
        <div className="d-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href="/types">Types</Link>
            <Link href={`/types/${data.getListItemBySlug.types[0].slug}`}>
              <a>{data.getListItemBySlug.types[0].title}</a>
            </Link>
            <Typography color="textPrimary">
              {data.getListItemBySlug.title.includes('-n-e-w')
                ? 'Title'
                : data.getListItemBySlug.title}
            </Typography>
          </Breadcrumbs>
          <ActionButtons
            hideEdit
            onDelete={() => handleDelete(data.getListItemBySlug._id, deleteCallBack)}
          />
        </div>
      )}
      <Paper variant="outlined" className="p-2 pb-5">
        {state.fieldName === 'title' ? (
          <InlineForm
            fieldName={state.fieldName}
            label="Title"
            onCancel={onCancel}
            formik={formik}
            formLoading={CRUDLoading}
          />
        ) : (
          <Typography variant="h4" className="d-flex align-items-center">
            {data.getListItemBySlug.title.includes('-n-e-w')
              ? 'Title'
              : data.getListItemBySlug.title}
            <Tooltip title="Edit Title">
              <IconButton onClick={() => onEdit('title')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        )}
        {state.fieldName === 'description' ? (
          <InlineForm
            multiline
            fieldName={state.fieldName}
            label="Description"
            onCancel={onCancel}
            formik={formik}
            formLoading={CRUDLoading}
          />
        ) : (
          <Typography>
            {data.getListItemBySlug.description || 'Description'}
            <Tooltip title="Edit Description">
              <IconButton onClick={() => onEdit('description')}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        )}
        {state.fieldName === 'media' ? (
          <MediaForm
            state={crudState}
            setState={setCrudState}
            onCancel={onCancel}
            onSave={formik.handleSubmit}
            loading={CRUDLoading}
          />
        ) : (
          <>
            <Typography className="d-flex align-items-center">
              Media
              <Tooltip title="Edit Description">
                <IconButton onClick={() => onEdit('media')}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <ImageList media={data.getListItemBySlug.media} />
          </>
        )}
        <FieldValues
          parentId={data.getListItemBySlug._id}
          typeId={data.getListItemBySlug.types[0]._id}
        />
      </Paper>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </>
  );
}
