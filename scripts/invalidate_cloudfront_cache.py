# Pick up dotenv vars. Argument of "invalidate" will invalidate the cache.

import os
from dotenv import load_dotenv
import boto3

def invalidate_cloudfront_cache():
    # Load environment variables
    load_dotenv()
    # Create a CloudFront client
    cloudfront = boto3.client('cloudfront')
    # Create an invalidation
    invalidation = cloudfront.create_invalidation(
        DistributionId=os.getenv('CLOUDFRONT_DISTRIBUTION_ID'),
        InvalidationBatch={
            'Paths': {
                'Quantity': 1,
                'Items': [
                    '/*'
                ]
            },
            'CallerReference': 'npm run deploy'
        }
    )
    print(invalidation)

if __name__ == '__main__':
    invalidate_cloudfront_cache()