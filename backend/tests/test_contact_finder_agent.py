from backend.agents.contact_finder_agent import contact_finder_agent


context = {
    "search_params": {},
    "leads": [
        {
            "company": "Bright Dental Clinic",
            "website": "https://brightdental.com"
        },
        {
            "company": "SmileCare Center",
            "website": "https://smilecare.io"
        }
    ],
    "logs": []
}


result = contact_finder_agent.run(context)

print(result)