// src/lib/upload/s3.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = process.env.AWS_REGION!;
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

// Initialize S3 client with credentials from environment variables
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file buffer to S3 and returns the file URL.
 * Files will be private (no public-read ACL).
 *
 * @param fileBuffer - Buffer containing file data
 * @param fileName - Desired key/name in the bucket (e.g., "uploads/myimage.png")
 * @param contentType - MIME type of the file (e.g., "image/png")
 * @returns URL string to the file in the bucket (private access)
 */
export async function uploadFileToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  return fileName;
}
