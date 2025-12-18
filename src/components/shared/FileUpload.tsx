import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
    label?: string;
    accept?: string;
    maxSize?: number; // in MB
    onFileSelect?: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    label = 'Subir Archivo',
    accept = 'image/*',
    maxSize = 5,
    onFileSelect,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
            toast.error(`El archivo debe ser menor a ${maxSize}MB`);
            return;
        }

        setSelectedFile(file);

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        if (onFileSelect) {
            onFileSelect(file);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onFileSelect) {
            onFileSelect(null);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />

            {!selectedFile ? (
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleClick}
                    className="w-full gap-2"
                >
                    <Upload className="w-4 h-4" />
                    {label}
                </Button>
            ) : (
                <div className="space-y-2">
                    {preview && (
                        <div className="relative rounded-lg border overflow-hidden">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={handleRemove}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium truncate max-w-[200px]">
                                {selectedFile.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                ({(selectedFile.size / 1024).toFixed(1)} KB)
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemove}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            <p className="text-xs text-muted-foreground">
                Tamaño máximo: {maxSize}MB. Formatos aceptados: JPG, PNG, PDF
            </p>
        </div>
    );
};

export default FileUpload;
