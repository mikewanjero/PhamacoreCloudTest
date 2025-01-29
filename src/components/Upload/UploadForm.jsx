/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  Form,
  ListGroup,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { BsInboxFill, BsCloudUploadFill, BsTrashFill } from "react-icons/bs";

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
    <Container className="bg-light p-4 rounded shadow-sm">
      <Row className="text-center mb-3">
        <Col>
          <p className="text-muted small">
            Max file size: <strong>5MB</strong> | <em>Max 3 files</em>
          </p>
        </Col>
      </Row>

      {/* Upload Area */}
      <Row className="mb-4">
        <Col>
          <div
            className="border border-caramel rounded p-3 text-center bg-white"
            style={{ minHeight: "150px", position: "relative" }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <BsInboxFill size={40} className="text-caramel mb-2" />
              <p className="text-caramel font-weight-bold mb-1">
                Click or Drag files to this area to upload
              </p>
              <Form.Control
                type="file"
                multiple
                onChange={handleChangeFile}
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Upload Status */}
      {loading && (
        <Alert variant="info" className="text-center">
          <BsCloudUploadFill className="me-2" />
          Uploading...
        </Alert>
      )}

      {uploadStatus && uploadStatus.success && (
        <Alert variant="success" className="text-center">
          {uploadStatus.message}
        </Alert>
      )}

      {/* File List */}
      {fileList.length > 0 && (
        <Row>
          <Col>
            <h5 className="text-warning mb-3">Uploaded File(s)</h5>
            <ListGroup>
              {fileList.map((file, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span className="text-truncate">{file.name}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteFile(file.name)}
                  >
                    <BsTrashFill />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UploadForm;
