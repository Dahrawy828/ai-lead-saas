from .environment import env

class Settings:
    SUPABASE_URL = env.SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY
    OPENAI_API_KEY = env.OPENAI_API_KEY

settings = Settings()