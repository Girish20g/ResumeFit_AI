import React, {
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from 'react';
import './FileUpload.scss';

interface FileUploadProps {
  label: string;
  name: string;
  onFileChange: (file: File | null) => void;
  selectedFile?: File | null;
  error?: string;
  disabled?: boolean;
  hint?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onFileChange,
  selectedFile,
  error,
  disabled = false,
  hint,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileChange(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);
  };

  const handleRemove = () => {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const dropZoneClasses = [
    'file-drop-zone',
    isDragging ? 'dragging' : '',
    error ? 'error' : '',
    disabled ? 'disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="file-upload-container">
      <div className="file-upload-label-row">
        <label className="file-upload-label" htmlFor={name}>
          {label}
        </label>
        {hint && <span className="file-upload-hint">{hint}</span>}
      </div>

      {!selectedFile ? (
        <div
          className={dropZoneClasses}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload resume PDF"
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <div className="file-drop-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="file-drop-primary">
            {isDragging ? 'Drop your resume here' : 'Drag & drop your resume'}
          </p>
          <p className="file-drop-secondary">
            or <span className="file-drop-browse">browse files</span>
          </p>
          <p className="file-drop-accept">PDF only • Max 10 MB</p>
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-preview-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="file-preview-info">
            <span className="file-preview-name">{selectedFile.name}</span>
            <span className="file-preview-size">
              {formatFileSize(selectedFile.size)}
            </span>
          </div>
          <button
            type="button"
            className="file-preview-remove"
            onClick={handleRemove}
            aria-label="Remove file"
            disabled={disabled}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleInputChange}
        className="file-upload-hidden-input"
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
      />

      {error && <p className="file-upload-error">{error}</p>}
    </div>
  );
};

export default FileUpload;
