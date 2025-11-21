# GitHub Upload Instructions

Follow these steps to upload your Movie Discovery App to your GitHub account.

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/) and log in to your account
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `movie-discovery-app` (or any name you prefer)
   - **Description**: "A React Native movie discovery app with popularity tracking - Academic Project"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

After creating the repository on GitHub, you'll see a page with setup instructions. Use these commands:

```bash
cd "d:\Movies App\react-native movie app"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR-USERNAME/movie-discovery-app.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Replace** `YOUR-USERNAME` with your actual GitHub username!

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md will be displayed on the repository homepage

## Step 4: Update Your Personal Information

Before sharing this project, make sure to update these files with your information:

### In README.md
At the bottom of the file, replace:
```markdown
**Developed by**: [Your Name]  
**Academic Institution**: [Your University/College]  
**Course**: [Your Course Name]  
**Year**: 2025
```

With your actual details.

## Important Security Notes

### ⚠️ NEVER Commit Your .env File with Real Credentials

The `.env` file is already in `.gitignore`, but double-check:

1. Open `.gitignore` and confirm `.env` is listed
2. Never run `git add .env` or `git add -f .env`
3. If you accidentally committed it:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env file"
   git push
   ```

### Create an .env.example File

Create a template for others (without real values):

```bash
# Create .env.example
EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id_here
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id_here
```

Then commit it:
```bash
git add .env.example
git commit -m "Add environment variables template"
git push
```

## Additional Git Commands

### Making Changes After Initial Upload

```bash
# Check status of changes
git status

# Add specific files
git add filename.tsx

# Or add all changes
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Creating Branches (Optional for Advanced Use)

```bash
# Create and switch to a new branch
git checkout -b feature/new-feature

# Make changes, commit them

# Push branch to GitHub
git push -u origin feature/new-feature

# Switch back to main branch
git checkout main
```

## Repository Best Practices

1. **Write Clear Commit Messages**: Describe what you changed
   - Good: "Add user authentication feature"
   - Bad: "Update files"

2. **Commit Frequently**: Make commits for logical chunks of work

3. **Keep README Updated**: Update documentation as you add features

4. **Use .gitignore**: Never commit sensitive data or dependencies

## Troubleshooting

### "Remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/movie-discovery-app.git
```

### "Permission denied"
- Make sure you're logged into the correct GitHub account
- Set up SSH keys or use HTTPS with personal access token
- GitHub Settings → Developer Settings → Personal Access Tokens

### "Failed to push"
```bash
# Pull first, then push
git pull origin main --rebase
git push
```

## What's Been Done

✅ Removed all references to the original tutorial project  
✅ Created custom README.md with your project documentation  
✅ Updated package.json with unique project name  
✅ Changed app.json with unique identifiers  
✅ Removed tutorial promotional images  
✅ Created CUSTOMIZATIONS.md to document your work  
✅ Initialized fresh git repository with no connection to original  
✅ Created initial commit  

## Ready to Upload!

Your project is now completely independent and ready to upload to your GitHub account. Follow the steps above to push it to your repository.
