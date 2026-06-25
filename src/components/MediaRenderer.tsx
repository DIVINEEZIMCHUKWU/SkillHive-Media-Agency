import React, { useState } from 'react';
import { Play } from 'lucide-react';

export default function MediaRenderer({ src, className, alt = "Media", onClick, interactive = false }: { src: string, className?: string, alt?: string, onClick?: (e: React.MouseEvent) => void, interactive?: boolean }) {
  const [videoError, setVideoError] = useState(false);

  if (!src) return null;

  const objectFit = className?.includes('object-contain') ? 'object-contain' : 'object-cover';

  // YouTube logic
  const ytMatch = src.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    const ytId = ytMatch[1];
    if (!interactive) {
      return (
        <div className={`relative overflow-hidden bg-black ${className || ''}`} onClick={onClick}>
          <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={alt} className={`absolute inset-0 w-full h-full ${objectFit}`} />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-colors hover:bg-black/40 cursor-pointer pointer-events-none">
            <div className="w-16 h-16 bg-brand-blue/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Play className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={`relative overflow-hidden bg-black ${className || ''}`} onClick={onClick}>
        <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} className="absolute inset-0 w-full h-full" allowFullScreen allow="autoplay; encrypted-media"></iframe>
      </div>
    );
  }

  // Vimeo logic
  const vimeoMatch = src.match(/(?:vimeo\.com\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const vimeoId = vimeoMatch[1];
    return (
      <div className={`relative overflow-hidden bg-black ${className || ''}`} onClick={onClick}>
        <iframe src={`https://player.vimeo.com/video/${vimeoId}${interactive ? '?autoplay=1' : ''}`} className="absolute inset-0 w-full h-full" allowFullScreen style={!interactive ? { pointerEvents: 'none' } : undefined}></iframe>
      </div>
    );
  }

  // Google Drive
  const driveIdMatch = src.match(/id=([^&]+)/) || src.match(/file\/d\/([^/]+)(?:\/|$)/);
  if (driveIdMatch && driveIdMatch[1] && (src.includes('drive.google.com') || src.includes('docs.google.com'))) {
    const fileId = driveIdMatch[1];
    const previewUrl = `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`;
    const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    const directDownload = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // If not interactive just show a thumbnail with play overlay
    if (!interactive) {
      return (
        <div className={`relative overflow-hidden bg-black ${className || ''}`} onClick={onClick}>
          <img src={thumbnailUrl} alt={alt} className={`absolute inset-0 w-full h-full ${objectFit}`} referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-colors hover:bg-black/40 cursor-pointer pointer-events-none">
            <div className="w-16 h-16 bg-brand-blue/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Play className="w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
      );
    }

    // For interactive playback try a direct video stream first (works when file is publicly shared as a raw video file).
    // If the direct stream errors, fall back to the Drive preview iframe.
    return (
      <div className={`relative overflow-hidden bg-black ${className || ''}`} onClick={onClick}>
        <VideoOrIframe key={fileId} previewUrl={previewUrl} directDownload={directDownload} alt={alt} objectFit={objectFit} />
      </div>
    );
  }

  // Fallback to generic mp4/webm video
  const isVideoMp4 = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm');
  if (isVideoMp4) {
    if (videoError) {
      return (
        <img src={src} alt={alt} className={className} onClick={onClick} />
      );
    }
    return (
      <div className={`relative overflow-hidden bg-black ${className || ''}`} onClick={onClick}>
        <video 
          src={src} 
          className={`absolute inset-0 w-full h-full ${objectFit}`}
          controls={interactive} 
          onError={() => setVideoError(true)}
          style={!interactive ? { pointerEvents: 'none' } : undefined}
          preload="metadata"
        />
        {!interactive && (
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-colors hover:bg-black/40 cursor-pointer pointer-events-none">
            <div className="w-16 h-16 bg-brand-blue/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <Play className="w-8 h-8 ml-1" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      referrerPolicy="no-referrer"
      onClick={onClick}
    />
  );
}

// Helper component used above to try direct video playback first and fall back to Drive iframe preview.
function VideoOrIframe({ previewUrl, directDownload, alt, objectFit }: { previewUrl: string, directDownload: string, alt?: string, objectFit?: string }) {
  const [useIframe, setUseIframe] = useState(false);
  const [errored, setErrored] = useState(false);

  if (useIframe || errored) {
    return (
      <iframe
        src={previewUrl}
        className={`absolute inset-0 w-full h-full`
        }
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        title={alt}
      />
    );
  }

  return (
    <video
      src={directDownload}
      className={`absolute inset-0 w-full h-full ${objectFit}`}
      controls
      onError={() => setErrored(true)}
      onAbort={() => setErrored(true)}
      preload="metadata"
    />
  );
}
