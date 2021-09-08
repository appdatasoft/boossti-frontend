import Editor from '@frontend/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { fileUpload } from '@frontend/shared/utils/fileUpload';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'superscript',
    'subscript',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'alignment',
    'outdent',
    'indent',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'link',
    'insertTable',
    'codeBlock',
    'imageUpload',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  image: {
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      '|',
      'toggleImageCaption',
      'imageTextAlternative',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  mention: {
    feeds: [
      {
        marker: '@',
        feed: ['@Sumi', '@Vivek', '@Muzzamil', '@Robin', '@Ted'],
        // minimumCharacters: 1,
      },
    ],
  },
};

class MyUploadAdapter {
  loader: any;
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(async (file) => {
      const urls = await fileUpload([file], '/ckeditor');
      return {
        default: urls[0],
      };
    });
  }
}

interface IProps {
  value: string;
  onChange: (arg: string) => void;
}

export default function RichTextarea({ value = '', onChange }: IProps) {
  return (
    <CKEditor
      config={editorConfiguration}
      editor={Editor}
      data={value}
      onReady={(editor) => {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          return new MyUploadAdapter(loader);
        };
        editor.editing.view.change((writer) => {
          writer.setStyle('min-height', '200px', editor.editing.view.document.getRoot());
          writer.setStyle('max-height', '90vh', editor.editing.view.document.getRoot());
        });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}