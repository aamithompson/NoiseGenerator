import LambdaHandlers as lh
import json

def lambda_handler(event, context):
    #Server Health Check
    route_key = event.get("routeKey")

    if route_key == "GET /api/health":
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"status": "ok"})
        }

    #Noise Return Functions
    body = json.loads(event.get("body", "{}"))
    noiseClass = body.get("noiseClass")

    match noiseClass:
        case "auditory":
            result = lh.HandleAuditory(body)
        case "perlin":
            print("Entering HandlePerlin")
            result = lh.HandlePerlin(body)
            print("Leaving HandlePerlin")
        case "worley":
            result = lh.HandleWorley(body)
        case _:
            return {"statusCode": 400, "body": json.dumps({"error": "unknown noise type"})}
        
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"data": result})
    }