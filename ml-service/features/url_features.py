import urllib.parse
import re
import math
import ipaddress

class URLFeatureExtractor:
    def __init__(self):
        self.suspicious_keywords = ['login', 'verify', 'secure', 'account', 'update', 'bank', 'paypal', 'signin', 'confirm', 'password', 'suspend', 'alert', 'unusual', 'expire', 'billing']
        self.shortener_domains = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly', 'adf.ly', 'bit.do', 'mcaf.ee']
        self.suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.pw', '.cc', '.club', '.work', '.date', '.racing', '.win', '.bid', '.stream', '.download']
        self.special_chars = set('@!#$%^&*()=+[]{}|;:\'",<>?/')

    def extract(self, url: str) -> dict:
        features = {}
        if not url.startswith('http'):
            url_to_parse = 'http://' + url
        else:
            url_to_parse = url

        try:
            parsed = urllib.parse.urlparse(url_to_parse)
        except Exception:
            parsed = urllib.parse.urlparse('http://invalid.url')

        hostname = parsed.netloc.split(':')[0].lower()
        path = parsed.path

        # 1. url_length
        features['url_length'] = len(url)
        # 2. hostname_length
        features['hostname_length'] = len(hostname)
        # 3. path_length
        features['path_length'] = len(path)
        # 4. num_dots
        features['num_dots'] = url.count('.')
        # 5. num_hyphens
        features['num_hyphens'] = url.count('-')
        # 6. num_underscores
        features['num_underscores'] = url.count('_')
        # 7. num_digits
        features['num_digits'] = sum(1 for c in url if c.isdigit())
        # 8. num_special_chars
        features['num_special_chars'] = sum(1 for c in url if c in self.special_chars)
        
        # 9. num_subdomains
        domain_parts = hostname.split('.')
        features['num_subdomains'] = max(0, len(domain_parts) - 2) if len(domain_parts) > 1 else 0

        # 10. has_ip_address
        try:
            ipaddress.ip_address(hostname)
            features['has_ip_address'] = 1
        except ValueError:
            features['has_ip_address'] = 0

        # 11. has_at_symbol
        features['has_at_symbol'] = 1 if '@' in url else 0

        # 12. has_suspicious_keywords
        lower_url = url.lower()
        features['has_suspicious_keywords'] = 1 if any(kw in lower_url for kw in self.suspicious_keywords) else 0

        # 13. is_shortened_url
        features['is_shortened_url'] = 1 if any(hostname == sd or hostname.endswith('.' + sd) for sd in self.shortener_domains) else 0

        # 14. is_https
        features['is_https'] = 1 if parsed.scheme == 'https' or url.startswith('https://') else 0

        # 15. query_param_count
        features['query_param_count'] = len(urllib.parse.parse_qs(parsed.query)) if parsed.query else 0

        # 16. has_fragment
        features['has_fragment'] = 1 if parsed.fragment else 0

        # 17. num_encoded_chars
        features['num_encoded_chars'] = len(re.findall(r'%[0-9a-fA-F]{2}', url))

        # 18. suspicious_tld
        features['suspicious_tld'] = 1 if any(hostname.endswith(tld) for tld in self.suspicious_tlds) else 0

        # 19. hostname_entropy
        features['hostname_entropy'] = self._calculate_entropy(hostname)
        # 20. path_entropy
        features['path_entropy'] = self._calculate_entropy(path)

        # 21. digit_ratio
        features['digit_ratio'] = features['num_digits'] / max(1, len(url))
        # 22. special_char_ratio
        features['special_char_ratio'] = features['num_special_chars'] / max(1, len(url))

        # 23. path_depth
        features['path_depth'] = path.count('/')

        # 24. domain_token_count
        tokens = re.split(r'[.-]', hostname)
        features['domain_token_count'] = len([t for t in tokens if t])

        # 25. longest_subdomain_length
        if len(domain_parts) > 2:
            features['longest_subdomain_length'] = max(len(p) for p in domain_parts[:-2])
        elif len(domain_parts) > 1:
            features['longest_subdomain_length'] = len(domain_parts[0])
        else:
            features['longest_subdomain_length'] = 0

        return features

    def _calculate_entropy(self, text: str) -> float:
        if not text:
            return 0.0
        entropy = 0.0
        length = len(text)
        char_counts = {}
        for char in text:
            char_counts[char] = char_counts.get(char, 0) + 1
        for count in char_counts.values():
            prob = count / length
            entropy -= prob * math.log2(prob)
        return entropy
