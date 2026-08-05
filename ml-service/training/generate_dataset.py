"""
Synthetic Phishing URL Dataset Generator
Generates ~10,000 unique labeled URL samples for ML training.
"""
import pandas as pd
import random
import string
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from features.url_features import URLFeatureExtractor
from features.feature_names import FEATURE_NAMES


def random_string(length: int, chars: str = string.ascii_lowercase) -> str:
    return ''.join(random.choices(chars, k=length))


def random_path_segment() -> str:
    words = ['about', 'contact', 'help', 'faq', 'terms', 'privacy', 'blog',
             'news', 'products', 'services', 'team', 'careers', 'docs',
             'api', 'status', 'pricing', 'features', 'support', 'resources',
             'community', 'events', 'press', 'partners', 'investors',
             'settings', 'account', 'profile', 'notifications', 'search',
             'explore', 'trending', 'popular', 'latest', 'categories',
             'tags', 'archive', 'sitemap', 'feed', 'rss', 'tools',
             'download', 'upload', 'share', 'embed', 'widget', 'plugins']
    return random.choice(words)


def generate_benign_url() -> str:
    """Generate a realistic benign URL."""
    domains = [
        'google.com', 'github.com', 'stackoverflow.com', 'amazon.com',
        'microsoft.com', 'apple.com', 'wikipedia.org', 'youtube.com',
        'reddit.com', 'linkedin.com', 'twitter.com', 'facebook.com',
        'medium.com', 'netflix.com', 'spotify.com', 'dropbox.com',
        'slack.com', 'zoom.us', 'notion.so', 'figma.com', 'vercel.com',
        'cloudflare.com', 'docker.com', 'npmjs.com', 'pypi.org',
        'mozilla.org', 'w3.org', 'ieee.org', 'mit.edu', 'stanford.edu',
        'bbc.com', 'cnn.com', 'nytimes.com', 'reuters.com', 'bloomberg.com',
        'shopify.com', 'stripe.com', 'paypal.com', 'ebay.com', 'walmart.com',
        'target.com', 'bestbuy.com', 'homedepot.com', 'ikea.com',
        'airbnb.com', 'booking.com', 'expedia.com', 'tripadvisor.com',
        'uber.com', 'lyft.com', 'doordash.com', 'grubhub.com',
    ]
    subdomains = ['', 'www.', 'docs.', 'blog.', 'api.', 'app.', 'mail.',
                  'help.', 'support.', 'dev.', 'cdn.', 'static.', 'm.']

    domain = random.choice(domains)
    subdomain = random.choice(subdomains)

    # Generate path with 0-3 segments
    depth = random.randint(0, 3)
    path_parts = [random_path_segment() for _ in range(depth)]
    if depth > 0 and random.random() < 0.3:
        path_parts.append(random_string(random.randint(3, 12)))
    path = '/' + '/'.join(path_parts) if path_parts else '/'

    # Optionally add query params
    query = ''
    if random.random() < 0.25:
        num_params = random.randint(1, 3)
        params = [f"{random_path_segment()}={random_string(random.randint(2, 8))}"
                  for _ in range(num_params)]
        query = '?' + '&'.join(params)

    # Optionally add fragment
    fragment = ''
    if random.random() < 0.1:
        fragment = '#' + random_path_segment()

    return f"https://{subdomain}{domain}{path}{query}{fragment}"


