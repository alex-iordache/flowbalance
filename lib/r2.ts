import crypto from 'crypto';

type R2Env = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  region: string; // Cloudflare R2 expects "auto"
};

function mustEnv(name: string): string {
  const v = (process.env[name] || '').trim();
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function getR2Env(): R2Env {
  return {
    accountId: mustEnv('R2_ACCOUNT_ID'),
    accessKeyId: mustEnv('R2_ACCESS_KEY_ID'),
    secretAccessKey: mustEnv('R2_SECRET_ACCESS_KEY'),
    bucket: mustEnv('R2_BUCKET_NAME'),
    region: (process.env.R2_REGION || 'auto').trim() || 'auto',
  };
}

function sha256Hex(input: string | Buffer): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function hmac(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

function toAmzDate(d: Date): { amzDate: string; dateStamp: string } {
  // 20260105T123456Z
  const iso = d.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const amzDate = `${iso.slice(0, 8)}T${iso.slice(8, 14)}Z`;
  const dateStamp = iso.slice(0, 8);
  return { amzDate, dateStamp };
}

// AWS SigV4 URI encoding rules for canonical URI
function awsEncodePath(path: string): string {
  // Keep slashes, encode each segment
  return path
    .split('/')
    .map((seg) =>
      encodeURIComponent(seg)
        .replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`),
    )
    .join('/');
}

export async function fetchR2Object(params: {
  key: string;
  rangeHeader?: string | null;
}): Promise<Response> {
  const { key, rangeHeader } = params;
  const { accountId, accessKeyId, secretAccessKey, bucket, region } = getR2Env();

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const method = 'GET';

  // Path-style: /<bucket>/<key>
  const canonicalUri = awsEncodePath(`/${bucket}/${key}`);
  const url = `https://${host}${canonicalUri}`;

  const { amzDate, dateStamp } = toAmzDate(new Date());
  const service = 's3';

  const payloadHash = 'UNSIGNED-PAYLOAD';
  const canonicalQueryString = '';

  // Only sign the minimal required headers.
  const canonicalHeaders = `host:${host}\n` + `x-amz-content-sha256:${payloadHash}\n` + `x-amz-date:${amzDate}\n`;
  const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, sha256Hex(canonicalRequest)].join('\n');

  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, 'aws4_request');
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const headers: Record<string, string> = {
    Authorization: authorization,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
  };
  if (rangeHeader) headers.Range = rangeHeader;

  return fetch(url, { method, headers });
}


