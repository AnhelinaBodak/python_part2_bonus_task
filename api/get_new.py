from fastapi import APIRouter
import json
import os
from elasticsearch import Elasticsearch

router = APIRouter(tags=['10 latest CVEs'])

@router.get("/get/new")

def get_new(limit: int = 10):
    index_name = 'cve'
    es_url = os.environ.get("ES_URL")
    es_token = os.environ.get("ES_TOKEN")

    if not (es_token and es_url):
        print('Elasticsearch URL and/or Token not provided!')

    client = Elasticsearch(es_url, api_key = es_token)

    response = client.search(index=index_name, body={
        "size": limit,
        "query" :  {"match_all":{}},
        "sort": [
            {"dateAdded": {"order": "desc"}}
        ],
    } )
    results = response["hits"]["hits"]

    return {
        "count": len(results),
        "results":(doc['_source'] for doc in response.get('hits', {}).get('hits', []))
    }
