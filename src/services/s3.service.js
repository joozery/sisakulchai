import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.S3_BUCKET_NAME;

if (!REGION || !BUCKET) {
  // eslint-disable-next-line no-console
  console.warn('[S3] Missing AWS_REGION or S3_BUCKET_NAME in environment');
}

const s3 = new S3Client({ region: REGION });

export async function createPresignedPutUrl({ key, contentType, expiresIn = 60 }) {
  if (!REGION || !BUCKET) {
    throw new Error('S3 env not configured: AWS_REGION or S3_BUCKET_NAME missing');
  }
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3, command, { expiresIn });
  return { url, key, bucket: BUCKET, region: REGION };
}


