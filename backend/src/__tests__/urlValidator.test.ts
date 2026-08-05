import { validateUrl } from '../src/validators/urlValidator';

describe('URL Validator', () => {
  it('should pass valid public URLs', async () => {
    const result = await validateUrl('https://google.com');
    expect(result.valid).toBe(true);
    expect(result.normalizedUrl).toBe('https://google.com');
  });

  it('should add https:// if missing', async () => {
    const result = await validateUrl('google.com');
    expect(result.valid).toBe(true);
    expect(result.normalizedUrl).toBe('https://google.com');
  });

  it('should block localhost URLs', async () => {
    const result = await validateUrl('http://localhost:3000');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Blocked hostname');
  });

  it('should block file:// protocol', async () => {
    const result = await validateUrl('file:///etc/passwd');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Blocked protocol');
  });

  it('should reject extremely long URLs', async () => {
    const longUrl = 'https://google.com/' + 'a'.repeat(2100);
    const result = await validateUrl(longUrl);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('URL is too long (max 2048 characters)');
  });
});
