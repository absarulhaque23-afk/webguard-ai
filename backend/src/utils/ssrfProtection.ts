import dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);

export const isPrivateIp = (ip: string): boolean => {
  if (ip === '0.0.0.0' || ip === '::1') return true;
  
  // IPv4 Private ranges
  const parts = ip.split('.').map(Number);
  if (parts.length === 4) {
    if (parts[0] === 127) return true; // 127.0.0.0/8 loopback
    if (parts[0] === 10) return true; // 10.0.0.0/8 private
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true; // 172.16.0.0/12 private
    if (parts[0] === 192 && parts[1] === 168) return true; // 192.168.0.0/16 private
    if (parts[0] === 169 && parts[1] === 254) return true; // 169.254.0.0/16 link-local
  }

  // Basic IPv6 check
  if (ip.includes(':')) {
    if (ip.toLowerCase().startsWith('fc') || ip.toLowerCase().startsWith('fd')) return true; // fc00::/7 unique local
    if (ip.toLowerCase().startsWith('fe8') || ip.toLowerCase().startsWith('fe9') || ip.toLowerCase().startsWith('fea') || ip.toLowerCase().startsWith('feb')) return true; // fe80::/10 link-local
  }

  return false;
};

export const isBlockedHost = (hostname: string): boolean => {
  const lowerHost = hostname.toLowerCase();
  return lowerHost === 'localhost' || 
         lowerHost.endsWith('.local') ||
         lowerHost === '169.254.169.254'; // AWS/GCP metadata
};

export const BLOCKED_PROTOCOLS = ['file:', 'ftp:', 'gopher:', 'data:', 'javascript:'];

export const validateUrlSafety = async (urlString: string): Promise<{ safe: boolean; reason?: string }> => {
  try {
    const url = new URL(urlString);
    
    if (BLOCKED_PROTOCOLS.includes(url.protocol.toLowerCase())) {
      return { safe: false, reason: 'Blocked protocol' };
    }
    
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return { safe: false, reason: 'Only HTTP/HTTPS allowed' };
    }

    if (isBlockedHost(url.hostname)) {
      return { safe: false, reason: 'Blocked hostname' };
    }

    // Try to resolve IPv4
    try {
      const addresses = await resolve4(url.hostname);
      for (const ip of addresses) {
        if (isPrivateIp(ip)) {
          return { safe: false, reason: 'Resolves to private IP' };
        }
      }
    } catch (e: any) {
      if (e.code !== 'ENODATA' && e.code !== 'ENOTFOUND') {
         // ignore
      }
    }

    return { safe: true };
  } catch (error) {
    return { safe: false, reason: 'Invalid URL format' };
  }
};
