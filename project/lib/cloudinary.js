// Cloudinary configuration
// TODO: Move to environment variables before production

export const cloudinaryConfig = {
  cloudName: "drbcb1ziy",
  apiKey: "524296464367938",
  apiSecret: "b5FxSprSLyfdX-gAnjZZpps4IAs"
};

/**
 * Generate optimized Cloudinary video URL
 * @param {string} publicId - The public ID of the video (e.g., "shutterstock_1065158980_1_jalep4")
 * @param {object} options - Optimization options
 * @returns {string} - Optimized video URL
 */
export function getOptimizedVideoUrl(publicId, options = {}) {
  const {
    quality = "auto:good", // auto:low, auto:good, auto:best
    format = "auto", // auto will choose best format (webm, mp4, etc)
    width = null,
    height = null,
    crop = "limit",
    videoCodec = "auto", // auto, h264, h265, vp9
    bitRate = null, // e.g., "500k", "1m"
    streaming = true, // Enable adaptive streaming
  } = options;

  const { cloudName } = cloudinaryConfig;
  
  let transformations = [];
  
  // Quality optimization
  if (quality) {
    transformations.push(`q_${quality}`);
  }
  
  // Format optimization
  if (format) {
    transformations.push(`f_${format}`);
  }
  
  // Video codec optimization
  if (videoCodec && videoCodec !== "auto") {
    transformations.push(`vc_${videoCodec}`);
  }
  
  // Dimensions
  if (width || height) {
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
  }
  
  // Bitrate
  if (bitRate) {
    transformations.push(`br_${bitRate}`);
  }
  
  const transformString = transformations.join(',');
  
  // Extract version and public ID from full URL if provided
  let cleanPublicId = publicId;
  if (publicId.includes('cloudinary.com')) {
    const urlParts = publicId.split('/upload/');
    if (urlParts.length > 1) {
      // Remove version if present
      const pathParts = urlParts[1].split('/');
      if (pathParts[0].startsWith('v')) {
        cleanPublicId = pathParts.slice(1).join('/');
      } else {
        cleanPublicId = pathParts.join('/');
      }
    }
  }
  
  // Remove file extension since we're using f_auto
  cleanPublicId = cleanPublicId.replace(/\.(mov|mp4|webm|avi|mkv)$/i, '');
  
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformString}/${cleanPublicId}`;
}

/**
 * Get video URL with preset optimizations for different use cases
 */
export const videoPresets = {
  // High quality for hero sections
  hero: (publicId) => getOptimizedVideoUrl(publicId, {
    quality: "auto:best",
    format: "auto",
    videoCodec: "auto",
    streaming: true
  }),
  
  // Balanced for general use
  standard: (publicId) => getOptimizedVideoUrl(publicId, {
    quality: "auto:good",
    format: "auto",
    videoCodec: "auto",
    streaming: true
  }),
  
  // Lightweight for mobile
  mobile: (publicId) => getOptimizedVideoUrl(publicId, {
    quality: "auto:low",
    format: "auto",
    videoCodec: "auto",
    bitRate: "500k",
    streaming: true
  }),
  
  // Thumbnail/preview
  thumbnail: (publicId) => getOptimizedVideoUrl(publicId, {
    quality: "auto:low",
    format: "auto",
    width: 640,
    height: 360,
    crop: "fill"
  })
};

