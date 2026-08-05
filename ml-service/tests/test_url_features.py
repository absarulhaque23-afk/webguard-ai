import pytest
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from features.url_features import URLFeatureExtractor
from features.feature_names import FEATURE_NAMES

def test_benign_url():
    extractor = URLFeatureExtractor()
    features = extractor.extract("https://google.com/search?q=test")
    
    assert features['is_https'] == 1
    assert features['has_ip_address'] == 0
    assert features['has_suspicious_keywords'] == 0
    assert features['is_shortened_url'] == 0
    assert features['query_param_count'] == 1

def test_malicious_url():
    extractor = URLFeatureExtractor()
    features = extractor.extract("http://verify-account-update.secure-login.com/login.php")
    
    assert features['is_https'] == 0
    assert features['has_suspicious_keywords'] == 1
    assert features['num_hyphens'] > 0
    
def test_ip_address():
    extractor = URLFeatureExtractor()
    features = extractor.extract("http://192.168.1.1/admin")
    
    assert features['has_ip_address'] == 1

def test_shortened_url():
    extractor = URLFeatureExtractor()
    features = extractor.extract("https://bit.ly/12345")
    
    assert features['is_shortened_url'] == 1

def test_entropy():
    extractor = URLFeatureExtractor()
    features1 = extractor.extract("https://google.com")
    features2 = extractor.extract("https://asdfghjklqwertyuiopzxcvbnm.com")
    
    assert features2['hostname_entropy'] > features1['hostname_entropy']

def test_edge_cases():
    extractor = URLFeatureExtractor()
    
    # Empty url
    f1 = extractor.extract("")
    assert set(f1.keys()) == set(FEATURE_NAMES)
    
    # Malformed url
    f2 = extractor.extract("htt://invalid[url]")
    assert set(f2.keys()) == set(FEATURE_NAMES)
    
    # Very long url
    long_url = "http://example.com/" + "a"*1000
    f3 = extractor.extract(long_url)
    assert f3['url_length'] > 1000
