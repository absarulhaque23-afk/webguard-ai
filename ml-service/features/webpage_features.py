import httpx
import re
import ipaddress
import urllib.parse

class WebpageFeatureExtractor:
    def __init__(self):
        self.timeout = httpx.Timeout(10.0)
        self.max_redirects = 5
        self.max_response_size = 5 * 1024 * 1024 # 5MB

    def _is_private_ip(self, host: str) -> bool:
        try:
            ip = ipaddress.ip_address(host)
            return ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_multicast or ip.is_reserved
        except ValueError:
            return False

    async def extract(self, url: str) -> dict | None:
        if not url.startswith(('http://', 'https://')):
            return None
        
        try:
            parsed = urllib.parse.urlparse(url)
            hostname = parsed.netloc.split(':')[0]
            if self._is_private_ip(hostname):
                return None
        except Exception:
            return None

        features = {}
        
        try:
            async with httpx.AsyncClient(timeout=self.timeout, max_redirects=self.max_redirects, follow_redirects=True) as client:
                response = await client.get(url)
                
                content_length = int(response.headers.get('content-length', 0))
                if content_length > self.max_response_size:
                    return None

                html = response.text
                if len(html.encode('utf-8')) > self.max_response_size:
                    html = html.encode('utf-8')[:self.max_response_size].decode('utf-8', 'ignore')

                features['status_code'] = response.status_code
                features['redirect_count'] = len(response.history)
                features['final_url'] = str(response.url)
                features['content_type'] = response.headers.get('content-type', '')
                features['html_size'] = len(html)

                lower_html = html.lower()
                features['num_forms'] = lower_html.count('<form')
                features['num_iframes'] = lower_html.count('<iframe')
                features['num_external_scripts'] = len(re.findall(r'<script[^>]+src=["\'](http[^"\']+)["\']', lower_html))
                
                features['has_password_input'] = 1 if 'type="password"' in lower_html or "type='password'" in lower_html else 0
                
                features['num_external_resources'] = len(re.findall(r'href=["\'](http[^"\']+)["\']', lower_html)) + \
                                                     len(re.findall(r'src=["\'](http[^"\']+)["\']', lower_html))
                
                title_match = re.search(r'<title>(.*?)</title>', lower_html, re.IGNORECASE)
                title = title_match.group(1) if title_match else ""
                suspicious_title_keywords = ['login', 'verify', 'account', 'secure', 'bank', 'update']
                features['suspicious_title'] = 1 if any(kw in title for kw in suspicious_title_keywords) else 0

                features['num_hidden_elements'] = lower_html.count('type="hidden"') + lower_html.count("display: none") + lower_html.count("visibility: hidden")

                return features
        except Exception:
            return None
