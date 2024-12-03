from fastapi import APIRouter

router = APIRouter(tags=['Info page'])

@router.get("/info")
def app_info():
    return {
        "app_name": "CVE FastAPI App using ElasticSearch",
        "author": "Anhelina Bodak",
    }
