from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from elasticsearch import Elasticsearch

from api import info, get_all, get_new, get_known, get, init_db_content

ELASTIC_URL = ("https://bec0bdead50f4e2891f1de0120bf43c9.europe-north1"
               ".gcp.elastic-cloud.com:443")

app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

client = Elasticsearch(
    ELASTIC_URL,
    api_key = "VTFBNGlKTUJlc0lPWlFLR3NrejQ6Mml4ZHNIYlNTSEtqOGY4ZjVkT0Q0Zw==",
)

app.include_router(info.router)
app.include_router(get_all.router)
app.include_router(get_new.router)
app.include_router(get_known.router)
app.include_router(get.router)
app.include_router(init_db_content.router)

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

