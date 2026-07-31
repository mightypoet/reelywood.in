import React, { useState, useRef } from 'react';
import { Upload, X, File as FileIcon, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MediaUploaderProps {
  onUploadSuccess: (urls: string[]) => void;
  acceptedTypes: string; // e.g. 'image/*,video/*'
  multiple?: boolean;
}

export default function MediaUploader({ onUploadSuccess, acceptedTypes, multiple = false }: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsUploading(true);
    setError(null);
    setProgress({ current: 0, total: files.length });

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(p => ({ ...p, current: i + 1 }));
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('portfolio_media')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from('portfolio_media')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }
      onUploadSuccess(uploadedUrls);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload media.');
    } finally {
      setIsUploading(false);
      setProgress({ current: 0, total: 0 });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors ${
          isUploading ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 bg-slate-50'
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm font-medium text-slate-600">
              Uploading {progress.current} of {progress.total}...
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              Click or drag to upload
            </p>
            <p className="text-xs text-slate-500">
              {acceptedTypes.includes('video') ? 'Images or Videos' : 'Images only'} (max. 50MB)
            </p>
          </div>
        )}
        <input 
          ref={fileInputRef}
          type="file" 
          accept={acceptedTypes} 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isUploading}
          multiple={multiple}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>
      )}
    </div>
  );
}
