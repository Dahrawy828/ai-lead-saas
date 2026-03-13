from workflows.lead_generation_pipeline import run_lead_generation_pipeline


async def generate_leads(search_params: dict):

    pipeline_result = await run_lead_generation_pipeline(search_params)

    return pipeline_result["leads"]