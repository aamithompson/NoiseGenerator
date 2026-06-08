import os
import json
import re

CONSTRAINTS_DIR = "/opt/Constraints" if os.path.exists("/opt/Constraints") \
    else os.path.join(os.path.dirname(__file__), "..", "Shared", "Constraints")

with open(os.path.join(CONSTRAINTS_DIR, "AuditoryNoiseConstraints.json")) as f:
    configAuditory = json.load(f)

with open(os.path.join(CONSTRAINTS_DIR, "PerlinNoiseConstraints.json")) as f:
    configPerlin = json.load(f)

with open(os.path.join(CONSTRAINTS_DIR, "VoronoiNoiseConstraints.json")) as f:
    configVoronoi = json.load(f)

settings = configAuditory["settings"] | configPerlin["settings"] | configVoronoi["settings"]

def validate(key, value):
    s = settings.get(key)
    if not s:
        raise KeyError(f"Unknown setting: {key}")

    if s["type"] in ("float", "int"):
        if not (s["min"] <= value <= s["max"]):
            raise ValueError(f"{key} must be between {s['min']} and {s['max']}")
        if s["type"] == "int" and not isinstance(value, int):
            raise TypeError(f"{key} must be an integer")

    if s["type"] == "string":
        if not (s["minLength"] <= len(value) <= s["maxLength"]):
            raise ValueError(f"{key} length must be {s['minLength']}–{s['maxLength']}")
        if "pattern" in s and not re.fullmatch(s["pattern"], value):
            raise TypeError(f"{key} does not match required pattern")

    if s["type"] == "enum" and value not in s["options"]:
        raise ValueError(f"{key} must be one of: {s['options']}")

    return True