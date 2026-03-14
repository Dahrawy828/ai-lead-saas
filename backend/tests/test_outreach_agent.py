import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from agents.outreach_agent import outreach_agent


context = {
    "search_params": {},
    "leads": [
        {
            "company": "Bright Dental Clinic",
            "website": "https://brightdental.com",
            "email": "info@brightdental.com"
        }
    ],
    "logs": []
}


result = outreach_agent.run(context)

print(result)