export function getInternalRequestSecret(): string {
  return (process.env.CRON_SECRET || '').trim();
}

export function isInternalRequest(req: Request): boolean {
  const secret = getInternalRequestSecret();
  if (!secret) return false;

  const authorization = (req.headers.get('authorization') || '').trim();
  if (authorization === `Bearer ${secret}`) return true;

  return (req.headers.get('x-cron-secret') || '').trim() === secret;
}
