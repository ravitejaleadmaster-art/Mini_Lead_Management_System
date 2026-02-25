# Mini Lead Management System 🚀

A full-stack application with a **Node.js and Express** server and a **React** client.

## 📁 Project Structure
- **/client**: Frontend application.
- **/server**: Node.js Backend API.
- **/.github**: GitHub Actions CI/CD workflows.

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org) (v18+)
- [Git](https://git-scm.com)
- [Express](https://expressjs.com)

## The Day one tasks Screenshot
### Frontend
![the day tasks Screenshots](./screenshots/Frontend.png)

### Backend 
![backend screenshot](./screenshots/Backend.png)

# Day 2

### postman_screenshots
### 1. Post Method's SS
![postman screenshot_Post](./screenshots/Day2_Post.png)

### 2. Get Method's SS
![postman screenshot_Get](./screenshots/Day2_Get.png)

# Day 3

### Screen Recording

##### please go in the screenshots folder and find the Day3_record.mp4  (.screenshots/Day3_Recording )

# 
# Day 4

## 🔐 Login Flow Demo

### User Authentication Process

1. **User enters credentials** on the login page
   - Username: `admin`
   - Password: `password`

2. **Frontend sends POST request** to the backend
   ```
   POST /api/login
   {
     "username": "admin",
     "password": "password"
   }
   ```

3. **Backend validates credentials**
   - Checks if username and password match the admin user
   - If valid, generates a JWT token with 15 min expiration

4. **Token is returned** to the frontend
   ```json
   {
     "success": true,
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

5. **Token is stored** in browser's localStorage
   - Key: `token`
   - Value: JWT token string

6. **User is redirected** to `/leads` page
   - ProtectedRoute component verifies token exists
   - Authorization header is set for all API requests

7. **Subsequent API calls** include the token
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Login Flow Diagram
```
User Login Page
      ↓
User enters credentials (admin/password)
      ↓
POST /api/login with credentials
      ↓
Backend validates username & password
      ↓
Backend generates JWT token ( refreshed )
      ↓
Token sent to Frontend
      ↓
Token stored in localStorage
      ↓
User redirected to /leads
      ↓
ProtectedRoute checks token exists
      ↓
LeadsPage loaded & token added to headers
      ↓
Authenticated requests to API

note : tokens are refreshed for every 15mins and longlived for the 7 days which prevents from attacking 
```

---

## The screenshot of the testing with and without token

### Testing without token
![postman screenshot_Get](./screenshots/Testing_without_token.png)
### Testing with token
![postman screenshot_Get](./screenshots/Testing_with_token.png)


# Day 5


so added the pagination via use effects in frontend and grasped the 


so the cons if the “If this had 500k leads, what breaks first?”

1) The Browser Memory (Frontend Crash)
       
2) Database Query Performance (Backend Lag)