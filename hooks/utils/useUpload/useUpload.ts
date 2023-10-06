import { useState } from "react";

interface Props {
  endpoint: string;
  method: "POST" | "DELETE" | "PATCH" | "PUT";
}

const useUpload = ({ endpoint, method }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (formData: FormData, token?: string) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      const xhr = new XMLHttpRequest();
      
      xhr.open(method, `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`)

      xhr.onload = () => {
        if (!(xhr.status < 300 && 200 <= xhr.status)) {
          setError(xhr.statusText);
          setLoading(false);
          reject(xhr.statusText);
        } else {
          setError(null);
          resolve(xhr.response);
        }
      };

      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;

        const percentComplete = (e.loaded / e.total) * 100;
        setUploadProgress(percentComplete);
      };

      xhr.upload.onloadend = () => setLoading(false);
      xhr.onerror = () => reject(xhr.statusText);

      xhr.send(formData);
    });

  return { isLoading, error, uploadProgress, uploadFile };
};

export default useUpload;