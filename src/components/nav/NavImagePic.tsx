import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onChange: (base64: string) => void;
  value?: string;
  disabled?: boolean;
}

const NavImagePic: React.FC<DropzoneProps> = ({ onChange, value, disabled }) => {
  const [base64, setBase64] = useState(value);

  useEffect(() => {
    const storedBgImage = localStorage.getItem('bgImage');
    setBase64(storedBgImage as string)
  }, []);

  const handleChange = useCallback(
    (base64: string) => {
      setBase64(base64);
      onChange(base64); 
    },
    [onChange]
  );

  const handleDrop = useCallback((files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const base64 = event.target?.result as string;
      setBase64(base64);
      handleChange(base64); 
    };
    reader.readAsDataURL(file);
  }, [handleChange]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          'relative w-full text-white text-center border-2 h-40 mb-2 border-solid rounded-md border-neutral-700 overflow-hidden',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center h-full">
          <img
            src={base64}
            className="object-contain max-w-full max-h-full"
            alt="Uploaded image"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavImagePic;
