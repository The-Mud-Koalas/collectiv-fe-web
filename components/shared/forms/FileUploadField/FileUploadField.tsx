import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useId,
  useState,
} from "react";
import {
  DropEvent,
  DropzoneInputProps,
  DropzoneOptions,
  DropzoneRootProps,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { Button } from "../../elements";
import { inter } from "@/utils/constants/fonts";
import { Upload } from "../../svg/icons";
import { COLORS } from "@/utils/constants/colors";
import Image from "next/image";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FieldErrorMessage } from "../FieldErrorMessage";
import UploadProgress from "./UploadProgress";

interface Props {
  label: string;
  field: string;
  description: string;
  onDrop: (
    acceptedFiles: File[],
    fileRejection: FileRejection[],
    event: DropEvent
  ) => void;
  rootProps?: DropzoneRootProps;
  inputProps?: DropzoneInputProps;
  dropzoneOptions?: DropzoneOptions;
  uploadProgress: number;
  isUploading: boolean;
  file?: {
    url: string;
    file: File;
  } | null;
  error?: FieldError;
  register?: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
}

const FileUploadField: React.FC<Props> = ({
  label,
  field,
  onDrop,
  register,
  description,
  rootProps,
  inputProps,
  uploadProgress,
  isUploading,
  dropzoneOptions,
  file,
  error,
  registerOptions,
}) => {
  rootProps ??= {};
  inputProps ??= {};
  const inputId = useId();
  const fileExists = file != null;

  const { getRootProps, getInputProps, open } = useDropzone({
    ...dropzoneOptions,
    onDrop,
  });

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-medium`}
      >
        {label}{" "}
        {registerOptions?.required && <span className="text-red-600">*</span>}
      </label>

      <div
        {...getRootProps({ ...rootProps })}
        className={`${inter.className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          {...getInputProps({ ...inputProps, id: inputId })}
          {...(register != null ? register(field, registerOptions ?? {}) : {})}
        />
        {isUploading ? (
          <div className="flex flex-col gap-2 items-center justify-center w-full bg-gray-50 h-56 px-3 py-3 rounded-lg border-gray-300 border-[1.5px]">
            <div className="select-none text-gray-400 w-full flex justify-between">
              <h3 className="text-lg font-medium">Uploading...</h3>
              <p className="text-lg">{uploadProgress}%</p>
            </div>
            <UploadProgress progress={uploadProgress}/>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center w-full bg-gray-50 h-56 px-3 py-3 rounded-lg border-gray-300 border-[1.5px]">
            {!fileExists ? (
              <div className="flex flex-col items-center">
                <Upload color={COLORS.gray[400]} dimensions={{ width: 40 }} />
                <p className="select-none text-gray-400">{description}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center h-full">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    alt={file.url}
                    fill={true}
                    src={file.url}
                  />
                </div>
                <p className="select-none text-gray-400 overflow-hidden whitespace-nowrap w-[24ch] text-sm overflow-ellipsis">
                  {file.file.name}
                </p>
              </div>
            )}
            <Button
              className="bg-primary-800 px-4 py-1 rounded-full text-primary-300"
              type="button"
              onClick={open}
            >
              Browse Files
            </Button>
          </div>
        )}
      </div>
      {error && <FieldErrorMessage message={error.message} />}
    </div>
  );
};

export default FileUploadField;
