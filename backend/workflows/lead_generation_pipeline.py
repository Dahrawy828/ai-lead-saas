from agents.lead_finder_agent import lead_finder_agent


async def run_lead_generation_pipeline(search_params: dict):

    context = {
        "search_params": search_params,
        "leads": [],
        "logs": []
    }

    context["leads"] = await lead_finder_agent.find_leads(search_params)

    return context