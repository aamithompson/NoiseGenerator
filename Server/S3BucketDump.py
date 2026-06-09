import os
import uuid
import boto3

s3 = boto3.client('s3')
BUCKET = os.environ['S3_BUCKET']
DEFUALT_EXPIRY = 600

def upload_and_presign(data, expiry=DEFUALT_EXPIRY):
    key = f"noise/{uuid.uuid4()}.json"
    s3.put_object(
        Bucket=BUCKET,
        Key=key,
        Body=json.dumps(data).encode('utf-8')
    )
    
    url = s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': BUCKET, 'Key': key},
        ExpiresIn=expiry
    )
    
    return url

def WrapData(data, expiry=DEFUALT_EXPIRY):
    presignedURL = upload_and_presign(data, expiry)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"url": presignedURL})
    }