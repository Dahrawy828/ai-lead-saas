from workflows.lead_generation_pipeline import run_lead_generation_pipeline
from database.supabase_client import supabase


async def generate_leads(search_params: dict, user_id: str):

    # Step 1 — Create lead search record
    search_result = supabase.table("lead_searches").insert({
        "user_id": user_id,
        "industry": search_params.get("industry"),
        "country": search_params.get("country"),
        "city": search_params.get("city"),
        "company_size": search_params.get("company_size"),
        "keywords": search_params.get("keywords"),
        "requested_limit": search_params.get("requested_limit")
    }).execute()

    search_id = search_result.data[0]["id"]

    # Step 2 — Run AI pipeline
    pipeline_result = await run_lead_generation_pipeline(search_params)

    leads = pipeline_result["leads"]

    saved_leads = []

    # Step 3 — Save leads in database
    for lead in leads:

        result = supabase.table("leads").insert({
            "search_id": search_id,
            "company_name": lead.get("company"),
            "website": lead.get("website"),
            "email": lead.get("email"),
            "linkedin": lead.get("linkedin"),
            "contact_page": lead.get("contact_page"),
            "score": lead.get("score"),
            "cold_email": lead.get("cold_email"),
            "linkedin_message": lead.get("linkedin_message"),
            "status": lead.get("status", "new")
        }).execute()

        saved_leads.append(result.data[0])

    return saved_leads