def generate_suspicious_url() -> str:
    """Generate a URL with some suspicious characteristics."""
    suspicious_tlds = ['.xyz', '.top', '.club', '.work', '.date',
                       '.racing', '.win', '.bid', '.stream', '.info',
                       '.online', '.site', '.website', '.space', '.tech']
    suspicious_keywords = ['free', 'winner', 'prize', 'offer', 'deal',
                           'discount', 'cheap', 'bonus', 'reward', 'gift',
                           'promo', 'limited', 'exclusive', 'special',
                           'trial', 'sample', 'giveaway', 'cashback']
    domains_base = ['online-shop', 'web-service', 'cloud-storage', 'tech-hub',
                    'data-center', 'net-solutions', 'web-portal', 'info-center',
                    'digital-media', 'smart-tools', 'quick-search', 'fast-host',
                    'mega-store', 'super-deal', 'best-price', 'top-rated']

    base = random.choice(domains_base)
    tld = random.choice(suspicious_tlds)

    # Sometimes add a random subdomain
    subdomain = ''
    if random.random() < 0.4:
        subdomain = random_string(random.randint(3, 8)) + '.'

    # Build path with some suspicious elements
    path_parts = []
    depth = random.randint(1, 3)
    for _ in range(depth):
        if random.random() < 0.4:
            path_parts.append(random.choice(suspicious_keywords))
        else:
            path_parts.append(random_path_segment())

    # Sometimes add encoded characters
    if random.random() < 0.3:
        path_parts.append(f"%{random.randint(0x20, 0x7E):02X}" + random_string(3))

    path = '/' + '/'.join(path_parts)

    # Query params with suspicious terms
    query = ''
    if random.random() < 0.5:
        params = []
        num_params = random.randint(1, 4)
        for _ in range(num_params):
            key = random.choice(['ref', 'id', 'src', 'utm', 'click', 'track', 'aff'])
            val = random_string(random.randint(5, 15))
            params.append(f"{key}={val}")
        query = '?' + '&'.join(params)

    # Mix of http and https
    scheme = random.choice(['http', 'https'])
    return f"{scheme}://{subdomain}{base}{tld}{path}{query}"


def generate_malicious_url() -> str:
    """Generate a URL with strong phishing/malicious indicators."""
    strategies = ['ip_address', 'domain_spoof', 'long_subdomain',
                  'keyword_stuff', 'encoded_chars', 'at_symbol']
    strategy = random.choice(strategies)

    suspicious_keywords = ['login', 'verify', 'secure', 'account', 'update',
                           'bank', 'paypal', 'signin', 'confirm', 'password',
                           'suspend', 'alert', 'unusual', 'expire', 'billing',
                           'authenticate', 'validate', 'recovery', 'unlock',
                           'restore', 'reactivate', 'credential', 'ssn']
    malicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.cc']
    target_brands = ['paypal', 'apple', 'google', 'microsoft', 'amazon',
                     'netflix', 'facebook', 'instagram', 'chase', 'wellsfargo',
                     'bankofamerica', 'citibank', 'usps', 'fedex', 'dhl',
                     'irs', 'coinbase', 'binance', 'blockchain']

    if strategy == 'ip_address':
        # Use IP address as hostname
        ip = f"{random.randint(1, 223)}.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(1, 254)}"
        path_parts = [random.choice(suspicious_keywords) for _ in range(random.randint(1, 3))]
        path_parts.append(random_string(random.randint(5, 10)))
        return f"http://{ip}/{'/'.join(path_parts)}"

    elif strategy == 'domain_spoof':
        # Spoof a legitimate domain
        brand = random.choice(target_brands)
        tld = random.choice(malicious_tlds)
        spoof_parts = [brand, random.choice(suspicious_keywords)]
        random.shuffle(spoof_parts)
        domain = '-'.join(spoof_parts) + '.' + random_string(random.randint(3, 8)) + tld
        path = '/' + '/'.join([random.choice(suspicious_keywords)
                               for _ in range(random.randint(1, 3))])
        return f"http://{domain}{path}"

    elif strategy == 'long_subdomain':
        # Very long subdomain chain
        brand = random.choice(target_brands)
        num_subs = random.randint(3, 6)
        subs = [random.choice(suspicious_keywords + [brand])
                for _ in range(num_subs)]
        tld = random.choice(malicious_tlds)
        base_domain = random_string(random.randint(5, 10)) + tld
        full_domain = '.'.join(subs) + '.' + base_domain
        return f"http://{full_domain}/{random.choice(suspicious_keywords)}.php"

    elif strategy == 'keyword_stuff':
        # Stuff many suspicious keywords
        tld = random.choice(malicious_tlds)
        base = random_string(random.randint(4, 8)) + tld
        keywords = random.sample(suspicious_keywords, min(5, len(suspicious_keywords)))
        path = '/' + '/'.join(keywords)
        # Add query params
        params = [f"{random.choice(['id', 'token', 'session', 'key'])}="
                  f"{random_string(random.randint(10, 30))}"
                  for _ in range(random.randint(2, 5))]
        query = '?' + '&'.join(params)
        return f"http://{base}{path}{query}"

    elif strategy == 'encoded_chars':
        # Heavy use of percent-encoding
        brand = random.choice(target_brands)
        tld = random.choice(malicious_tlds)
        domain = random_string(random.randint(5, 10)) + tld
        encoded_parts = []
        for char in brand:
            if random.random() < 0.5:
                encoded_parts.append(f"%{ord(char):02X}")
            else:
                encoded_parts.append(char)
        path = '/' + ''.join(encoded_parts) + '/' + random.choice(suspicious_keywords)
        return f"http://{domain}{path}"

    else:  # at_symbol
        # Use @ symbol to obscure real domain
        brand = random.choice(target_brands)
        tld = random.choice(malicious_tlds)
        real_domain = random_string(random.randint(5, 10)) + tld
        path = '/' + random.choice(suspicious_keywords)
        return f"http://{brand}.com@{real_domain}{path}"


