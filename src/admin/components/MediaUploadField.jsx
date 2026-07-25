import { FileInput } from '@mantine/core';
import { ImagePlus } from 'lucide-react';
import styles from './MediaUploadField.module.css';

export default function MediaUploadField({ label, value, onChange, accept, isImage = true }) {
  const previewUrl = value instanceof File ? URL.createObjectURL(value) : value;

  return (
    <div>
      <FileInput
        label={label}
        placeholder="Selecionar arquivo"
        accept={accept}
        value={value instanceof File ? value : null}
        onChange={onChange}
        leftSection={<ImagePlus size={16} />}
        clearable
      />
      {isImage && previewUrl && (
        <img src={previewUrl} alt="" className={styles.preview} />
      )}
      {!isImage && typeof value === 'string' && value && (
        <a href={value} target="_blank" rel="noreferrer" className={styles.fileLink}>
          Arquivo atual
        </a>
      )}
    </div>
  );
}
