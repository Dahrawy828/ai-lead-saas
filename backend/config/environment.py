from dotenv import load_dotenv
import os

load_dotenv()

class Environment:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

env = Environment()