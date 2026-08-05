import { isPrivateIp, isBlockedHost, validateUrlSafety } from '../src/utils/ssrfProtection';

describe('SSRF Protection Utilities', () => {
  describe('isPrivateIp', () => {
    it('should detect loopback IPs', () => {
      expect(isPrivateIp('127.0.0.1')).toBe(true);
      expect(isPrivateIp('127.255.255.255')).toBe(true);
    });

    it('should detect private IPv4 ranges', () => {
      expect(isPrivateIp('10.0.0.1')).toBe(true);
      expect(isPrivateIp('172.16.0.1')).toBe(true);
      expect(isPrivateIp('172.31.255.255')).toBe(true);
      expect(isPrivateIp('192.168.1.1')).toBe(true);
    });

    it('should allow public IPs', () => {
      expect(isPrivateIp('8.8.8.8')).toBe(false);
      expect(isPrivateIp('1.1.1.1')).toBe(false);
      expect(isPrivateIp('172.32.0.1')).toBe(false); // Outside private range
    });
  });

  describe('isBlockedHost', () => {
    it('should block localhost and .local', () => {
      expect(isBlockedHost('localhost')).toBe(true);
      expect(isBlockedHost('test.local')).toBe(true);
    });

    it('should block metadata IP', () => {
      expect(isBlockedHost('169.254.169.254')).toBe(true);
    });

    it('should allow normal hosts', () => {
      expect(isBlockedHost('google.com')).toBe(false);
      expect(isBlockedHost('api.example.com')).toBe(false);
    });
  });
});
