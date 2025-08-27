import { useEffect, useRef, useState } from 'react';

const FilePreview = ({ file }: { file: File }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const isImage = file.type.includes('image');
  const isVideo = file.type.includes('video');

  useEffect(() => {
    if (!isVideo || !file) return;

    const videoEl = videoRef.current!;
    const videoURL = URL.createObjectURL(file);
    videoEl.src = videoURL;

    const handleLoadedData = async () => {
      videoEl.currentTime = 1;
    };

    const handleSeeked = () => {
      const canvas = canvasRef.current!;
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setThumbnail(imageUrl);
        URL.revokeObjectURL(videoURL);
      }
    };

    videoEl.addEventListener('loadeddata', handleLoadedData, { once: true });
    videoEl.addEventListener('seeked', handleSeeked, { once: true });
  }, [file, isVideo]);

  return (
    <div>
      {isImage && (
        <div className="w-[123px] h-[175px] ml-auto relative">
          <span className="absolute top-1 left-1">Preview</span>
          <img
            src={URL.createObjectURL(file)}
            className="object-cover size-full rounded-[11px]"
          />
        </div>
      )}

      {isVideo && thumbnail && (
        <>
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-[195px] h-[276px] mx-auto rounded-[11px] object-cover"
          />
        </>
      )}

      {!isImage && !isVideo && (
        <div className="flex justify-center items-center text-pink">
          {/* <FileCover type={file.name.split('.').pop()!} className="size-20" /> */}
        </div>
      )}

      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default FilePreview;
