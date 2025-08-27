import { useCallback } from 'react';

import { PlusIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/utils';
import FilePreview from './file-preview';

interface Props {
  file: File | null;
  onChange: (file: File) => void;
}

const DragDrop = ({ file, onChange }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0]);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleClick = () => {};

  return (
    <div {...getRootProps()} className={cn(file && 'flex-1')}>
      <input {...getInputProps()} />

      {!file && (
        <div
          onClick={handleClick}
          className="flex justify-center items-center text-gray-500 size-20 bg-primary rounded-full"
        >
          <PlusIcon size={40} color="#fff" />
        </div>
      )}

      {file && <FilePreview file={file} />}
    </div>
  );
};

export default DragDrop;
