import LambdaHandlers as lh
import S3BucketDump as bd
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
            return bd.WrapData(lh.HandleAuditory(body))
        case "perlin":
            return bd.WrapData(lh.HandlePerlin(body))
        case "voronoi":
            return bd.WrapData(lh.HandleWorley(body))
        case _:
            return {"statusCode": 400, "body": json.dumps({"error": "unknown noise type"})}