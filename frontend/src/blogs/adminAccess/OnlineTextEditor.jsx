import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
export default function TextEditor({ onChangeInEditor }) {
  //Initially setting the text editor content
  const [content, setContent] = useState("<p>Write Here</p>");

  //Getting newContent from index.jsx
  const handleEditorChange = (newContent) => {
    onChangeInEditor(newContent);
    setContent(newContent);
  };
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TEXT_EDITOR_API}
        initialValue={content}
        init={{
          height: "60vh",
          menubar: false,
          toolbar:
            "undo redo | blocks  | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}
