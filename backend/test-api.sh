#!/bin/bash

# API Testing Script for SilicoInformatics Backend
# This script tests the authentication endpoints using curl

BASE_URL="http://localhost:5000"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== SilicoInformatics API Testing ===${NC}\n"

# Check if server is running
echo -e "${YELLOW}Checking if server is running...${NC}"
if curl -s "${BASE_URL}/api/health" > /dev/null; then
    echo -e "${GREEN}✅ Server is running${NC}\n"
else
    echo -e "${RED}❌ Server is not running. Please start the server with 'npm run dev'${NC}"
    exit 1
fi

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
HEALTH_RESPONSE=$(curl -s "${BASE_URL}/api/health")
echo "Response: ${HEALTH_RESPONSE}"
if [[ $HEALTH_RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Health check passed${NC}\n"
else
    echo -e "${RED}❌ Health check failed${NC}\n"
fi

# Test 2: Signup with valid data
echo -e "${YELLOW}Test 2: User Signup (Valid Data)${NC}"
TIMESTAMP=$(date +%s)
TEST_EMAIL="test-${TIMESTAMP}@example.com"

SIGNUP_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "'"${TEST_EMAIL}"'",
    "company": "Test Company",
    "industry": "pharmaceutical",
    "password": "TestPassword123!",
    "agreedToTerms": true
  }')

echo "Response: ${SIGNUP_RESPONSE}"
if [[ $SIGNUP_RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Signup successful${NC}"
    TOKEN=$(echo $SIGNUP_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
    USER_ID=$(echo $SIGNUP_RESPONSE | grep -o '"id":"[^"]*' | grep -o '[^"]*$')
    echo -e "Token: ${TOKEN:0:20}..."
    echo -e "User ID: ${USER_ID}\n"
else
    echo -e "${RED}❌ Signup failed${NC}\n"
fi

# Test 3: Login with valid credentials
echo -e "${YELLOW}Test 3: User Login (Valid Credentials)${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'"${TEST_EMAIL}"'",
    "password": "TestPassword123!"
  }')

echo "Response: ${LOGIN_RESPONSE}"
if [[ $LOGIN_RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Login successful${NC}\n"
else
    echo -e "${RED}❌ Login failed${NC}\n"
fi

# Test 4: Login with invalid password
echo -e "${YELLOW}Test 4: User Login (Invalid Password)${NC}"
INVALID_LOGIN=$(curl -s -X POST "${BASE_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'"${TEST_EMAIL}"'",
    "password": "WrongPassword123!"
  }')

echo "Response: ${INVALID_LOGIN}"
if [[ $INVALID_LOGIN == *"success\":false"* ]]; then
    echo -e "${GREEN}✅ Invalid login correctly rejected${NC}\n"
else
    echo -e "${RED}❌ Should have rejected invalid login${NC}\n"
fi

# Test 5: Duplicate email signup
echo -e "${YELLOW}Test 5: Signup with Duplicate Email${NC}"
DUPLICATE_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Another",
    "lastName": "User",
    "email": "'"${TEST_EMAIL}"'",
    "industry": "biotechnology",
    "password": "AnotherPassword123!",
    "agreedToTerms": true
  }')

echo "Response: ${DUPLICATE_RESPONSE}"
if [[ $DUPLICATE_RESPONSE == *"already exists"* ]]; then
    echo -e "${GREEN}✅ Duplicate email correctly rejected${NC}\n"
else
    echo -e "${RED}❌ Should have rejected duplicate email${NC}\n"
fi

# Test 6: Get current user profile
echo -e "${YELLOW}Test 6: Get Current User Profile${NC}"
if [ ! -z "$TOKEN" ]; then
    PROFILE_RESPONSE=$(curl -s -X GET "${BASE_URL}/api/auth/me" \
      -H "Authorization: Bearer ${TOKEN}")
    
    echo "Response: ${PROFILE_RESPONSE}"
    if [[ $PROFILE_RESPONSE == *"success\":true"* ]]; then
        echo -e "${GREEN}✅ Profile retrieved successfully${NC}\n"
    else
        echo -e "${RED}❌ Failed to retrieve profile${NC}\n"
    fi
else
    echo -e "${YELLOW}⚠️  Skipped (no token available)${NC}\n"
fi

# Test 7: Invalid email format
echo -e "${YELLOW}Test 7: Signup with Invalid Email Format${NC}"
INVALID_EMAIL=$(curl -s -X POST "${BASE_URL}/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "invalid-email",
    "industry": "healthcare",
    "password": "Password123!",
    "agreedToTerms": true
  }')

echo "Response: ${INVALID_EMAIL}"
if [[ $INVALID_EMAIL == *"success\":false"* ]]; then
    echo -e "${GREEN}✅ Invalid email correctly rejected${NC}\n"
else
    echo -e "${RED}❌ Should have rejected invalid email${NC}\n"
fi

# Test 8: Short password
echo -e "${YELLOW}Test 8: Signup with Short Password${NC}"
SHORT_PASSWORD=$(curl -s -X POST "${BASE_URL}/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "another@example.com",
    "industry": "agriculture",
    "password": "Pass1!",
    "agreedToTerms": true
  }')

echo "Response: ${SHORT_PASSWORD}"
if [[ $SHORT_PASSWORD == *"success\":false"* ]]; then
    echo -e "${GREEN}✅ Short password correctly rejected${NC}\n"
else
    echo -e "${RED}❌ Should have rejected short password${NC}\n"
fi

# Summary
echo -e "${BLUE}=== Test Summary ===${NC}"
echo -e "${GREEN}All API tests completed!${NC}"
echo -e "\n${YELLOW}Note: Test user created with email: ${TEST_EMAIL}${NC}"
echo -e "${YELLOW}You can manually clean up test users in MongoDB if needed.${NC}\n"
