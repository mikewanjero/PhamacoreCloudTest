/* eslint-disable react/prop-types */
import { useState } from "react";

const UploadForm = ({ handleChange, fileType }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Simulate upload endpoints (no real API)
  const uploadEndpoints = {
    training: "https://mockapi.io/uploadTraining",
    master: "https://mockapi.io/uploadMaster",
  };

  // eslint-disable-next-line no-unused-vars
  const uploadEndpoint = uploadEndpoints[fileType] || uploadEndpoints.master;

  // Simulate file upload without a real API
  const simulateFileUpload = (files) => {
    setLoading(true);
    setTimeout(() => {
      setFileList((prev) => [
        ...prev,
        ...Array.from(files).map((file) => ({ name: file.name, file })),
      ]);
      setLoading(false);
      setUploadStatus({ success: true, message: "File(s) Upload Successful." });

      setTimeout(() => setUploadStatus(null), 2000);

      handleChange && handleChange(files);
    }, 1000); // Simulated upload delay (1 second)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    simulateFileUpload(files);
  };

  const handleChangeFile = (event) => {
    const files = event.target.files;
    simulateFileUpload(files);
  };

  const handleDeleteFile = (fileName) => {
    setFileList((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 max-w-md p-4 bg-white-seashell rounded-3 shadow-sm">
      <p className="text-muted text-xs mb-2">
        Max file size: <strong>5MB </strong> | <em>Max 3 files</em>
      </p>

      {/* Upload Area */}
      <div
        className="w-100 h-28 border-dashed border-4 border-caramel-dark rounded-3 bg-white hover:bg-light-gray"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
          <i className="bi bi-inbox-fill text-caramel-dark text-5xl mb-3" />
          <p className="font-semibold text-caramel text-sm">
            Click or Drag files to this area to upload
          </p>
          <input
            type="file"
            multiple
            onChange={handleChangeFile}
            className="opacity-0 w-100 h-100 absolute top-0 left-0 cursor-pointer"
          />
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-green-600 text-sm">
          <i className="bi bi-cloud-upload-fill" /> Uploading...
        </div>
      )}

      {uploadStatus && uploadStatus.success && (
        <div className="mt-4 text-xs text-green-500">
          {uploadStatus.message}
        </div>
      )}

      {/* File List */}
      {fileList.length > 0 && (
        <div className="mt-4 w-100">
          <h3 className="font-semibold text-caramel mb-2">Uploaded File(s)</h3>
          <ol className="list-group list-group-flush">
            {fileList.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center bg-white p-3 rounded-3 shadow-sm hover:shadow-md"
              >
                <span className="text-sm text-muted truncate">{file.name}</span>
                <button
                  onClick={() => handleDeleteFile(file.name)}
                  className="btn btn-sm btn-danger"
                >
                  <i className="bi bi-trash-fill" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
