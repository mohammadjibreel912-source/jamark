import React, { useState } from 'react';

function FileUpload({ label, multiple = false, onFilesChange }) {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    if (onFilesChange) onFilesChange(selectedFiles);
  };

  return (
    <div className="file-upload">
      <label>{label}</label>
      <input type="file" multiple={multiple} onChange={handleChange} />
      {files.length > 0 && (
        <ul>
          {files.map((f, idx) => (
            <li key={idx}>{f.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileUpload;
