from database.supabase_client import supabase


async def get_user_leads(user_id: str):

    response = supabase.table("lead_searches") \
        .select("id, leads(*)") \
        .eq("user_id", user_id) \
        .execute()

    searches = response.data or []

    leads = []

    for search in searches:
        leads.extend(search.get("leads", []))

    return leads


async def get_leads_per_day(user_id: str):

    leads = await get_user_leads(user_id)

    leads_per_day = {}

    for lead in leads:

        created_at = lead.get("created_at", "")
        day = created_at[:10]

        leads_per_day[day] = leads_per_day.get(day, 0) + 1

    return [
        {"date": k, "leads": v}
        for k, v in leads_per_day.items()
    ]


async def get_score_distribution(user_id: str):

    leads = await get_user_leads(user_id)

    score_distribution = {
        "0-20": 0,
        "20-40": 0,
        "40-60": 0,
        "60-80": 0,
        "80-100": 0
    }

    for lead in leads:

        score = lead.get("score", 0)

        if score < 20:
            score_distribution["0-20"] += 1
        elif score < 40:
            score_distribution["20-40"] += 1
        elif score < 60:
            score_distribution["40-60"] += 1
        elif score < 80:
            score_distribution["60-80"] += 1
        else:
            score_distribution["80-100"] += 1

    return [
        {"score": k, "count": v}
        for k, v in score_distribution.items()
    ]


async def get_top_industries(user_id: str):

    response = supabase.table("lead_searches") \
        .select("industry, leads(id)") \
        .eq("user_id", user_id) \
        .execute()

    searches = response.data or []

    industries = {}

    for search in searches:

        industry = search.get("industry") or "Other"
        leads = search.get("leads", [])

        industries[industry] = industries.get(industry, 0) + len(leads)

    return [
        {"name": k, "value": v}
        for k, v in industries.items()
    ]
