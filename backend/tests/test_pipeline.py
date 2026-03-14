import sys
import os
import asyncio

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from workflows.lead_generation_pipeline import run_lead_generation_pipeline


async def test():

    search_params = {
        "industry": "dentists",
        "location": "london"
    }

    result = await run_lead_generation_pipeline(search_params)

    print(result)


asyncio.run(test())