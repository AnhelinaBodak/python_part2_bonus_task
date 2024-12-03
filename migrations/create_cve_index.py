import os
from elasticsearch import Elasticsearch

def create_cve_index():
    es_url = os.environ.get("ES_URL")
    es_token = os.environ.get("ES_TOKEN")

    if not (es_token and es_url):
        print('Elasticsearch URL and/or Token not provided!')

    client = Elasticsearch(es_url, api_key = es_token)
    response = client.indices.create(index='cve')

    if response.meta.status == 200:
        print("Succes!")
    else:
        print("Creation of index failed!")

if __name__ == '__main__':
    create_cve_index()