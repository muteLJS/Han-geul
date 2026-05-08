// src/lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * 이미지 업로드
 * @param {string} file - base64 또는 파일 경로
 * @param {string} folder - 'profiles' | 'covers' | 'hani-items'
 */
export async function uploadImage(file, folder = 'general') {
  const result = await cloudinary.uploader.upload(file, {
    folder:         `han-geul/${folder}`,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  return {
    url:      result.secure_url,
    publicId: result.public_id,
  }
}

/**
 * 이미지 삭제
 */
export async function deleteImage(publicId) {
  await cloudinary.uploader.destroy(publicId)
}

export default cloudinary
