import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const category = formData.get('category') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate unique file key
    const timestamp = new Date().toISOString().split('T')[0];
    const uuid = uuidv4().split('-')[0];
    const ext = file.name.substring(file.name.lastIndexOf('.'));
    const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, '-');
    
    const key = `documents/projects/${projectId}/${category.toLowerCase().replace(/\s+/g, '-')}/${timestamp}/${baseName}-${uuid}${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        projectId: projectId,
        category: category,
        uploadedAt: new Date().toISOString(),
      },
    });

    const result = await r2Client.send(command);
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({
      success: true,
      file: {
        key,
        url: publicUrl,
        size: file.size,
        contentType: file.type,
        originalName: file.name,
        etag: result.ETag || '',
      }
    });

  } catch (error) {
    console.error('R2 upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}