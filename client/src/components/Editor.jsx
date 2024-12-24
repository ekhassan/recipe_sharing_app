/* eslint-disable react/prop-types */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { InlineEditor, Bold, Essentials, Italic, Link, List, Paragraph, Undo } from 'ckeditor5';


import 'ckeditor5/ckeditor5.css';

const Editor = ({ name, placeholder, value, onChange, onBlur }) => {
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        onChange({ target: { name, value: data } });
    };
    return (
        <CKEditor
            className='rounded-full'
            id={name}
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
            data={value}
            onChange={handleEditorChange}
            onBlur={onBlur}
        />
    );
}


export default Editor;