from fastapi import APIRouter
import os
from elasticsearch import Elasticsearch

router = APIRouter(tags=['Get known vulnerabilities'])

@router.get("/get/known")
def get_known(limit: int = 10):
    index_name = 'cve'
    es_url = os.environ.get("ES_URL")
    es_token = os.environ.get("ES_TOKEN")

    if not (es_token and es_url):
        print('Elasticsearch URL and/or Token not provided!')

    client = Elasticsearch(es_url, api_key = es_token)

    response = client.search(index=index_name, body={
        "size": limit,
        "query" :  {"match":{
            "knownRansomwareCampaignUse" : "Known"
        }}
    } )
    results = response["hits"]["hits"]

    return {
        "count": len(results),
        "results":(doc['_source'] for doc in response.get('hits', {}).get('hits', []))
    }