
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from "fs/promises";


const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

const bucketName = process.env.AWS_BUCKET_NAME;
const folderName = process.env.AWS_FOLDER_NAME;

export async function uploadBase64ImageToS3(
  base64Data,
  fileName
) {
  const binaryData = Buffer.from(base64Data, "base64");

  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${fileName}`,
    Body: binaryData,
    ContentType: "image/jpeg",
  };

  return s3Client.send(new PutObjectCommand(params));
}
