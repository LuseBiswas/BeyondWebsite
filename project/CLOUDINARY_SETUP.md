# Cloudinary Video Integration

## Setup Complete! ✅

Your Cloudinary video optimization is now integrated into the project.

## What's Been Set Up

1. **Configuration File**: `lib/cloudinary.js`
   - Contains your Cloudinary credentials (Cloud Name, API Key, API Secret)
   - Includes optimization utilities and presets

2. **Updated Component**: `components/Home.jsx`
   - Now uses optimized Cloudinary video URL
   - Configured with auto quality, format, and codec selection

## How It Works

The video URL is automatically optimized with these features:
- **Auto Quality**: Cloudinary selects the best quality based on device/connection
- **Auto Format**: Delivers webm for Chrome, mp4 for Safari, etc.
- **Auto Codec**: Uses modern codecs (H.265, VP9) when supported
- **Streaming Profile**: Enables adaptive bitrate streaming for smooth playback

## Usage in Other Components

### Option 1: Use the utility function directly
```javascript
import { getOptimizedVideoUrl } from "../lib/cloudinary";

const videoUrl = getOptimizedVideoUrl("your-video-public-id", {
  quality: "auto:good",
  format: "auto",
  videoCodec: "auto",
  streaming: true
});
```

### Option 2: Use presets
```javascript
import { videoPresets } from "../lib/cloudinary";

// For hero sections (high quality)
const heroVideo = videoPresets.hero("your-video-url");

// For standard sections
const standardVideo = videoPresets.standard("your-video-url");

// For mobile (lightweight)
const mobileVideo = videoPresets.mobile("your-video-url");
```

## Optimization Options

You can customize video optimization:

```javascript
getOptimizedVideoUrl(videoUrl, {
  quality: "auto:good",    // auto:low, auto:good, auto:best
  format: "auto",          // auto, mp4, webm
  videoCodec: "auto",      // auto, h264, h265, vp9
  width: 1920,             // Optional: resize width
  height: 1080,            // Optional: resize height
  bitRate: "1m",           // Optional: "500k", "1m", "2m"
  streaming: true          // Enable adaptive streaming
});
```

## To-Do Before Production

### Move to Environment Variables

1. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=drbcb1ziy
   CLOUDINARY_API_KEY=524296464367938
   CLOUDINARY_API_SECRET=b5FxSprSLyfdX-gAnjZZpps4IAs
   ```

2. Update `lib/cloudinary.js`:
   ```javascript
   export const cloudinaryConfig = {
     cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
     apiKey: process.env.CLOUDINARY_API_KEY,
     apiSecret: process.env.CLOUDINARY_API_SECRET
   };
   ```

3. Add `.env.local` to `.gitignore`

## Video Upload URL Format

When uploading videos to Cloudinary, note the URL format:
```
https://res.cloudinary.com/[cloud-name]/video/upload/[version]/[public-id].[extension]
```

Example:
```
https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025790/shutterstock_1065158980_1_jalep4.mov
```

The utility function will automatically extract and optimize this.

## Performance Benefits

✅ **Reduced File Size**: Auto-optimization can reduce video size by 50-80%
✅ **Faster Loading**: Adaptive streaming delivers optimal quality for each user
✅ **Better Compatibility**: Auto format/codec selection works across all browsers
✅ **Smooth Playback**: Streaming profile prevents buffering issues

## Need Help?

- [Cloudinary Video Docs](https://cloudinary.com/documentation/video_manipulation_and_delivery)
- [Video Transformation Reference](https://cloudinary.com/documentation/video_transformation_reference)
- [Optimization Guide](https://cloudinary.com/documentation/video_optimization)

---

**Current Status**: Development mode (credentials in code)
**Next Step**: Move credentials to environment variables before production deployment

