const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '../images');
const targetDir = path.join(__dirname, '../images/optimized');

// 타겟 디렉토리 생성
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 이미지 파일 목록 가져오기
const imageFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg'))
  .sort();

console.log(`총 ${imageFiles.length}개의 이미지 파일을 처리합니다.\n`);

async function optimizeImages() {
  // 메인 이미지 처리 (001번)
  const mainImage = imageFiles[0];
  console.log(`메인 이미지 처리 중: ${mainImage}`);

  await sharp(path.join(sourceDir, mainImage))
    .resize(1200, null, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'main.jpg'));

  console.log('✓ 메인 이미지 최적화 완료: main.jpg\n');

  // 썸네일 이미지 처리 (013번)
  const thumbnailImage = imageFiles.find(f => f.includes('013')) || imageFiles[0];
  console.log(`썸네일 이미지 처리 중: ${thumbnailImage}`);

  await sharp(path.join(sourceDir, thumbnailImage))
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 85, progressive: true })
    .toFile(path.join(targetDir, 'thumbnail.jpg'));

  console.log('✓ 썸네일 이미지 최적화 완료: thumbnail.jpg\n');

  // 갤러리 이미지들 처리
  console.log('갤러리 이미지 처리 중...');

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const outputName = `gallery-${String(i + 1).padStart(2, '0')}.jpg`;

    await sharp(path.join(sourceDir, file))
      .resize(800, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(targetDir, outputName));

    console.log(`✓ ${outputName} 완료`);
  }

  console.log('\n모든 이미지 최적화 완료!');
  console.log(`최적화된 이미지 위치: ${targetDir}`);

  // 파일 크기 비교
  console.log('\n파일 크기 비교:');
  const originalSize = imageFiles.reduce((sum, file) => {
    const stats = fs.statSync(path.join(sourceDir, file));
    return sum + stats.size;
  }, 0);

  const optimizedFiles = fs.readdirSync(targetDir);
  const optimizedSize = optimizedFiles.reduce((sum, file) => {
    const stats = fs.statSync(path.join(targetDir, file));
    return sum + stats.size;
  }, 0);

  const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

  console.log(`원본: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`최적화: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`감소율: ${reduction}%`);
}

optimizeImages().catch(console.error);
