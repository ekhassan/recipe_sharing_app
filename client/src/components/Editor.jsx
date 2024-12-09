/* eslint-disable react/prop-types */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { InlineEditor, Bold, Essentials, Italic, Link, List, Paragraph, Undo } from 'ckeditor5';


import 'ckeditor5/ckeditor5.css';

const Editor = ({ placeholder, onChange }) => {
    return (
        <CKEditor
            className='rounded-full'
            editor={InlineEditor}
            config={{
                toolbar: {
                    items: [
                        'undo',
                        'redo',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'link',
                    ],
                },
                plugins: [

                    Essentials,
                    Bold,
                    Italic,
                    Paragraph,
                    Undo,
                    List,
                    Link,
                ],
                placeholder: placeholder,
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
        />
    );
}


export default Editor;