import LambdaHandlers as lh
import json

def lambda_handler(event, context):
    body = json.loads(event.get("body", "{}"))
    noiseClass = body.get("noiseClass")

    match noiseClass:
        case "auditory":
            result = lh.HandleAuditory(body)
        case "perlin":
            result = lh.HandlePerlin(body)
        case "worley":
            result = lh.HandleWorley(body)
        case _:
            return {"statusCode": 400, "body": json.dumps({"error": "unknown noise type"})}
        
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"data": result})
    }