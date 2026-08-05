import pytest
import sys
import os
import asyncio

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from features.webpage_features import WebpageFeatureExtractor

@pytest.mark.asyncio
async def test_private_ip_blocking():
    extractor = WebpageFeatureExtractor()
    
    res1 = await extractor.extract("http://127.0.0.1/")
    assert res1 is None
    
    res2 = await extractor.extract("http://192.168.1.1/")
    assert res2 is None
    
    res3 = await extractor.extract("http://10.0.0.1/")
    assert res3 is None
    
    res4 = await extractor.extract("http://172.16.0.1/")
    assert res4 is None

@pytest.mark.asyncio
async def test_protocol_blocking():
    extractor = WebpageFeatureExtractor()
    
    res1 = await extractor.extract("file:///etc/passwd")
    assert res1 is None
    
    res2 = await extractor.extract("ftp://example.com")
    assert res2 is None
