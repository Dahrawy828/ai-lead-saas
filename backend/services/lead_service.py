from workflows.lead_generation_pipeline import run_lead_generation_pipeline


async def generate_leads(data: dict):

    leads = await run_lead_generation_pipeline(data)

    return leads