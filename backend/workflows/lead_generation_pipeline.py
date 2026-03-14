from agents.lead_finder_agent import lead_finder_agent
from agents.lead_analyzer_agent import lead_analyzer_agent


async def run_lead_generation_pipeline(search_params: dict):

    context = {
        "search_params": search_params,
        "leads": [],
        "logs": []
    }

    # Step 1 — Find companies
    context["leads"] = await lead_finder_agent.find_leads(search_params)

    # Step 2 — Analyze leads with AI
    context = await lead_analyzer_agent.analyze_leads(context)

    return context