def generate_dataset():
    """Generate the full synthetic dataset."""
    random.seed(42)
    extractor = URLFeatureExtractor()

    print("Generating synthetic phishing URL dataset...")

    urls = []
    labels = []

    # Generate 5000 Benign (0)
    print("  Generating 5000 benign URLs...")
    seen = set()
    attempts = 0
    while len([l for l in labels if l == 0]) < 5000 and attempts < 20000:
        url = generate_benign_url()
        attempts += 1
        if url not in seen:
            seen.add(url)
            urls.append(url)
            labels.append(0)

    # Generate 2500 Suspicious (1)
    print("  Generating 2500 suspicious URLs...")
    attempts = 0
    while len([l for l in labels if l == 1]) < 2500 and attempts < 10000:
        url = generate_suspicious_url()
        attempts += 1
        if url not in seen:
            seen.add(url)
            urls.append(url)
            labels.append(1)

    # Generate 2500 Malicious (2)
    print("  Generating 2500 malicious URLs...")
    attempts = 0
    while len([l for l in labels if l == 2]) < 2500 and attempts < 10000:
        url = generate_malicious_url()
        attempts += 1
        if url not in seen:
            seen.add(url)
            urls.append(url)
            labels.append(2)

    print(f"  Total unique URLs generated: {len(urls)}")
    print(f"  Class distribution: Benign={labels.count(0)}, "
          f"Suspicious={labels.count(1)}, Malicious={labels.count(2)}")

    # Extract features
    print("  Extracting features...")
    data = []
    for i, (url, label) in enumerate(zip(urls, labels)):
        features = extractor.extract(url)
        row = {'url': url, 'label': label}
        for fname in FEATURE_NAMES:
            row[fname] = features.get(fname, 0)
        data.append(row)
        if (i + 1) % 2000 == 0:
            print(f"    Processed {i + 1}/{len(urls)} URLs...")

    df = pd.DataFrame(data)

    # Save
    out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'datasets')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'phishing_dataset.csv')
    df.to_csv(out_path, index=False)
    print(f"\nDataset saved to {out_path}")
    print(f"Shape: {df.shape}")
    print(f"\nFeature statistics:")
    print(df[FEATURE_NAMES].describe().to_string())


if __name__ == "__main__":
    generate_dataset()
