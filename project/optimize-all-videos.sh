#!/bin/bash
# Script to download and optimize all Cloudinary videos

set -e
cd "$(dirname "$0")"

echo "🎬 Starting video optimization..."
echo ""

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Array of video URLs and their output names
declare -A videos=(
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025790/shutterstock_1065158980_1_jalep4.mov"]="hero.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760026792/shutterstock_3468863127_h7embb.mov"]="home2.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760031462/shutterstock_3642258413_jjy2hh.mov"]="price.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027731/shutterstock_3627320917_kprijd.mov"]="partnership-discover.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760111025/River_k5zwtq.mp4"]="partnership-design.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027725/shutterstock_1105052247_wrlamw.mov"]="partnership-deliver.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760027734/shutterstock_3833232295_kqnwyv.mov"]="partnership-evolve.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760112150/shutterstock_3499135879_rew8hi.mov"]="beyond-surface.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760111518/Deepsea_av4ko4.mp4"]="beyond-attraction.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025674/shutterstock_3767390_1_nwf9tw.mov"]="beyond-trust.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025686/shutterstock_3625121845_zvc0xp.mov"]="beyond-colours.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760110792/Website_Videos_kdvmfv.mp4"]="beyond-trends.mp4"
  ["https://res.cloudinary.com/drbcb1ziy/video/upload/v1760025710/shutterstock_3847367763_jbsax0.mov"]="beyond-layouts.mp4"
)

# Counter
total=13
current=0

# Process each video
for url in "${!videos[@]}"; do
  current=$((current + 1))
  output="${videos[$url]}"
  temp="temp_${output}.download"
  
  echo "[$current/$total] Processing: $output"
  
  # Skip if already exists
  if [ -f "public/videos/$output" ]; then
    echo "  ✓ Already exists, skipping"
    continue
  fi
  
  echo "  → Downloading..."
  curl -s -o "$temp" "$url"
  
  echo "  → Optimizing with FFmpeg..."
  ffmpeg -i "$temp" \
    -c:v libx264 \
    -crf 23 \
    -preset medium \
    -c:a aac \
    -b:a 128k \
    -movflags +faststart \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    "public/videos/$output" \
    -hide_banner -loglevel error
  
  # Clean up temp file
  rm "$temp"
  
  echo "  ✓ Done"
  echo ""
done

echo "🎉 All videos optimized!"
echo ""
echo "📊 Final sizes:"
du -sh public/videos/
ls -lh public/videos/*.mp4 | awk '{print "  " $5 "\t" $9}'
echo ""
echo "Total size:"
du -sh public/videos/ | awk '{print "  " $1}'

