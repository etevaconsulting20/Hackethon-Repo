import React, { useMemo, useRef } from 'react'
import JoditEditor from 'jodit-react';


function JoditEditotRichText(props) {
    const {
        name, label, value, readonly,
        onChange, onBlur,
        className
    } = props

    const editor = useRef(null);


    const handleRichTextHtmlContent = (newValue) => {
        const eventObject = {
            target: {
                name: name,
                value: newValue
            }
        }

        onChange(eventObject)
    }


    const configMemot = useMemo(() => (
        {
            readonly: readonly, // all options from https://xdsoft.net/jodit/doc/,
            // placeholder: t('Type something'),
            showCharsCounter: false,
            showWordsCounter: false,
            showXPathInStatusbar: false,
            minHeight: 500,
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            // // disablePlugins: "fullsize",
            // toolbarAdaptive: false,
            // buttons: [
            //     'bold', 'strikethrough', 'underline', 'italic', 'ul', 'ol', 'outdent', 'indent', 'font', 'fontsize',
            //     'brush', 'paragraph', 'table', 'source', 'align', 'undo', 'redo', 'hr', 'eraser', 'copyformat', 'print',
            //     // 'symbol', 'fullsize', 'about', 'image','video','link', 
            // ],
        }
    ), [isEditMode])





    return (
        <>
            <div className={`form-group col-12 ${className ? className : ""}`} >
                <label>{label}</label>
                <JoditEditor
                    value={value}
                    ref={editor}
                    config={configMemot}
                    onBlur={(newValue) => {
                        handleRichTextHtmlContent(newValue)
                    }}
                />
            </div>
        </>
    )
}

export default JoditEditotRichText