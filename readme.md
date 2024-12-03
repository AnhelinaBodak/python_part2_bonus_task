# CVE FastAPI App with ElasticSearch

A FastAPI application to interact with CVE (Common Vulnerabilities and Exposures) data using ElasticSearch.

# Project Structure
- **api/**: Contains the logic for handling the various endpoints.
  - `get.py`: Endpoint for searching CVEs by keyword; a client connection is created using URL and API to send a search request; request looks for the match of keyword in all fields (using query_string); returns CVEs with the keyword & their number; defines 'get' endpoint. 
  - `get_all.py`: Endpoint for retrieving all vulnerabilities from last 30 days; a client connection is created using URL and API to send a search request; request looks for the range match in "dateAdded", where range is last 30 days and performs a sort in descending order; number of retrived CVEs is managed by default and can be changed by user; returns specified number of found CVEs (default: 20); defines 'get/all'. 
  - `get_known.py`: Endpoint for retrieving known ransomware vulnerabilities; a client connection is created using URL and API to send a search request; request looks for the match in "knownRansomwareCampaignUse", where value is "Known"; number of retrived CVEs is managed by default and can be changed by user; returns specified number of found CVEs (default: 10); defines 'get/known'. 
  - `get_new.py`: Endpoint for retrieving the latest CVEs; a client connection is created using URL and API to send a search request; request looks for a specified number of CVEs and performs a sort in descending order; number of retrived CVEs is managed by default and can be changed by user; returns specified number of found CVEs (default: 10); defines 'get/new'.
  - `info.py`: Endpoint for information about author.
  - `init_db_content.py`: Endpoint for initializing db (adding docs to index); loads a json file and retrives vulnerabilities; a doc is created for each vulnerability with relavant data, unique id is created for each (using uuid4). each doc is added to the index 'cve' via a client connection using URL and API to send a create request; defines '/init-db-content'.
- **data/**: Contains the `known_exploited_vulnerabilities.json` file, which holds the CVE data.
- **migations/**: Contains the `create_cve_index.py` script; creates a client connection using URL and API to send a create request for new index.
- **static/**: Contains static files like CSS and JS for frontend functionalities.
  - `script.js`: JavaScript file for handling frontend actions.
  - `styles.css`: Styling for the web interface.
- **templates/**: Contains HTML templates for rendering the web pages.
  - `index.html`: The main HTML page.
- **main.py**: The entry point for the FastAPI app, which defines start page; integrates API routes; sets up static files and templates.

# Usage
Interaction with Elasticsearch requires personal URL and API key. In the launch.json add following configurations:
{
            "name": "Python: FastAPI",
            "type": "debugpy",
            "request": "launch",
            "module": "uvicorn",
            "console": "integratedTerminal",
            "justMyCode": true,
            "args":  [
                "main:app",
                "--host",
                "127.0.0.1",
                "--port",
                "8000"
                ],
            "env": {
                "ES_URL": "YOUR URL HERE",
                "ES_TOKEN": "YOUR ENCODED API HERE",
            }
        }



