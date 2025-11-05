# 🚀 Supabase Backend Setup Guide for LU ClassHub

## Step 1: Create a Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign in with GitHub (recommended) or email
4. Click **"New Project"**

## Step 2: Create Your Project

1. **Organization**: Create a new organization or use existing
2. **Project Name**: `lu-classhub` (or any name you like)
3. **Database Password**: Choose a strong password (save it!)
4. **Region**: Choose closest to India (e.g., Southeast Asia)
5. Click **"Create new project"** (takes ~2 minutes)

## Step 3: Get Your API Credentials

1. Once project is created, go to **Settings** (gear icon on left)
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6...` (long string)

## Step 4: Add Credentials to Your Project

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Open `.env` file and replace with your actual values:
   ```
   REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```

## Step 5: Create Database Tables

In Supabase Dashboard:

1. Go to **"Table Editor"** (database icon on left)
2. Click **"Create a new table"**

### Create `users` table:
- Table name: `users`
- Columns:
  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `name` (text, not null)
  - `email` (text, unique, not null)
  - `password` (text, not null) - *We'll use Supabase Auth instead later*
  - `role` (text, not null) - 'student' or 'teacher'
  - `branch` (text)
  - `created_at` (timestamp, default: `now()`)

### Create `classes` table:
- Table name: `classes`
- Columns:
  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `title` (text, not null)
  - `subject` (text, not null)
  - `instructor` (text, not null)
  - `branch` (text, not null)
  - `semester` (integer, not null)
  - `description` (text)
  - `created_at` (timestamp, default: `now()`)

### Create `materials` table:
- Table name: `materials`
- Columns:
  - `id` (uuid, primary key, default: `gen_random_uuid()`)
  - `class_id` (uuid, foreign key to classes.id)
  - `title` (text, not null)
  - `type` (text) - 'pdf', 'video', 'link'
  - `url` (text, not null)
  - `uploaded_by` (uuid, foreign key to users.id)
  - `created_at` (timestamp, default: `now()`)

## Step 6: Enable Row Level Security (RLS)

For each table:
1. Click the table
2. Click **"RLS is not enabled"** warning
3. Click **"Enable RLS"**
4. Add policies:
   - **SELECT**: Enable read access for authenticated users
   - **INSERT**: Enable for authenticated users
   - **UPDATE**: Enable for authenticated users
   - **DELETE**: Enable for authenticated users

## Step 7: Restart Your App

```powershell
# Stop the current server (Ctrl+C in terminal)
npm start
```

## Step 8: Test the Integration

Your app will now:
- ✅ Store users in Supabase database (not localStorage)
- ✅ Share data across all devices
- ✅ Persist data forever (not cleared with browser cache)
- ✅ Support file uploads to Supabase Storage

## Next Steps

After basic setup works, we can:
1. Replace localStorage auth with **Supabase Auth** (built-in, secure)
2. Add file upload functionality for PDFs/materials
3. Enable real-time updates when new materials are added
4. Add user profiles with avatars

## Troubleshooting

**Problem**: App shows "YOUR_SUPABASE_URL" error
- **Solution**: Make sure `.env` file exists and has correct values

**Problem**: Database queries fail
- **Solution**: Check RLS policies are enabled and allow authenticated access

**Problem**: Can't see data
- **Solution**: Go to Supabase Dashboard → Table Editor to view data directly

## Useful Resources

- **Supabase Docs**: https://supabase.com/docs
- **Authentication Guide**: https://supabase.com/docs/guides/auth
- **Storage Guide**: https://supabase.com/docs/guides/storage

---

Need help? Check the Supabase docs or ask me! 🚀
